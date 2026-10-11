// Assembla la pagina autonoma ../glitz-mappa-3d.html (scena e logo incorporati)
// e dist/artifact.html, lo stesso contenuto senza intestazione del documento, per la pubblicazione come Artifact
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
await import('./build-scene.mjs');
const scena = readFileSync(join(root, 'dist', 'scena.js'), 'utf8');
if (scena.includes('</script')) throw new Error('scena.js contiene </script');
const logo = 'data:image/jpeg;base64,' + readFileSync(join(root, 'assets', 'glitz-logo.jpg')).toString('base64');
const html = readFileSync(join(root, 'template.html'), 'utf8').split('/*__SCENA__*/').join(scena).split('__LOGO__').join(logo);
const doc = '<!doctype html>\n<html lang="it">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' +
  html.replace('</style>', '</style>\n</head>\n<body>') + '\n</body>\n</html>\n';
writeFileSync(join(root, '..', 'glitz-mappa-3d.html'), doc);
writeFileSync(join(root, 'dist', 'artifact.html'), html);
console.log('glitz-mappa-3d.html', (doc.length / 1024).toFixed(1), 'KB');
