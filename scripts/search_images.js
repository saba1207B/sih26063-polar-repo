const fs = require('fs');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  const queries = [
    'glacier canyon river',
    'glacial meltwater canyon',
    'glacier valley river mist',
    'Greenland ice canyon stream'
  ];

  const seen = new Set();
  const results = [];
  const headers = { 'User-Agent': 'PolarResearchEducationalBot/1.2 (https://polarportal.org; polarresearch@gmail.com)' };

  for (const q of queries) {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=' + encodeURIComponent(q) + '&srnamespace=6&srlimit=15&format=json';
    const res = await fetch(url, { headers });
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      if (data.query && data.query.search) {
        for (const item of data.query.search) {
          if (!item.title.endsWith('.pdf') && !item.title.endsWith('.ogg') && !item.title.endsWith('.webm') && !item.title.endsWith('.tif')) {
            seen.add(item.title);
          }
        }
      }
    } catch (e) {
      console.log('Error parsing search:', text.slice(0, 100));
    }
    await sleep(1200);
  }

  console.log('Total unique candidates:', seen.size);
  const titles = Array.from(seen);

  for (let i = 0; i < titles.length; i += 5) {
    const chunk = titles.slice(i, i + 5);
    const infoUrl = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(chunk.join('|')) + '&prop=imageinfo&iiprop=url|size|dimensions|extmetadata&format=json';
    const res = await fetch(infoUrl, { headers });
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      if (data.query && data.query.pages) {
        for (const p of Object.values(data.query.pages)) {
          if (p.imageinfo && p.imageinfo[0]) {
            const info = p.imageinfo[0];
            if (info.width >= 3200 && info.width > info.height && (info.mime === 'image/jpeg' || info.mime === 'image/png')) {
              const desc = (info.extmetadata?.ImageDescription?.value || '').replace(/<[^>]+>/g, '').trim();
              results.push({
                title: p.title,
                width: info.width,
                height: info.height,
                sizeMB: (info.size / 1024 / 1024).toFixed(2),
                url: info.url,
                desc: desc.slice(0, 150)
              });
            }
          }
        }
      }
    } catch (e) {
      console.log('Error parsing info chunk:', text.slice(0, 100));
    }
    await sleep(1200);
  }

  results.sort((a, b) => b.width - a.width);
  console.log('High-res landscape matches:', results.length);
  results.forEach((r, idx) => {
    console.log(`[${idx+1}] ${r.title} (${r.width}x${r.height}, ${r.sizeMB} MB)`);
    console.log(`    Desc: ${r.desc}`);
    console.log(`    URL: ${r.url}`);
  });

  fs.writeFileSync('scripts/candidates.json', JSON.stringify(results, null, 2));
}

run().catch(console.error);
