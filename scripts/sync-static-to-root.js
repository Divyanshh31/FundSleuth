const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src', 'main', 'resources', 'static');
const rootDir = path.join(__dirname, '..');

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(
                path.join(src, childItemName),
                path.join(dest, childItemName)
            );
        });
    } else {
        fs.copyFileSync(src, dest);
        console.log(`Copied ${path.relative(rootDir, src)} -> ${path.relative(rootDir, dest)}`);
    }
}

// Copy HTML files, js directory, css directory from src/main/resources/static/ to root
fs.readdirSync(srcDir).forEach(item => {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(rootDir, item);
    copyRecursiveSync(srcPath, destPath);
});

console.log('✅ Synchronized src/main/resources/static to repository root!');
