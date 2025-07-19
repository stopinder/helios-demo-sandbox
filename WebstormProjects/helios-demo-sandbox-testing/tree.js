// tree.js
const fs = require('fs');
const path = require('path');

function printTree(dir, prefix = '') {
    const files = fs.readdirSync(dir);
    files.forEach((file, index) => {
        const fullPath = path.join(dir, file);
        const isLast = index === files.length - 1;
        const stat = fs.statSync(fullPath);
        const connector = isLast ? '└── ' : '├── ';
        console.log(`${prefix}${connector}${file}`);
        if (stat.isDirectory()) {
            printTree(fullPath, prefix + (isLast ? '    ' : '│   '));
        }
    });
}

printTree(path.join(__dirname, 'src'));
