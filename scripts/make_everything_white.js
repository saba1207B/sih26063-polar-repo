const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Fix button background/text pairs
  content = content.replace(/bg-white text-black border-white font-bold/g, 'bg-white/20 text-white border border-white/50 font-bold');
  content = content.replace(/bg-white text-black/g, 'bg-white/20 text-white border border-white/40');
  content = content.replace(/bg-glacial-blue text-polar-night/g, 'bg-white/20 text-white border border-white/40');
  content = content.replace(/bg-aurora-cyan text-polar-night/g, 'bg-white/30 text-white border border-white/60');

  // Replace nested or repeated text-white opacities like text-white/80/70, text-white/80/60, text-white/80, text-white/70 etc.
  content = content.replace(/text-white(?:\/\d+)+/g, 'text-white');
  content = content.replace(/hover:text-white(?:\/\d+)+/g, 'hover:text-white');
  content = content.replace(/hover:text-snow/g, 'hover:text-white');
  
  // Specific text color classes to pure text-white
  content = content.replace(/\btext-black\b/g, 'text-white');
  content = content.replace(/\btext-polar-night\b/g, 'text-white');
  content = content.replace(/\btext-muted\b/g, 'text-white');
  content = content.replace(/\btext-secondary\b/g, 'text-white');
  content = content.replace(/\btext-snow\b/g, 'text-white');
  content = content.replace(/\btext-dark\b/g, 'text-white');
  content = content.replace(/\btext-slate-\d+\b/g, 'text-white');
  content = content.replace(/\btext-gray-\d+\b/g, 'text-white');
  content = content.replace(/\btext-zinc-\d+\b/g, 'text-white');
  content = content.replace(/\btext-neutral-\d+\b/g, 'text-white');
  content = content.replace(/\btext-glacial-blue\b/g, 'text-white');
  content = content.replace(/\btext-polar-blue\b/g, 'text-white');
  content = content.replace(/\btext-aurora-cyan\b/g, 'text-white');
  content = content.replace(/\btext-seashore\b/g, 'text-white');

  // Fix placeholder if affected
  content = content.replace(/placeholder:text-white(?:\/\d+)*/g, 'placeholder:text-white/60');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

walkDir(srcDir);
console.log('Finished updating text colors to pure white across all components.');
