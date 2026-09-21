import {build} from 'esbuild';
import fs from 'node:fs/promises';
await build({entryPoints:['app.js'],bundle:true,minify:true,format:'iife',outfile:'app.bundle.js'});
const template=await fs.readFile('template.html','utf8');
const app=await fs.readFile('app.bundle.js','utf8');
const plan=(await fs.readFile('pianta-tavoli.png')).toString('base64');
await fs.writeFile('glitz-interattivo.html',template.replace('__APP__',()=>app).replace('__PLAN__',()=>plan));
try {
  await fs.access('frontend/public');
  await fs.copyFile('glitz-interattivo.html', 'frontend/public/glitz-interattivo.html');
} catch (error) { if (error.code !== 'ENOENT') throw error; }
console.log('Built glitz-interattivo.html');
