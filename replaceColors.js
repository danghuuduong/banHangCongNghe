// replaceColors.js
const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getFiles(fullPath));
    } else if (fullPath.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

const replacements = [
  { pattern: /bg\[#08080B\]/g, replace: 'bg-background' },
  { pattern: /bg\[#08080B\]\/50/g, replace: 'bg-background/50' },
  { pattern: /bg\[#08080B\]\/70/g, replace: 'bg-background/70' },
  { pattern: /bg\[#08080B\]\/30/g, replace: 'bg-background/30' },
  { pattern: /bg\[#121216\]/g, replace: 'bg-card-bg' },
  { pattern: /bg\[#0C0C0F\]/g, replace: 'bg-card-bg' },
  { pattern: /bg\[#040406\]/g, replace: 'bg-card-bg' },
  { pattern: /bg-black/g, replace: 'bg-background' },
  { pattern: /bg-black\/40/g, replace: 'bg-background/40' },
  { pattern: /bg-black\/80/g, replace: 'bg-background/80' },
  { pattern: /border\[#08080B\]/g, replace: 'border-card-border' },
  { pattern: /border\[#121216\]/g, replace: 'border-card-border' },
  { pattern: /text\[#08080B\]/g, replace: 'text-foreground' },
  { pattern: /text-white/g, replace: 'text-foreground' }
];

const root = path.resolve(__dirname, 'src');
const files = getFiles(root);
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  replacements.forEach(r => {
    content = content.replace(r.pattern, r.replace);
  });
  fs.writeFileSync(file, content, 'utf8');
});
console.log('Color replacements completed.');
