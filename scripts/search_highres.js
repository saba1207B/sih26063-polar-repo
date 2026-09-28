const fs = require('fs');

async function run() {
  const terms = [
    'glacier meltwater canyon',
    'supraglacial river Greenland',
    'glacier ice canyon river',
    'ice gorge water',
    'Margerie Glacier calving mist',
    'Perito Moreno glacier river',
    'Vatnajokull canyon river',
    'glacier melt stream blue',
    'glacier waterfall mist',
    'ice valley river'
  ];

  const seen = new Set();
  const headers = { 'User-Agent': 'PolarEduBot/1.0 (contact@polarportal.org)' };

  for (const term of terms) {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=' + encodeURIComponent(term) + '&srnamespace=6&srlimit=15&format=json';
    const res = await fetch(url, { headers });
    const data = await res.json();
    if (data.query && data.query.search) {
      for (const s of data.query.search) {
        if (!s.title.endsWith('.pdf') && !s.title.endsWith('.ogg') && !s.title.endsWith('.webm') && !s.title.endsWith('.tif')) {
          seen.add(s.title);
        }
      }
    }
  }

  console.log('Unique files found:', seen.size);
  const titles = Array.from(seen);
  const highRes = [];

  for (let i = 0; i < titles.length; i += 10) {
    const chunk = titles.slice(i, i + 10);
    const infoUrl = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(chunk.join('|')) + '&prop=imageinfo&iiprop=url|size|dimensions|extmetadata&format=json';
    const res = await fetch(infoUrl, { headers });
    const data = await res.json();
    if (data.query && data.query.pages) {
      for (const p of Object.values(data.query.pages)) {
        if (p.imageinfo && p.imageinfo[0]) {
          const info = p.imageinfo[0];
          if (info.width >= 3500 && info.width > info.height && (info.mime === 'image/jpeg' || info.mime === 'image/png')) {
            const desc = (info.extmetadata?.ImageDescription?.value || '').replace(/<[^>]+>/g, '').trim();
            highRes.push({
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
  }

  console.log('Found', highRes.length, 'high-res landscape images:');
  highRes.forEach((h, idx) => {
    console.log(`[${idx+1}] ${h.title} (${h.width}x${h.height}, ${h.sizeMB} MB)`);
    console.log(`    Desc: ${h.desc}`);
    console.log(`    URL: ${h.url}`);
  });

  fs.writeFileSync('scripts/highres_results.json', JSON.stringify(highRes, null, 2));
}

run().catch(console.error);
