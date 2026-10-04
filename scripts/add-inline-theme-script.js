const fs = require('fs');
const path = require('path');

const staticDir = path.join(__dirname, '..', 'src', 'main', 'resources', 'static');
const files = fs.readdirSync(staticDir).filter(f => f.endsWith('.html'));

const snippet = `    <meta name="color-scheme" content="light dark">
    <script>
        (function() {
            var saved = localStorage.getItem('fundsleuth-theme');
            var theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            document.documentElement.setAttribute('data-theme', theme);
            document.documentElement.setAttribute('data-bs-theme', theme);
        })();
    </script>`;

files.forEach(file => {
    const filePath = path.join(staticDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (!content.includes('localStorage.getItem(\'fundsleuth-theme\')')) {
        content = content.replace(
            /<meta name="viewport" content="width=device-width, initial-scale=1.0">/,
            `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n${snippet}`
        );
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    } else {
        console.log(`Skipped ${file} (already contains theme script)`);
    }
});
