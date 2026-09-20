import http from 'node:http';
import fs from 'node:fs/promises';
http.createServer(async(req,res)=>{if(!['/','/glitz-interattivo.html'].includes(req.url)){res.writeHead(404);return res.end('Not found')}res.setHeader('Content-Type','text/html; charset=utf-8');res.end(await fs.readFile(new URL('./glitz-interattivo.html',import.meta.url)))}).listen(8080,'127.0.0.1',()=>console.log('http://127.0.0.1:8080'));
