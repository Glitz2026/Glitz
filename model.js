import * as THREE from 'three';
import {createLogo} from './logo.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import layout from './layout.json';
import {furniture,continuousBench,entranceStool} from './furniture.js';
import {createArch,ARCH_SPEC} from './arch.js';
import {landscape} from './landscape.js';
// Coordinates digitized on a 1888 px-wide view of the supplied A3 PDF.
// 1191 PDF points / 1888 px × 25.4 / 72 × 200 = mm at nominal scale 1:200.
export const SCALE=1191/1888*25.4/72*200/1000;
export const xy=(u,v,y=0)=>new THREE.Vector3((440-v)*SCALE,y,(u-580)*SCALE);
export function createModel(){
const root=new THREE.Group();root.name='GLITZ_CLUB';root.userData={version:'7.0',archDimensions:ARCH_SPEC,layoutSource:'Pianta schematica monocromatica della venue.png',tableIdsFromUserPlan:true,scaleBasis:'A3 PDF, nominal 1:200, hand digitized',surveyVerified:false,up:'Y',units:'metres'};
const zones=[],tables=[],pickables=[],materials={};
const mat=(c,roughness=.8)=>materials[c]??(materials[c]=new THREE.MeshStandardMaterial({color:c,roughness,metalness:0}));
const C={white:'#efede3',stone:'#c5c3b9',light:'#d6d3c7',grass:'#50634d',leaf:'#496247',wood:'#a27549',metal:'#bbc4bf',dark:'#22282c',puff:'#c4c0b3',path:'#b8b1a0'};
function add(g,m,name,group=root){const o=new THREE.Mesh(g,typeof m==='string'?mat(m):m);o.name=name;o.castShadow=true;o.receiveShadow=true;group.add(o);return o}
function box(name,p,w,h,d,c=C.white,group=root,round=0){const g=round?new RoundedBoxGeometry(w,h,d,2,round):new THREE.BoxGeometry(w,h,d);const o=add(g,c,name,group);o.position.copy(p);return o}
function at(name,u,v,y,w,h,d,c,group=root,round=0){return box(name,xy(u,v,y),w,h,d,c,group,round)}
function rod(name,a,b,r,c=C.white,group=root){const d=b.clone().sub(a),o=add(new THREE.CylinderGeometry(r,r,d.length(),6),c,name,group);o.position.copy(a).add(b).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return o}
function polygon(name,coords,y,h,c,group=root){const shape=new THREE.Shape();coords.forEach(([u,v],i)=>{const p=xy(u,v);i?shape.lineTo(p.x,-p.z):shape.moveTo(p.x,-p.z)});shape.closePath();const g=new THREE.ExtrudeGeometry(shape,{depth:h,bevelEnabled:false,steps:1});g.rotateX(-Math.PI/2);const o=add(g,c,name,group);o.position.y=y-h;return o}
function rail(points,y,group=root){for(let i=1;i<points.length;i++){const a=xy(...points[i-1],y),b=xy(...points[i],y),n=Math.ceil(a.distanceTo(b)/1.4);for(let j=0;j<=n;j++){const p=a.clone().lerp(b,j/n);rod('Montante',p,p.clone().add(new THREE.Vector3(0,1.03,0)),.027,C.white,group)}for(const h of [.20,.40,.60,.80,1.03])rod('Corrimano',a.clone().add(new THREE.Vector3(0,h,0)),b.clone().add(new THREE.Vector3(0,h,0)),.016,C.white,group)}}
const terrain=[[30,85],[70,70],[1035,160],[1206,265],[1260,580],[1360,620],[1250,890],[1490,964],[1540,1110],[1370,1125],[190,930]];
polygon('Terreno',terrain,-.04,.32,C.grass);
polygon('Accesso esterno ingresso',[[530,1030],[620,1050],[650,958],[570,946]],.8,.12,C.path);
polygon('Pavimento perimetrale',[[180,213],[1007,213],[1007,654],[201,654],[201,233],[180,233]],.05,.11,C.light);
const terrace=[[544,257],[979,257],[979,380]];
// Quarter circle at the terrace corner, matching the plan.
for(let i=0;i<=10;i++){let a=i*Math.PI/2/10;terrace.push([941+38*Math.cos(a),380+64*Math.sin(a)])}terrace.push([572,478]);
const dance=[[391,233],[543,233],[572,478],[565,516],[583,532],[513,606],[498,604],[374,568],[345,381],[343,349],[347,329],[363,300],[379,268]];
const north=[[201,234],[388,234],[379,268],[363,300],[347,329],[343,349],[345,381],[275,406],[258,423],[201,426]];
const south=[[201,426],[258,423],[265,498],[276,525],[295,531],[368,532],[374,568],[498,604],[513,618],[514,654],[201,654]];
const stage=[[345,382],[275,406],[261,419],[256,435],[264,496],[277,523],[295,531],[368,532]];
const yard=[[228,655],[572,655],[505,909],[263,895]];
const garden=[[546,170],[956,195],[979,212],[547,212]];
polygon('Pista da ballo · quota -0.50',dance,.1,.15,C.stone);
polygon('Piazzale · quota 0.00',[[543,233],[1007,239],[1007,654],[514,654],[514,618],[498,604],[513,606],[583,532],[565,516],[572,478]],.6,.55,C.light);
polygon('Palco DJ · quota 0.00',stage,.6,.55,C.stone);
function zone(id,name,coords,y,anchor,description){polygon(name,coords,y,y+.04,C.white);polygon(name+' finitura',coords,y+.012,.024,C.stone);const z={id,name,coords,y,anchor:xy(...anchor,y+.8),description};zones.push(z);return z}
zone('riva','RIVA DECK',terrace,1.1,[760,365],'Divani bianchi, base in legno e tavolini quadrati. Tavoli R1–R16.');
// One commercial zone with two physical levels wrapping around the DJ booth.
const upperBack=[[201,234],[388,234],[355,322],[201,322]];
const lowerNorth=[[201,338],[350,338],[343,349],[345,381],[275,406],[258,423],[201,426]];
for(const [poly,y] of [[lowerNorth,.6],[south,.6],[upperBack,.3]]){polygon('BACK THE STAGE',poly,y,y+.04,C.white);polygon('BACK THE STAGE finitura',poly,y+.012,.024,C.stone)}
zones.push({id:'back',name:'BACK THE STAGE',coords:[...north,...south],y:.6,parts:[{coords:lowerNorth,y:.6},{coords:south,y:.6},{coords:upperBack,y:.3}],anchor:xy(280,574,1.7),description:'Sedute morbide e tavolini tondi intorno al palco. Tavoli B0–B15.'});
zone('glitzbar','GLITZ BAR',yard,.8,[388,786],'Panche in muratura, tavoli in legno e sedie pieghevoli. Tavoli G1–G8.');
rail([[544,257],[943,257]],1.12);rail([[980,286],[980,380]],1.12);rail([[980,380],...terrace.slice(3,-1),[793,458]],1.12);rail([[708,466],[572,478],[544,257]],1.12);
rail([[241,234],[388,234]],.32);rail([[202,271],[202,322]],.32);
rail([[202,339],[202,425],[202,427],[202,653],[330,653]],.62);
rail([[411,653],[512,653],[512,619]],.62);
rail([[344,339],[344,381]],.62);
rail([[368,532],[374,568],[498,604],[513,618]],.62);
rail([[345,381],[276,406],[257,430],[265,495],[278,526],[368,531]],.6);
// Side of each stair: all dimensions follow the visible geometry and annotated levels.
function stairs(name,u,v,y1,y2,width,run,angle=0,count=4){const group=new THREE.Group();group.name=name;group.position.copy(xy(u,v));group.rotation.y=angle;root.add(group);for(let i=0;i<count;i++){let h=y1+(y2-y1)*(i+1)/count;box('Gradino',new THREE.Vector3(0,h/2,(i+.5)*run/count-run/2),width,h,run/count,C.white,group);const led=box('Luce gradino',new THREE.Vector3(0,h-.04,(i+1)*run/count-run/2),width*.95,.025,.02,new THREE.MeshStandardMaterial({color:'#ffe3ad',emissive:'#ffc778',emissiveIntensity:.4}),group);led.castShadow=false}}
stairs('Scala terrazza laterale',752,474,1.1,.6,3.8,1.1,-Math.atan2(369,34),3);stairs('Scala terrazza fondo',958,240,1.1,0,1.6,1.45,Math.PI/2,6);stairs('Scala pista',548,565,.1,.6,Math.hypot(583-513,532-606)*SCALE,1.15,Math.atan2(513-583,606-532),3);stairs('Scala privé giardino',370,660,.8,.6,1.9,.6,Math.PI/2,2);stairs('Due gradini in discesa verso B0-B4',278,330,.3,.6,154*SCALE,16*SCALE,-Math.PI/2,2);
const cornerSteps=new THREE.Group();cornerSteps.name='Scala angolare dietro B0 su due lati';root.add(cornerSteps);for(let i=0;i<4;i++){const d=(4-i)*.31/SCALE;polygon('Gradino angolare',[[201-d,234-d],[240,234-d],[240,270],[201-d,270]],.3*(i+1)/4,.3*(i+1)/4,C.white,cornerSteps)}
rail([[572,478],[565,516],[583,532]],.6);
const arch=createArch(xy(356.5,457));arch.root.rotation.y=Math.atan2(23,150);root.add(arch.root);
arch.root.updateMatrixWorld(true);
// Structural feet sit at the user-confirmed support level (1 m above the dancefloor).
for(const x of [-4.475,4.475]){const p=arch.root.localToWorld(new THREE.Vector3(x,0,0));p.y=(ARCH_SPEC.supportY+.6)/2;const support=box('Appoggio arco quota confermata',p,.47,ARCH_SPEC.supportY-.6,.47,C.white);support.rotation.y=arch.root.rotation.y;}
const screen=box('LED wall',new THREE.Vector3(0,(.6+4.65)/2-ARCH_SPEC.supportY,-5.60),5.6,4.05,.12,C.dark,arch.root);screen.userData.sign='GLITZ';const screenLogo=createLogo(4.3,.008);screenLogo.position.set(0,(.6+4.65)/2-ARCH_SPEC.supportY-screenLogo.userData.height/2,-5.53);arch.root.add(screenLogo);
// Rear portal and central truss are modeled in arch.js; no substitute poles.
at('Banco DJ',304,457,1.13,2.7,1.05,.72,C.white);at('Piano DJ',304,457,1.68,2.75,.05,.76,C.dark);
for(const v of [436,480]){at('CDJ',304,v,1.74,.34,.08,.34,'#171c20');at('Monitor DJ',287,v,1,.46,.6,.42,C.dark)}
for(const v of [405,500])at('Subwoofer',398,v,.39,.7,.58,.62,C.dark);
for(const item of layout){
 const group=furniture(item.furniture,item.id);group.name='TABLE_'+item.id;group.userData={tableId:item.id,zoneId:item.zoneId,idConfirmedBySource:true,furnitureDimensionsEstimated:true};const floorHeight=item.zoneId==='back'?(Number(item.id.slice(1))<=4?.32:.62):item.height;group.position.copy(xy(...item.planPosition,floorHeight));
 if(item.zoneId==='riva')group.rotation.y=Math.PI;
 else if(item.id==='G6')group.rotation.y=Math.PI/2;else if(['G7','G8'].includes(item.id))group.rotation.y=Math.PI;
 // All markers and raycast groups refer to precisely one supplied table code.
 group.traverse(o=>{if(o.isMesh){o.userData.tableId=item.id;o.userData.zoneId=item.zoneId;pickables.push(o)}});root.add(group);
 tables.push({...item,height:floorHeight,label:item.id,position:group.position.clone().add(new THREE.Vector3(0,.85,0)),capacity:null,minSpend:null,status:'unconfigured',source:'ID and layout from user schematic; furniture appearance from supplied photos',group});
}
// Main bar and small bar from the numbered plan.
function bar(name,u,v,w,d,y=.6){
 // U-shaped footprint on the existing plan; unmeasured elevations remain approximate.
 at(name+' pavimento',u,v,y,w,.10,d,'#a7a69d');
 at(name+' fronte',u,v-w/SCALE/2+6,y+.51,.28,1.02,d,C.white);
 at(name+' piano frontale',u,v-w/SCALE/2+6,y+1.045,.46,.07,d+.08,'#b08757');
 for(const side of [-1,1]){at(name+' fianco',u+side*(d/2-.16)/SCALE,v,y+.51,w,1.02,.28,C.white);at(name+' piano laterale',u+side*(d/2-.16)/SCALE,v,y+1.045,w+.12,.07,.46,'#b08757')}
 for(let i=0;i<Math.floor(d/.14);i++)at(name+' doga verticale',u+(i*.14-d/2+.07)/SCALE,v-w/SCALE/2+2.7,y+.5,.013,.94,.018,'#d2d0c5');
 at(name+' banco lavoro inox',u,v+w/SCALE/2-10,y+.82,.65,.065,d*.7,'#a4aaab');
 for(const du of [-d*.22,d*.22]){at(name+' frigorifero',u+du/SCALE,v+w/SCALE/2-10,y+.37,.58,.74,.68,'#b6bdba');at(name+' porta frigorifero',u+du/SCALE,v+w/SCALE/2-2.9,y+.39,.022,.56,.53,'#363f3e')}
 for(let i=0;i<7;i++){const uu=u+(i-3)*.22/SCALE;at(name+' bottiglia corpo',uu,v-w/SCALE/2+6,y+1.19,.07,.24,.07,i%2?'#708265':'#b89761');at(name+' bottiglia collo',uu,v-w/SCALE/2+6,y+1.34,.027,.07,.027,'#596454')}
 at(name+' lavello',u,v+w/SCALE/2-10,y+.855,.43,.012,.40,'#4c5657');
}
bar('Main Bar',936,613,2.35,5.25,.6);
const mainBarGroup=new THREE.Group();mainBarGroup.name='Main Bar rivolto verso palco';mainBarGroup.position.copy(xy(936,613));root.add(mainBarGroup);for(const o of [...root.children])if(o.name.startsWith('Main Bar ')&&o!==mainBarGroup){o.position.sub(mainBarGroup.position);mainBarGroup.add(o)}const toStage=xy(356.5,457).sub(mainBarGroup.position);mainBarGroup.rotation.y=Math.atan2(-toStage.z,toStage.x);mainBarGroup.userData.frontFacesStage=true;
// Straight sea bar: white vertical boarding and a wooden cap, photographed in DSC09666.
at('Bar mare fronte',467,180,.59,.14,1.12,4.9,C.white);
at('Bar mare piano legno',467,180,1.18,.66,.065,5.02,'#ab794f');
at('Bar mare zoccolo',467,180,.075,.20,.09,4.96,C.white);
for(let i=0;i<35;i++)at('Bar mare fuga doghe',467+(i*.14-2.38)/SCALE,178.35,.61,.008,1.0,.007,'#c4c5bd');
for(const du of [-2.38,2.38])at('Bar mare fianco',467+du/SCALE,185,.59,.60,1.12,.09,C.white);
for(const du of [-1.8,1.8]){at('Bar mare lanterna base',467+du/SCALE,180,1.235,.22,.025,.22,C.white);for(const dx of [-.1,.1])for(const dz of [-.1,.1]){let q=xy(467+du/SCALE,180,1.25).add(new THREE.Vector3(dx,0,dz));rod('Bar mare lanterna',q,q.clone().add(new THREE.Vector3(0,.42,0)),.012,C.white)}at('Bar mare lanterna tetto',467+du/SCALE,180,1.68,.22,.025,.22,C.white);}
// Pad of individual square paving slabs in the lawn.
for(let i=0;i<10;i++)for(let j=0;j<3;j++)at('Bar mare lastra',414+i*12.1,183+j*12.1,.04,.525,.055,.525,'#a9aba3');

polygon('Gin xp',[[1104,422],[1192,398],[1225,495],[1272,564],[1240,583],[1148,612]],.16,.2,C.stone);at('Gin xp banco',1145,448,.65,2.3,1,.58,C.white);
at('Regia',526,684,1.13,1.7,1.05,2.4,C.white);at('Regia vetro',518,684,1.7,1.6,.06,1.7,C.dark);
// Boundary walls deliberately limited to documented segments.
rod('Muro fonico',xy(105,380,1.6),xy(157,688,1.6),.07,C.white);polygon('Parete fonica',[[102,379],[110,379],[163,687],[155,689]],3.25,3.25,C.white);
polygon('Garden parete',[[218,655],[228,655],[270,900],[263,901]],2.9,2.9,C.white);polygon('Garden parete fondo',[[264,896],[505,907],[504,917],[264,905]],2.9,2.9,C.white);
// Plan-traced masonry seat centerlines: long wall, two returns, bottom and opposite L.
continuousBench(root,xy,[[326,888],[278,885],[240,660]]);
continuousBench(root,xy,[[250,705],[317,705]]);
continuousBench(root,xy,[[267,801],[321,801]]);
continuousBench(root,xy,[[472,774],[472,895],[410,895]]);
// Lawn islands and ramp along the east edge of the Glitz Bar.

polygon('Aiuola Gin XP sinistra',[[1091,429],[1143,601],[1084,616],[1080,459]],.06,.10,'#60734f');
polygon('Aiuola Gin XP ingresso',[[1083,650],[1146,633],[1164,679],[1150,716],[1093,692]],.06,.10,'#536e46');
function ramp(name,coords,heights){const verts=coords.map(([u,v],i)=>xy(u,v,heights[i]));const g=new THREE.BufferGeometry().setFromPoints(verts);g.setIndex([0,1,2,0,2,3]);g.computeVertexNormals();const m=new THREE.MeshStandardMaterial({color:C.light,roughness:.95,side:THREE.DoubleSide});const surface=add(g,m,name);surface.castShadow=false;}
ramp('Rampa ingresso divide i prati',[[570,946],[650,958],[760,655],[680,655]],[.8,.8,.6,.6]);
polygon('Prato ingresso sinistro',[[505,909],[570,946],[680,655],[572,655]],.8,.84,C.grass);
polygon('Prato ingresso destro',[[650,958],[925,1040],[1006,658],[760,655]],.8,.84,C.grass);
polygon('Prato davanti ingresso Glitz Bar',[[573,660],[640,660],[570,934],[507,909]],.8,.84,C.grass);
ramp('Raccordo ingresso Glitz Bar a prato',[[525,777],[592,795],[578,848],[511,830]],[.8,.8,.8,.8]);
// Ramp starts at the curved rear corner of Riva Deck and reaches the lawn.
ramp('Rampa curva Riva Deck verso prato',[[979,382],[1005,382],[1005,658],[979,658]],[1.1,1.1,.8,.8]);
// White entrance counters reuse the bar boarding and wooden top, with no bar equipment.
function reception(name,u,v,angle){const g=new THREE.Group();g.name=name;g.position.copy(xy(u,v,.8));g.rotation.y=angle;root.add(g);
box('Pannello dogato bianco',new THREE.Vector3(0,.54,0),.14,1.08,2.45,C.white,g);
box('Top superiore legno',new THREE.Vector3(0,1.11,0),.66,.07,2.55,C.wood,g);
box('Scrivania interna bianca operatori',new THREE.Vector3(-.40,.77,0),.70,.06,2.35,C.white,g);
for(let i=0;i<17;i++)box('Fuga doghe ingresso',new THREE.Vector3(.073,.54,-1.18+i*.14),.006,1.04,.007,'#c4c5bd',g);
for(const z of [-1.12,1.12])box('Supporto scrivania',new THREE.Vector3(-.65,.37,z),.07,.74,.07,C.white,g);
for(const z of [-.78,0,.78]){const stool=entranceStool();stool.position.set(-1.02,0,z);stool.rotation.y=Math.PI/2;g.add(stool)}
return g;
}
const entranceDirection=xy(720,655).sub(xy(610,952)).normalize(),entranceNormal=new THREE.Vector3(-entranceDirection.z,0,entranceDirection.x);
const entranceMidpoint=xy(665,803.5,.8),entranceAngle=Math.atan2(entranceDirection.x,entranceDirection.z);
for(const [name,side] of [['Ingresso tavoli',-1],['Ingresso ticket',1]]){const desk=reception(name,0,0,entranceAngle+(side===-1?Math.PI:0));desk.position.copy(entranceMidpoint).addScaledVector(entranceNormal,side*2.05);desk.userData.alignedToEntranceRamp=true;}
// Vine arch over garden lounge entry.
const archCenter=xy(490,767,.81);for(let i=0;i<24;i++){let a=i*Math.PI/24,b=(i+1)*Math.PI/24;rod('Pergola garden',archCenter.clone().add(new THREE.Vector3(0,1.65+Math.sin(a)*.7,Math.cos(a)*1.25)),archCenter.clone().add(new THREE.Vector3(0,1.65+Math.sin(b)*.7,Math.cos(b)*1.25)),.022,'#646550')}for(const x of [-1.25,1.25])rod('Montante pergola',archCenter.clone().add(new THREE.Vector3(0,0,x)),archCenter.clone().add(new THREE.Vector3(0,1.65,x)),.025,'#646550');
landscape(root,xy);
// WC blocks drawn as temporary structures in the plan.
function service(name,u,v,w,d){at(name,u,v,1.15,w,2.3,d,'#e6e6de');at(name+' tetto',u,v,2.34,w+.22,.08,d+.2,'#e6e6de');const count=name==='WC donne'?2:1;for(let j=0;j<count;j++){const vv=v+(j-(count-1)/2)*w*.42/SCALE;at(name+' porta bianca',u+d/SCALE/2+.4,vv,1.1,.85,2.1,.035,'#f1f0e9');at(name+' gradino',u+d/SCALE/2+5,vv,.12,1.0,.24,.45,'#969b97');at(name+' maniglia',u+d/SCALE/2+1.0,vv-6,.98,.15,.025,.025,'#a7adae');}for(let j=0;j<14;j++)at(name+' fuga tavole',u+d/SCALE/2+.43,v,.15+j*.155,w,.007,.01,'#cdd0c9');}
service('WC accessibile',1095,230,1.7,1.9);service('WC donne',1005,980,4.2,6.5);service('WC uomini',1413,1080,1.8,7.4);
const pois=[['Palco DJ',314,457,2.1],['Pista',461,404,.12],['Main Bar',936,613,1.9],['Bar',467,180,1.4],['Gin xp',1165,490,1.6],['Ingresso',610,958,1.1],['WC',1005,980,2.2]];
const hotspots=[];
for(const z of zones){z.overlays=[];z.lines=[];for(const part of z.parts||[{coords:z.coords,y:z.y}]){const overlay=polygon('Area '+z.id,part.coords,part.y+.035,.006,new THREE.MeshBasicMaterial({color:'#edcb94',transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide}));overlay.userData.zoneId=z.id;overlay.castShadow=false;overlay.receiveShadow=false;hotspots.push(overlay);z.overlays.push(overlay);const pts=part.coords.map(p=>xy(...p,part.y+.045));pts.push(pts[0].clone());const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:'#f9eed8',transparent:true,opacity:0}));line.name='Contorno '+z.id;root.add(line);z.lines.push(line)}}
return {root,zones,tables,pickables,hotspots,pois,materials,arch};
}
