const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

const replacements = {
  'text-slate-900': 'text-white',
  'text-slate-800': 'text-white',
  'text-slate-700': 'text-white/90',
  'text-slate-600': 'text-white/80',
  'text-slate-500': 'text-white/70',
  'text-[#0369A1]': 'text-white',
  'text-[#0284C7]': 'text-white',
  'text-[#7ec0e0]': 'text-white',
  'text-[#287D91]': 'text-white',
  'text-[#0F172A]': 'text-white',
  'text-[#4A606A]': 'text-white/80'
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      for (const [key, value] of Object.entries(replacements)) {
        if (content.includes(key)) {
          // Use regex to replace all occurrences globally
          const regex = new RegExp(key.replace(/\[/g, '\\[').replace(/\]/g, '\\]'), 'g');
          content = content.replace(regex, value);
          modified = true;
        }
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Text color replacement complete.');
