import * as THREE from 'three';
const leafColors=['#354b2a','#425e32','#58713b','#657c46','#486536'];const materials=leafColors.map(c=>new THREE.MeshStandardMaterial({color:c,roughness:1,side:THREE.DoubleSide}));const bark=new THREE.MeshStandardMaterial({color:'#79644e',roughness:1});
export function landscape(root,xy){let seed=159;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
function branch(a,b,r=.025){let d=b.clone().sub(a),m=new THREE.Mesh(new THREE.CylinderGeometry(r*.7,r,d.length(),6),bark);m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());m.name='Ramo';m.castShadow=true;root.add(m)}
function foliage(p,s=.2,material=0){
 // Small folded leaf clusters with open silhouettes instead of solid spherical foliage.
 const verts=[];
 for(let i=0;i<12;i++){const a=rand()*Math.PI*2,r=Math.sqrt(rand())*s,c=p.clone().add(new THREE.Vector3(Math.cos(a)*r,(rand()-.5)*s*1.7,Math.sin(a)*r));const angle=rand()*Math.PI*2,len=s*(.28+rand()*.25),w=len*.45;
 const d=new THREE.Vector3(Math.cos(angle)*len,.03,Math.sin(angle)*len),side=new THREE.Vector3(-Math.sin(angle)*w,0,Math.cos(angle)*w),tip=c.clone().add(d),base=c.clone().sub(d),l=c.clone().add(side),rr=c.clone().sub(side);c.y+=.025;
 for(const tri of [[base,l,c],[l,tip,c],[tip,rr,c],[rr,base,c]])for(const v of tri)verts.push(...v.toArray());}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.computeVertexNormals();const m=new THREE.Mesh(g,materials[material%5]);m.name='Foglie singole ripiegate';m.castShadow=true;m.receiveShadow=true;root.add(m);
}
function tree(u,v,r,h=3,ground=0){let p=xy(u,v,ground);branch(p,p.clone().add(new THREE.Vector3(.08,h*.7,0)),.11);for(let i=0;i<12;i++){const a=i*2.399,rr=r*(.3+.6*rand());const end=p.clone().add(new THREE.Vector3(Math.cos(a)*rr,h*(.6+.35*rand()),Math.sin(a)*rr));branch(p.clone().add(new THREE.Vector3(0,h*.5,0)),end,.022);for(let j=0;j<13;j++)foliage(end.clone().add(new THREE.Vector3((rand()-.5)*r*.8,(rand()-.5)*r*.6,(rand()-.5)*r*.8)),r*(.14+.12*rand()),i+j)}}
[[810,936,3.5,6.2]].forEach(x=>tree(...x));
function hedge(a,b,height=.8,width=.6){const pa=xy(...a),pb=xy(...b),steps=Math.ceil(pa.distanceTo(pb)/.3);for(let i=0;i<=steps;i++){let p=pa.clone().lerp(pb,i/steps);for(let j=0;j<4;j++)foliage(p.clone().add(new THREE.Vector3((rand()-.5)*width,height*(.4+rand()*.5),(rand()-.5)*width)),.22+rand()*.08,i+j)}}
hedge([560,137],[982,174],1,.75);hedge([1030,355],[1030,655],.95,.9);hedge([670,677],[1004,696],.75,.75);hedge([210,653],[253,895],1.1,.6);hedge([190,237],[190,624],1.4,.85);
function palm(u,v,h,ground=0){const p=xy(u,v,ground),top=p.clone().add(new THREE.Vector3(.18,h,0));branch(p,top,.15);for(let k=0;k<16;k++){let a=k*2.399,len=2.3+(k%3)*.2;const points=[];for(let i=0;i<=12;i++){let t=i/12;points.push(top.clone().add(new THREE.Vector3(Math.cos(a)*len*t,.7*Math.sin(t*Math.PI)-.9*t*t,Math.sin(a)*len*t)))}for(let i=1;i<points.length;i++)branch(points[i-1],points[i],.014);const verts=[];for(let i=1;i<12;i++){let t=i/12;for(const side of [-1,1]){const b=points[i],w=.55*Math.sin(Math.PI*t),tip=b.clone().add(new THREE.Vector3(Math.cos(a+Math.PI/2)*w*side,-.25,Math.sin(a+Math.PI/2)*w*side));tip.add(new THREE.Vector3(Math.cos(a)*.25,0,Math.sin(a)*.25));verts.push(...b.toArray(),...tip.toArray(),...b.clone().add(new THREE.Vector3(Math.cos(a)*.11,0,Math.sin(a)*.11)).toArray())}}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.computeVertexNormals();let m=new THREE.Mesh(g,materials[k%5]);m.name='Palma fronda pennata';m.castShadow=true;root.add(m)}}palm(548,815,6.3,.8);palm(1238,392,4.8);
// Potted shrubs and flowering climber documented at the garden lounge entrance.
const potmat=new THREE.MeshStandardMaterial({color:'#deded4',roughness:.7}),petalmat=new THREE.MeshStandardMaterial({color:'#a74f83',roughness:1});
for(const [u,v]of [[480,767],[480,823]]){let p=xy(u,v,.8);let pot=new THREE.Mesh(new THREE.CylinderGeometry(.29,.2,.48,16),potmat);pot.position.copy(p).add(new THREE.Vector3(0,.24,0));pot.name='Vaso bianco';root.add(pot);for(let i=0;i<30;i++)foliage(p.clone().add(new THREE.Vector3((rand()-.5)*.6,.75+rand()*.6,(rand()-.5)*.6)),.13,i)}
// Removed circled small plant, screenshot 5.
const c=xy(480,795,.81);for(let i=0;i<65;i++){const a=rand()*Math.PI;let p=c.clone().add(new THREE.Vector3(Math.cos(a)*1.25,1.65+Math.sin(a)*.7,(rand()-.5)*.28));foliage(p,.1+rand()*.05,i);if(i%3===0){const m=new THREE.Mesh(new THREE.OctahedronGeometry(.065),petalmat);m.position.copy(p).add(new THREE.Vector3(.07,.03,.04));m.name='Bougainvillea fiore';root.add(m)}}
// Sea boundary: thin dark railing with repeated hanging climbers (DSC09552, DSC09576).
const railmat=new THREE.MeshStandardMaterial({color:'#343b32',roughness:.8});
function fenceRod(a,b,r=.012){const d=b.clone().sub(a),m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,d.length(),5),railmat);m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());m.name='Recinzione mare';root.add(m)}
const fa=xy(90,90),fb=xy(1020,183);for(let i=0;i<=110;i++){const pp=fa.clone().lerp(fb,i/110);fenceRod(pp,pp.clone().add(new THREE.Vector3(0,1.12,0)),i%10===0?.025:.009);if(i%9===0)for(let j=0;j<26;j++)foliage(pp.clone().add(new THREE.Vector3((rand()-.5)*.35,.12+rand()*1.2,(rand()-.5)*.5)),.13,j)}fenceRod(fa.clone().add(new THREE.Vector3(0,1.12,0)),fb.clone().add(new THREE.Vector3(0,1.12,0)),.018);
// Large shade tree behind PB7: high crown and clear space beneath.
const shadeTree=new THREE.Group();shadeTree.name='Grande pianta PB chioma alta';const treeStart=root.children.length;
const shadeBase=xy(103,125,0),fork=shadeBase.clone().add(new THREE.Vector3(0,3.2,0));branch(shadeBase,fork,.18);
for(let k=0;k<12;k++){const a=k*Math.PI/6;const tip=fork.clone().add(new THREE.Vector3(Math.cos(a)*2.5,1.2+(k%3)*.30,Math.sin(a)*2.5));branch(fork,tip,.065);for(let j=0;j<18;j++){const aa=j*2.399;foliage(tip.clone().add(new THREE.Vector3(Math.cos(aa)*.7,.2+rand()*.6,Math.sin(aa)*.7)),.37+(j%3)*.05,j)}}
for(const child of root.children.slice(treeStart))shadeTree.add(child);root.add(shadeTree);shadeTree.userData={trunkPlan:[103,125],clearHeight:3.2};
// Trimmed shrubs at main bar edge as drawn in plan.
for(const [u,v] of [[1030,384],[1030,434],[1030,478],[1030,562],[1030,603],[1030,645],[852,669],[889,670],[925,670],[959,670],[995,670]])tree(u,v,.38,.85);
// Drooping fine branches behind the stage and denser lower growth.
for(const [u,v] of [[164,520]]){const p=xy(u,v);for(let k=0;k<12;k++){const a=k*2.399,rr=.9+rand()*.5;const top=p.clone().add(new THREE.Vector3(Math.cos(a)*rr,3.5+rand(),Math.sin(a)*rr));branch(p,top,.03);for(let j=0;j<10;j++)foliage(top.clone().add(new THREE.Vector3((rand()-.5)*.25,-j*.19,(rand()-.5)*.25)),.17,k+j)}}

}
