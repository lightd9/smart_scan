const fs = require('fs');
const path = require('path');

const targetExtensions = ['.js', '.jsx', '.ts', '.tsx'];

function updateFileImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const updated = content
    .replace(/@material-ui\/core/g, '@mui/material')
    .replace(/@material-ui\/icons/g, '@mui/icons-material')
    .replace(/@material-ui\/lab/g, '@mui/lab');

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`✅ Updated: ${filePath}`);
  }
}

function traverseDirectory(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && file !== 'node_modules') {
      traverseDirectory(fullPath);
    } else if (targetExtensions.includes(path.extname(file))) {
      updateFileImports(fullPath);
    }
  });
}

traverseDirectory('./');
console.log('🎉 Done updating MUI imports!');
