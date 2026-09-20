import {build} from 'esbuild';
import fs from 'node:fs/promises';
await build({entryPoints:['app.js'],bundle:true,minify:true,format:'iife',outfile:'app.bundle.js'});
const template=await fs.readFile('template.html','utf8');
const app=await fs.readFile('app.bundle.js','utf8');
const plan=(await fs.readFile('pianta-tavoli.png')).toString('base64');
await fs.writeFile('glitz-interattivo.html',template.replace('__APP__',()=>app).replace('__PLAN__',()=>plan));
console.log('Built glitz-interattivo.html');
