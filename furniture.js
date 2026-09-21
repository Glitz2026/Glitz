import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
const palette={ivory:'#eeeae0',fabric:'#cec8bc',seam:'#b5ada0',wood:'#87522c',metal:'#f1efe8',masonry:'#e9e6dd',black:'#262a2a'};const mats={};
const mat=(c)=>mats[c]??(mats[c]=new THREE.MeshStandardMaterial({color:c,roughness:c===palette.wood?.53:.9}));
function mesh(g,c,n,parent,p=[0,0,0]){const o=new THREE.Mesh(g,typeof c==='string'?mat(c):c);o.name=n;o.position.set(...p);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
function box(parent,n,p,size,c,r=0){return mesh(r?new RoundedBoxGeometry(...size,3,r):new THREE.BoxGeometry(...size),c,n,parent,p)}
function rod(parent,n,a,b,r,c){const av=new THREE.Vector3(...a),bv=new THREE.Vector3(...b),d=bv.clone().sub(av);const o=mesh(new THREE.CylinderGeometry(r,r,d.length(),7),c,n,parent,av.clone().add(bv).multiplyScalar(.5).toArray());o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return o}
function subgroup(parent,x,z,rot=0){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=rot;parent.add(g);return g}
function lantern(parent,x,y,z,white=false){const c=white?palette.metal:palette.black;for(const dx of [-.055,.055])for(const dz of [-.055,.055])rod(parent,'Lanterne montante',[x+dx,y,z+dz],[x+dx,y+.27,z+dz],.008,c);box(parent,'Lanterne base',[x,y,z],[.13,.025,.13],c);box(parent,'Lanterne tetto',[x,y+.28,z],[.13,.025,.13],c);mesh(new THREE.CylinderGeometry(.025,.025,.07,8),'#e3d3b7','Candela',parent,[x,y+.055,z]);const ring=mesh(new THREE.TorusGeometry(.04,.006,5,12),c,'Manico lanterna',parent,[x,y+.325,z]);}
function woodTable(parent,x,z,y=.48,w=.9,d=.7,metal=true){box(parent,'Tavolo piano legno',[x,y,z],[w,.105,d],palette.wood,.014);for(let i=1;i<7;i++)box(parent,'Tavolo fughe doghe',[x-w/2+i*w/7,y+.053,z],[.006,.002,d-.035],'#684125');for(const dx of [-w/2+.055,w/2-.055])for(const dz of [-d/2+.055,d/2-.055])box(parent,'Tavolo gamba',[x+dx,(y-.05)/2,z+dz],[.042,y-.05,.042],metal?palette.metal:palette.wood);lantern(parent,x,y+.065,z,metal)}
function sofa(parent,x,z,rot=0,w=1.6){const g=subgroup(parent,x,z,rot);box(g,'Divano fascia in legno',[0,.16,0],[w,.17,.78],palette.wood,.017);box(g,'Divano telaio bianco',[0,.065,0],[w+.02,.05,.8],palette.metal,.008);for(const xx of [-w/2+.055,w/2-.055])for(const zz of [-.33,.33])box(g,'Divano piedino bianco',[xx,.07,zz],[.04,.14,.04],palette.metal);box(g,'Divano seduta imbottita',[0,.375,.03],[w,.29,.84],palette.ivory,.095);const back=box(g,'Divano schienale alto',[0,.77,-.32],[w,.85,.24],palette.ivory,.09);back.rotation.x=-.11;for(const xx of [-w*.23,w*.23]){const pillow=box(g,'Divano cuscino decorativo',[xx,.71,-.135],[w*.34,.35,.115],'#ded8ce',.055);pillow.rotation.x=-.23;pillow.rotation.z=xx<0?.07:-.06}return g}
function ottoman(parent,x,z,w=1.35,d=.64){const g=subgroup(parent,x,z);box(g,'Pouf rettangolare fascia legno',[0,.16,0],[w,.17,d],palette.wood,.018);box(g,'Pouf rettangolare imbottitura',[0,.39,0],[w,.3,d+.015],palette.ivory,.07);for(const xx of [-w/2+.05,w/2-.05])for(const zz of [-d/2+.05,d/2-.05])box(g,'Pouf piedino bianco',[xx,.065,zz],[.04,.13,.04],palette.metal);return g}
function soft(parent,x,z,rot=0,size=.92){const g=subgroup(parent,x,z,rot);const body=new RoundedBoxGeometry(size,.51,size*.96,5,.19);const attr=body.attributes.position;for(let i=0;i<attr.count;i++){const x=attr.getX(i),y=attr.getY(i),z=attr.getZ(i);const d=.009*Math.sin(x*35+z*21)*Math.cos(y*22);attr.setXYZ(i,x+d,y+.012*Math.sin(z*18)*Math.cos(x*15),z+d*.6)}body.computeVertexNormals();mesh(body,palette.fabric,'Poltrona sacco corpo morbido',g,[0,.275,0]);const back=box(g,'Poltrona sacco schienale',[0,.62,-size*.31],[size*.98,.6,.35],palette.fabric,.145);back.rotation.x=-.18;
for(const x of [-size*.32,size*.32]){const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(x,.08,.3),new THREE.Vector3(x,.46,.4),new THREE.Vector3(x,.53,.05),new THREE.Vector3(x,.57,-.2)]);mesh(new THREE.TubeGeometry(curve,15,.003,4,false),palette.seam,'Cucitura tessuto',g)}return g}
function roundTable(parent,x,z,r=.33){mesh(new THREE.CylinderGeometry(r,r,.035,32),palette.metal,'Tavolino tondo bianco',parent,[x,.43,z]);for(const a of [0,Math.PI*.5,Math.PI,Math.PI*1.5])rod(parent,'Tavolino piede inclinato',[x+Math.cos(a)*r*.8,0,z+Math.sin(a)*r*.8],[x+Math.cos(a)*r*.5,.41,z+Math.sin(a)*r*.5],.018,palette.metal);lantern(parent,x,.46,z)}
function director(parent,x,z,rot=0){const g=subgroup(parent,x,z,rot);for(const xx of [-.26,.26]){rod(g,'Sedia gamba incrociata',[xx,.015,-.28],[xx,.48,.23],.014,palette.metal);rod(g,'Sedia gamba incrociata',[xx,.015,.28],[xx,.48,-.23],.014,palette.metal);rod(g,'Sedia montante',[xx,.42,-.25],[xx,.92,-.3],.014,palette.metal);rod(g,'Sedia supporto bracciolo',[xx,.46,.23],[xx,.65,.23],.014,palette.metal);box(g,'Bracciolo legno',[xx,.65,-.015],[.035,.035,.54],palette.wood,.008)}box(g,'Sedia tela seduta',[0,.46,0],[.49,.025,.47],palette.fabric,.006);const back=box(g,'Sedia tela schienale',[0,.745,-.278],[.48,.32,.022],palette.fabric,.006);back.rotation.x=-.075;rod(g,'Sedia traverso basso',[-.26,.025,.28],[.26,.025,.28],.014,palette.metal)}
function masonry(parent,x,z,rot=0,w=1.7){const g=subgroup(parent,x,z,rot);box(g,'Panca muratura base',[0,.25,0],[w,.5,.72],palette.masonry);box(g,'Panca muratura schienale',[0,.58,-.38],[w,.98,.16],palette.masonry);for(const xx of [-w*.25,w*.25])box(g,'Panca cuscino seduta',[xx,.525,.035],[w*.49,.08,.65],palette.fabric,.025);for(const [i,xx] of [-w*.3,w*.05,w*.32].entries()){const p=box(g,'Panca cuscino schienale',[xx,.75,-.23],[.37,.35,.12],i===1?palette.black:palette.fabric,.055);p.rotation.x=-.16;p.rotation.z=i%2?.12:-.05}return g}

function rechargeableLamp(parent){
 const dark='#353735';mesh(new THREE.CylinderGeometry(.10,.12,.025,24),dark,'Lampada ricaricabile base',parent,[0,.60,0]);
 rod(parent,'Lampada ricaricabile stelo',[0,.61,0],[0,.84,0],.014,dark);
 const glow=new THREE.MeshStandardMaterial({color:'#fff0ca',emissive:'#ffcc81',emissiveIntensity:.65});
 mesh(new THREE.CylinderGeometry(.075,.115,.14,24),glow,'Lampada ricaricabile diffusore',parent,[0,.80,0]);
 for(let i=0;i<16;i++){const a=i*Math.PI/8;rod(parent,'Lampada ricaricabile gabbia',[Math.cos(a)*.125,.73,Math.sin(a)*.125],[Math.cos(a)*.085,.89,Math.sin(a)*.085],.007,dark)}
 mesh(new THREE.CylinderGeometry(.085,.085,.018,24),dark,'Lampada ricaricabile cappello',parent,[0,.90,0]);
}
function panoramaSeat(parent){
 box(parent,'Seat View panca murata',[0,.22,0],[3.20,.44,.76],palette.masonry);
 box(parent,'Seat View tavolino murato',[0,.50,0],[.48,.16,.76],palette.masonry);
 for(const x of [-1.14,-.59,.59,1.14])box(parent,'Seat View cuscino panca',[x,.48,.015],[.53,.08,.68],palette.fabric,.025);
 rechargeableLamp(parent);
 const led=new THREE.MeshStandardMaterial({color:'#fff2d1',emissive:'#ffc875',emissiveIntensity:.8});
 for(const x of [-1.08,0,1.08]){box(parent,'Seat View incasso luce',[x,.20,.383],[.13,.10,.018],palette.metal);box(parent,'Seat View luce calda',[x,.20,.394],[.095,.065,.008],led);}
}
export function furniture(type,id){const root=new THREE.Group();root.name='ARREDI_'+id;
if(type==='panorama-masonry'){panoramaSeat(root);}
else if(type==='riva-compact'){sofa(root,0,-.62,0,1.35);woodTable(root,0,.08,.47,.8,.64)}
else if(type==='riva-lounge'){sofa(root,0,-.87,0,1.6);woodTable(root,0,0,.48,.95,.72);ottoman(root,0,.87,1.38,.61)}
else if(type==='lawn-short-l'){soft(root,-.39,-.35,0,.76);soft(root,.39,-.35,0,.76);const pouf=soft(root,-.39,.40,Math.PI/2,.76);pouf.name='Pouf morbido senza schienale';pouf.getObjectByName('Poltrona sacco schienale').removeFromParent();box(root,'Tavolino quadrato bianco',[.40,.43,.42],[.48,.045,.48],palette.metal,.01);for(const x of [.19,.61])for(const z of [.21,.63])box(root,'Tavolino bianco gamba',[x,.21,z],[.026,.42,.026],palette.metal);lantern(root,.40,.46,.42,true);}
else if(type==='lawn-pair'){soft(root,-.65,0,0,.92);soft(root,.65,0,0,.92);box(root,'Tavolino quadrato bianco',[0,.43,0],[.55,.045,.55],palette.metal,.01);for(const x of [-.24,.24])for(const z of [-.24,.24])box(root,'Tavolino bianco gamba',[x,.21,z],[.026,.42,.026],palette.metal);lantern(root,0,.46,0,true);}
else if(type==='beanbag-round'){soft(root,0,-.46,0,.89);roundTable(root,.05,.45,.30);}
else {woodTable(root,0,.08,.67,.86,.67,false);director(root,0,.9,Math.PI);}
return root}

// Continuous masonry follows the architectural plan, independent of commercial table IDs.
export function continuousBench(root,xy,points,y=.812){
 for(let i=1;i<points.length;i++){
  const a=xy(...points[i-1],y),b=xy(...points[i],y),delta=b.clone().sub(a),length=delta.length();
  const g=new THREE.Group();g.name='GLITZ_BAR_PANCA_CONTINUA';g.position.copy(a).add(b).multiplyScalar(.5);g.rotation.y=Math.atan2(-delta.z,delta.x);root.add(g);
  box(g,'Muratura continua base',[0,.23,0],[length+.02,.46,.72],palette.masonry);
  box(g,'Muratura schienale continuo',[0,.56,-.36],[length+.02,.92,.16],palette.masonry);
  const count=Math.max(1,Math.round(length/.74));
  for(let j=0;j<count;j++){const x=-length/2+(j+.5)*length/count;box(g,'Cuscino su panca murata',[x,.505,.035],[length/count-.015,.09,.64],palette.fabric,.025);
   const pillow=box(g,'Cuscino schienale',[x,.735,-.20],[.38,.37,.12],j%3===1?palette.black:palette.fabric,.055);pillow.rotation.x=-.18;pillow.rotation.z=j%2?.075:-.06;
  }
 }
}

export function entranceStool(){const g=new THREE.Group();g.name='Sgabello ingresso';director(g,0,0);g.scale.y=1.42;g.traverse(o=>{if(o.name.startsWith('Sedia tela'))o.material=mat(palette.metal)});rod(g,'Poggiapiedi sgabello',[-.26,.20,.28],[.26,.20,.28],.016,palette.metal);return g}
