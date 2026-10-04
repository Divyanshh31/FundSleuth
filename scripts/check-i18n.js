const fs = require('fs');
const path = require('path');

const staticDir = path.join(__dirname, '..', 'src', 'main', 'resources', 'static');
const i18nPath = path.join(staticDir, 'js', 'i18n.js');

if (!fs.existsSync(i18nPath)) {
    console.error('CRITICAL: i18n.js not found at', i18nPath);
    process.exit(1);
}

const i18nContent = fs.readFileSync(i18nPath, 'utf8');

// Create mock DOM for Node.js environment
const mockElement = {
    setAttribute: () => {},
    getAttribute: () => null,
    querySelectorAll: () => [],
    querySelector: () => null,
    classList: { add: () => {}, remove: () => {} },
    style: {}
};

const mockDocument = {
    readyState: 'complete',
    documentElement: mockElement,
    body: mockElement,
    addEventListener: () => {},
    querySelectorAll: () => [],
    querySelector: () => null,
    getElementById: () => null
};

const mockWindow = {
    localStorage: { getItem: () => null, setItem: () => {} },
    document: mockDocument,
    addEventListener: () => {},
    dispatchEvent: () => {}
};

let translations = {};
try {
    const fn = new Function('window', 'document', 'localStorage', i18nContent + '; return I18nEngine;');
    const engine = fn(mockWindow, mockDocument, mockWindow.localStorage);
    translations = engine.translations;
} catch (e) {
    console.error('Error parsing i18n.js translations:', e);
    process.exit(1);
}

const languages = Object.keys(translations);
console.log(`Loaded ${languages.length} languages from i18n.js: ${languages.join(', ')}`);

if (!translations.en) {
    console.error('CRITICAL: Master "en" language dictionary missing!');
    process.exit(1);
}

const masterKeys = new Set(Object.keys(translations.en));
console.log(`Master 'en' has ${masterKeys.size} keys.`);

let hasError = false;

// 1. Check Key Parity across all languages
languages.forEach(lang => {
    if (lang === 'en') return;
    const langKeys = new Set(Object.keys(translations[lang]));
    const missingInLang = [...masterKeys].filter(k => !langKeys.has(k));
    if (missingInLang.length > 0) {
        console.error(`❌ Language '${lang}' is missing ${missingInLang.length} keys:`, missingInLang.slice(0, 10), missingInLang.length > 10 ? '...' : '');
        hasError = true;
    }

    // Check identical translations (flag only)
    const identical = [...masterKeys].filter(k => langKeys.has(k) && translations[lang][k] === translations.en[k] && translations.en[k].length > 5);
    if (identical.length > 0) {
        console.log(`ℹ️ [FLAG] Language '${lang}' has ${identical.length} strings identical to English (e.g. "${identical[0]}")`);
    }
});

// 2. Scan all HTML files in src/main/resources/static/ for data-i18n* attributes
const htmlFiles = fs.readdirSync(staticDir).filter(f => f.endsWith('.html'));
console.log(`\nScanning ${htmlFiles.length} HTML files in src/main/resources/static/ ...`);

const missingHtmlKeys = new Set();
const dataI18nAttrRegex = /data-i18n(?:-placeholder|-title|-aria-label|-alt)?=["']([^"']+)["']/g;

htmlFiles.forEach(file => {
    const filePath = path.join(staticDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    let match;
    while ((match = dataI18nAttrRegex.exec(content)) !== null) {
        const key = match[1];
        if (!masterKeys.has(key)) {
            missingHtmlKeys.add(`${file} -> '${key}'`);
            hasError = true;
        }
    }
});

if (missingHtmlKeys.size > 0) {
    console.error(`\n❌ Found ${missingHtmlKeys.size} data-i18n attributes in HTML referencing missing 'en' keys:`);
    missingHtmlKeys.forEach(k => console.error(`   - ${k}`));
} else {
    console.log(`✅ All HTML data-i18n keys exist in 'en' dictionary!`);
}

if (hasError) {
    console.error(`\n❌ i18n Check FAILED with errors.`);
    process.exit(1);
} else {
    console.log(`\n🎉 i18n Check PASSED successfully with 100% key parity & coverage!`);
    process.exit(0);
}
