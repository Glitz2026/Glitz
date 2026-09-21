import * as THREE from 'three';
export function createDJBooth(){
 const root=new THREE.Group();root.name='Console DJ parallela arco';root.userData={frontClearance:.60,depth:.84};
 const mats={};const mat=c=>mats[c]??=new THREE.MeshStandardMaterial({color:c,roughness:.55});
 const box=(g,n,x,y,z,w,h,d,c)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c));m.name=n;m.position.set(x,y,z);g.add(m);return m;};
 const disc=(g,n,x,y,z,r,h,c)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,32),mat(c));m.name=n;m.position.set(x,y,z);g.add(m);return m;};
 box(root,'Banco DJ',0,.525,0,2.70,1.05,.80,'#edece5');box(root,'Piano DJ',0,1.075,0,2.75,.05,.84,'#202326');
 const top=1.1;
 for(const [i,x] of [-.79,-.41,.41,.79].entries()){
  const g=new THREE.Group();g.name='CDJ-3000X '+(i+1);g.position.set(x,top,0);g.userData={model:'CDJ-3000X',dimensions:[.3446,.4904,.1301]};root.add(g);
  box(g,'CDJ chassis',0,.035,0,.3446,.07,.4904,'#16191c');
  box(g,'CDJ display cornice',-.016,.095,.145,.245,.065,.17,'#252a30');box(g,'CDJ touchscreen',-.016,.1301,.145,.223,.001,.145,'#132c38');
  for(let k=0;k<25;k++)box(g,'CDJ waveform',-.12+k*.0087,.131,.16,.005,.001,.012+.033*Math.abs(Math.sin(k*2.1)),k%3?'#53c9da':'#e2b260');
  disc(g,'Jog wheel bordo',-.025,.081,-.065,.098,.018,'#676b70');disc(g,'Jog wheel',-.025,.092,-.065,.09,.012,'#24272b');disc(g,'Jog display',-.025,.099,-.065,.036,.002,'#337088');
  for(let k=0;k<8;k++)box(g,'Hot cue',-.139+k*.027,.079,.025,.021,.013,.016,k%2?'#619cb4':'#96b78d');
  box(g,'Pitch guida',.133,.074,-.09,.007,.007,.16,'#565b61');box(g,'Pitch cursore',.133,.083,-.07,.032,.013,.013,'#c3c5c8');
  disc(g,'Play',-.136,.079,-.207,.014,.008,'#66b27e');disc(g,'Cue',-.136,.079,-.167,.014,.008,'#bc924e');
  disc(g,'Browse',.138,.081,.12,.013,.017,'#686d73');
 }
 const g=new THREE.Group();g.name='DJM-A9';g.position.set(0,top,-(.4904-.4583)/2);root.add(g);g.userData={model:'DJM-A9',dimensions:[.4074,.4583,.1079]};
 box(g,'A9 chassis',0,.043,0,.4074,.086,.4583,'#15181b');
 for(let ch=0;ch<4;ch++){const x=-.105+ch*.06;for(let k=0;k<5;k++)disc(g,'A9 manopola canale',x,.096,.17-k*.048,.010,.023,'#6f747a');box(g,'A9 guida fader',x,.087,-.126,.005,.002,.10,'#868b90');box(g,'A9 fader',x,.100,-.12,.025,.015,.014,'#c4c9ce');for(let j=0;j<8;j++)box(g,'A9 meter',x+.016,.088,.12-j*.018,.004,.002,.01,j>5?'#dbaa49':'#5ba069');}
 box(g,'A9 crossfader guida',-.01,.088,-.197,.17,.004,.005,'#8a8d91');box(g,'A9 crossfader',-.01,.1,-.197,.013,.014,.027,'#bfc4c8');
 box(g,'A9 display FX',.155,.090,.14,.065,.005,.085,'#2e6c85');for(let i=0;i<4;i++)disc(g,'A9 FX knob',.155,.096,.05-i*.06,.015,.022,'#737a80');
 for(const x of [-1.17,1.17])box(root,'Monitor DJ',x,.99,-.05,.28,.36,.28,'#1b2023');
 root.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true}});return root;
}
