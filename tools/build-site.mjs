import { transform } from 'esbuild';
import { createHash } from 'node:crypto';
import { readFile,readdir,writeFile,unlink } from 'node:fs/promises';
const {code}=await transform(await readFile('web/site.css','utf8'),{loader:'css',minify:true});
const hash=createHash('sha256').update(code).digest('hex').slice(0,12);
for(const file of await readdir('static'))if(/^site-[a-f0-9]{12}\.css$/.test(file))await unlink('static/'+file);
await writeFile(`static/site-${hash}.css`,code);
await writeFile('templates/site_assets.html',`{{define "siteAssets"}}<link rel="stylesheet" href="/static/site-${hash}.css">{{end}}\n`);
console.log('Site styles:',hash,Buffer.byteLength(code),'bytes');
