const fs = require('fs');

async function run() {
  const terms = [
    'Tracy Arm fjord glacier',
    'Perito Moreno glacier wall',
    'Margerie Glacier Alaska',
    'Skaftafell glacier ice cave',
    'Jökulsárlón ice valley',
    'glacier waterfall steam mist',
    'glacier meltwater river blue ice'
  ];

  const headers = { 'User-Agent': 'PolarResearchEducationalBot/1.3 (https://polarportal.org; polarresearch@gmail.com)' };
  const matches = [];

  for (const t of terms) {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=' + encodeURIComponent(t) + '&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|size|dimensions|extmetadata&format=json';
    const res = await fetch(url, { headers });
    const data = await res.json();
    if (data.query && data.query.pages) {
      for (const p of Object.values(data.query.pages)) {
        if (p.imageinfo && p.imageinfo[0]) {
          const info = p.imageinfo[0];
          if (info.width >= 3000 && info.width > info.height && (info.mime === 'image/jpeg' || info.mime === 'image/png')) {
            const desc = (info.extmetadata?.ImageDescription?.value || '').replace(/<[^>]+>/g, '').trim();
            matches.push({
              title: p.title,
              width: info.width,
              height: info.height,
              sizeMB: (info.size / 1024 / 1024).toFixed(2),
              url: info.url,
              desc: desc.slice(0, 120)
            });
          }
        }
      }
    }
  }

  console.log('Total matches:', matches.length);
  matches.forEach((m, idx) => {
    console.log(`[${idx+1}] ${m.title} (${m.width}x${m.height}, ${m.sizeMB} MB)`);
    console.log(`    Desc: ${m.desc}`);
    console.log(`    URL: ${m.url}`);
  });

  fs.writeFileSync('scripts/matches.json', JSON.stringify(matches, null, 2));
}

run().catch(console.error);
