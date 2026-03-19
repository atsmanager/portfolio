const fs = require('fs');
const path = require('path');

const sourceDir = __dirname;
const destDir = path.join(sourceDir, 'frontend');
const backendDir = path.join(sourceDir, 'backend');

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir);
if (!fs.existsSync(backendDir)) fs.mkdirSync(backendDir);

const files = fs.readdirSync(sourceDir);
files.forEach(file => {
    if (file !== 'frontend' && file !== 'backend' && file !== 'move.js') {
        try {
            fs.renameSync(path.join(sourceDir, file), path.join(destDir, file));
            console.log('Moved', file);
        } catch (e) {
            console.error('Failed to move', file, e);
        }
    }
});
