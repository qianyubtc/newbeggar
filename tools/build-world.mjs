import { build } from 'esbuild';
import './build-site.mjs';
import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile, unlink } from 'node:fs/promises';
const result = await build({entryPoints:['web/world/main.js'],bundle:true,write:false,outfile:'world.js',format:'iife',minify:true,target:'es2020',legalComments:'inline',external:['/static/*']});
const hash=createHash('sha256').update(result.outputFiles.map(f=>f.text).join('\n')).digest('hex').slice(0,12);
for(const file of await readdir('static'))if(/^world-[a-f0-9]{12}\.(js|css)$/.test(file))await unlink('static/'+file);
for(const file of result.outputFiles){const ext=file.path.endsWith('.css')?'css':'js';await writeFile(`static/world-${hash}.${ext}`,file.contents);}
await writeFile('templates/world_assets.html',`{{define "worldAssets"}}<link rel="stylesheet" href="/static/world-${hash}.css"><script src="/static/world-${hash}.js" defer></script>{{end}}\n`);
await writeFile('static/THREE-LICENSE.txt',await readFile('node_modules/three/LICENSE'));
console.log('World assets:',hash,result.outputFiles.map(f=>Math.round(f.contents.length/1024)+' KB').join(' / '));
