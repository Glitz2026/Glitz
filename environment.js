import * as T from 'three';
// Reconstructed from the September 2025 aerials and DSC09417/18.
// Garden dimensions, elevations and distant geography are photographic estimates.
export function createEnvironment(xy){
 const root=new T.Group();root.name='Giardino villa piscina e panorama';root.userData={photographicReconstruction:true,surveyVerified:false};
 const mats=new Map(),mat=(c)=>{if(!mats.has(c))mats.set(c,new T.MeshStandardMaterial({color:c,roughness:.86}));return mats.get(c)};
 const white='#ede9dc',cotto='#b66f4d',stone='#888c7e',green='#496039',iron='#343a35';
 function mesh(g,c,n,p=[0,0,0],parent=root){const m=new T.Mesh(g,typeof c==='string'?mat(c):c);m.name=n;m.position.set(...p);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 function box(n,x,y,z,w,h,d,c=white,parent=root){return mesh(new T.BoxGeometry(w,h,d),c,n,[x,y,z],parent)}
 function rod(n,a,b,r,c=iron,parent=root){a=new T.Vector3(...a);b=new T.Vector3(...b);const d=b.clone().sub(a);const m=mesh(new T.CylinderGeometry(r,r,d.length(),6),c,n,a.clone().add(b).multiplyScalar(.5).toArray(),parent);m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());return m;}
 function slab(n,points,y,c,parent=root){const s=new T.Shape();points.forEach(([x,z],i)=>i?s.lineTo(x,-z):s.moveTo(x,-z));s.closePath();const g=new T.ShapeGeometry(s);g.rotateX(-Math.PI/2);return mesh(g,c,n,[0,y,0],parent)}
 let seed=493;function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
 function shrub(x,z,r=1,y=0,flower=false,parent=root){for(let k=0;k<7;k++){const a=k*2.399;const m=mesh(new T.IcosahedronGeometry(r*(.46+rand()*.18),1),flower&&k%3===0?'#a64d88':['#365230','#476737','#617b43'][k%3],'Arbusto giardino',[x+Math.cos(a)*r*.42,y+r*.55+rand()*.25,z+Math.sin(a)*r*.42],parent);m.scale.y=.8;}}
 function tree(x,z,h=5,r=2,y=0,parent=root){rod('Tronco giardino',[x,y,z],[x,y+h*.7,z],.13,'#786855',parent);for(let k=0;k<7;k++){const a=k*2.399,xx=x+Math.cos(a)*r*.55,zz=z+Math.sin(a)*r*.55;rod('Ramo giardino',[x,y+h*.45,z],[xx,y+h*.8,zz],.045,'#786855',parent);shrub(xx,zz,r*.7,y+h*.65,false,parent)}}
 function hedge(a,b,y=.8,parent=root){const len=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.ceil(len/.85);for(let k=0;k<=n;k++)shrub(a[0]+(b[0]-a[0])*k/n,a[1]+(b[1]-a[1])*k/n,.65,y,false,parent);}
 function palm(x,z,h=4,y=0,parent=root){rod('Tronco palma',[x,y,z],[x+.15,y+h,z],.13,'#816c4e',parent);for(let k=0;k<13;k++){const a=k*2.399;let last=[x+.15,y+h,z];for(let j=1;j<7;j++){const t=j/6,p=[x+.15+Math.cos(a)*2.6*t,y+h+Math.sin(t*Math.PI)*.75-.65*t,z+Math.sin(a)*2.6*t];rod('Nervatura palma',last,p,.014,green,parent);for(const side of [-1,1]){const w=.55*Math.sin(t*Math.PI),v=[...last,...p,p[0]+Math.cos(a+Math.PI/2)*w*side,p[1]-.25,p[2]+Math.sin(a+Math.PI/2)*w*side];const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(v,3));g.computeVertexNormals();const m=mesh(g,new T.MeshStandardMaterial({color:k%2?'#52723a':'#698a45',side:T.DoubleSide}),'Palma fronda',[0,0,0],parent);}last=p;}}}
 function pot(x,z,y=0,flower=true,parent=root){mesh(new T.CylinderGeometry(.27,.18,.43,10),cotto,'Vaso terracotta',[x,y+.215,z],parent);shrub(x,z,.4,y+.35,flower,parent);}
 function fence(a,b,y,parent=root){const len=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.ceil(len/.4);for(let i=0;i<=n;i++){const x=a[0]+(b[0]-a[0])*i/n,z=a[1]+(b[1]-a[1])*i/n;rod('Ringhiera giardino',[x,y,z],[x,y+.88,z],.018,iron,parent);}rod('Corrimano giardino',[a[0],y+.88,a[1]],[b[0],y+.88,b[1]],.024,iron,parent);}
 // Garden continuation behind the club, on the villa side of the entrance ramp.
 slab('Prato esteso casa', [[-35,18],[-12,19],[22,24],[25,67],[-35,70]],.78,green);
 box('Muro contenimento villa',-5,.30,68,58,1.1,.3);
 hedge([-34,21],[-34,67]);hedge([-34,67],[23,67]);
 for(const [x,z,h,r] of [[-30,30,5,2.4],[-26,42,5.8,2.8],[-32,57,6,2.5],[20,60,4.5,2],[21,31,5,2.1]])tree(x,z,h,r,.8);
 for(let i=0;i<40;i++){const t=i/39,x=-21+Math.sin(t*3)*2,z=22+t*42;for(const dx of [-.35,.35]){const s=mesh(new T.CylinderGeometry(.25,.25,.055,7),stone,'Passi in pietra nel prato',[x+dx,.82,z]);s.rotation.y=i*.7;}}
 hedge([-18,26],[-18,38]);hedge([-18,42],[-18,63]);
 // Villa and pool share a local frame; long pool edge parallel to the veranda.
 const villa=new T.Group();villa.name='Casa e piscina';villa.position.copy(xy(1450,610,0));root.add(villa);
 const y=1.7;
 // Solarium ring leaves a real opening for the pool basin.
 box('Solarium lato casa',0,y-.13,5,21,.26,3.2,cotto,villa);
 box('Solarium lato mare',0,y-.13,-5,21,.26,3.2,cotto,villa);
 box('Solarium sinistro',-8.8,y-.13,0,3.4,.26,6.8,cotto,villa);
 box('Solarium destro',8.8,y-.13,0,3.4,.26,6.8,cotto,villa);
 box('Piscina fondo azzurro',0,y-1.25,0,14,.10,6,'#59bdce',villa);
 for(const z of [-3.08,3.08]){box('Piscina parete',0,y-.65,z,14.4,1.3,.16,'#a8dadb',villa);box('Bordo piscina cotto',0,y+.025,z,14.5,.12,.32,cotto,villa);}
 for(const x of [-7.1,7.1]){box('Piscina parete',x,y-.65,0,.2,1.3,6.1,'#a8dadb',villa);box('Bordo piscina cotto',x,y+.025,0,.32,.12,6.45,cotto,villa);}
 const water=new T.MeshPhysicalMaterial({color:'#28b8d3',roughness:.16,metalness:.12,transparent:true,opacity:.78,clearcoat:1});
 const pg=new T.PlaneGeometry(14,6,45,20);pg.rotateX(-Math.PI/2);const pa=pg.attributes.position;for(let i=0;i<pa.count;i++)pa.setY(i,.012*Math.sin(pa.getX(i)*8+pa.getZ(i)*11));pg.computeVertexNormals();mesh(pg,water,'Piscina acqua',[0,y-.12,0],villa);
 for(let i=0;i<65;i++){const x=-6.7+rand()*13.4,z=-2.8+rand()*5.6;const m=box('Riflesso acqua piscina',x,y-.105,z,.1+rand()*.35,.004,.008,'#72dae0',villa);m.rotation.y=rand();m.castShadow=false;}
 box('Trampolino bianco',-7.0,y+.4,0,2.6,.12,.55,white,villa);box('Base trampolino',-8,y+.18,0,.5,.36,.48,white,villa);
 for(const x of [5.45,6]){rod('Scaletta piscina',[x,y-1,2.8],[x,y+.65,2.8],.035,'#b9ccca',villa);rod('Scaletta piscina maniglia',[x,y+.65,2.8],[x,y+.65,3.45],.035,'#b9ccca',villa);}for(let i=0;i<4;i++)rod('Scaletta piscina gradino',[5.45,y-.95+i*.26,2.8],[6,y-.95+i*.26,2.8],.036,'#b9ccca',villa);
 // Terracotta tile seams and photographed sunbeds.
 for(let x=-10;x<=10;x+=.65)for(const z of [-5,5])box('Fuga cotto',x,y+.005,z,.012,.006,2.95,'#c18a69',villa);
 function lounger(x,z,angle){const g=new T.Group();g.position.set(x,y,z);g.rotation.y=angle;villa.add(g);box('Lettino tela bianca',0,.34,0,.7,.09,1.9,white,g);const back=box('Lettino schienale',0,.58,-.62,.7,.08,.65,white,g);back.rotation.x=.50;for(const xx of [-.32,.32]){rod('Lettino telaio',[xx,.05,-.8],[xx,.34,.8],.025,iron,g);rod('Lettino telaio',[xx,.34,-.8],[xx,.05,.8],.025,iron,g);}}
 for(const [x,z,a] of [[-4,-4.7,.25],[0,-4.7,0],[4,-4.7,-.2],[8.9,-1,Math.PI/2],[8.9,1.7,Math.PI/2],[-8.9,2,-Math.PI/2]])lounger(x,z,a);
 for(const [x,z] of [[-9.5,-5.5],[9.6,-5.5],[-9.5,5.5]])palm(x,z,3.1,y,villa);
 for(const [x,z] of [[-6,-5.4],[2,-5.5],[6,5.7],[-6,5.7],[-9,3.8],[9,3.8]])pot(x,z,y,true,villa);
 fence([-10.4,-6.5],[10.4,-6.5],y,villa);hedge([-10.7,-6.8],[10.7,-6.8],y-.2,villa);
 // Main building: open veranda, white stucco, terracotta roof wings and central roof terrace.
 box('Casa volume bianco',0,y+2,11.8,19,4,8.6,white,villa);
 box('Veranda pavimento',0,y+.37,7.1,18,.24,3.1,cotto,villa);
 box('Veranda soffitto',0,y+3.4,7.1,19,.20,3.4,white,villa);
 for(const x of [-8.7,-3.1,3.1,8.7])box('Veranda pilastro',x,y+1.95,5.8,.25,2.9,.25,white,villa);
 for(let i=0;i<3;i++)box('Scala veranda',0,y+.06+i*.12,5.1+i*.25,4,.12+i*.12,.30,cotto,villa);
 function windowAt(x,z,w=1.8){box('Infisso legno',x,y+1.8,z,w+.14,1.9,.12,'#6b4f35',villa);box('Vetro finestra',x,y+1.8,z-.075,w,1.75,.035,'#283e3c',villa);for(let k=-w/2;k<=w/2;k+=.20)rod('Grata finestra',[x+k,y+.9,z-.12],[x+k,y+2.7,z-.12],.017,iron,villa);for(const h of [1.1,2.4])rod('Grata traversa',[x-w/2,y+h,z-.12],[x+w/2,y+h,z-.12],.019,iron,villa);}
 for(const x of [-6.1,-1.2,4.2,7.2])windowAt(x,7.46,x===-1.2?2.4:1.8);
 for(const z of [10,13.2]){box('Finestra laterale',9.56,y+2,z,.08,1.8,1.5,'#293e39',villa);for(let k=0;k<8;k++)rod('Inferriata laterale',[9.62,y+1.1,z-.7+k*.2],[9.62,y+2.9,z-.7+k*.2],.017,iron,villa);}
 box('Terrazzo tetto calpestio',0,y+4.07,11.7,13,.14,7.6,cotto,villa);
 for(const z of [8.0,15.4]){box('Parapetto terrazzo',0,y+4.48,z,13,.8,.20,white,villa);box('Cimasa cotto',0,y+4.90,z,13.2,.055,.28,cotto,villa);}
 for(const x of [-6.5,6.5])box('Parapetto terrazzo',x,y+4.48,11.7,.20,.8,7.6,white,villa);
 function roofWing(x,z,w,d,rot=0){const g=new T.Group();g.position.set(x,y+4.02,z);g.rotation.z=rot;villa.add(g);box('Tetto falda cotto',0,0,0,w,.15,d,cotto,g);for(let a=-w/2;a<=w/2;a+=.20)rod('Coppo terracotta',[a,.10,-d/2],[a,.10,d/2],.055,a%1>.4?'#a66447':'#c18a61',g);}
 roofWing(-8.15,11.65,3.8,9.5,.16);roofWing(8.15,11.65,3.8,9.5,-.16);roofWing(0,6.5,19,1.1);
 box('Camino',-4.6,y+5.25,14.2,.5,2.2,.55,white,villa);for(let i=0;i<3;i++)box('Camino cappello',-4.6,y+6.3+i*.10,14.2,.64,.06,.68,cotto,villa);
 for(const [x,z] of [[-5.6,8.8],[5.5,14.6]])pot(x,z,y+4.15,false,villa);
 // Wooden veranda lounge furniture, separate from the club's booking inventory.
 for(const x of [-6,5]){box('Tavolo veranda legno',x,y+1.1,6.8,1.3,.12,.8,'#79583d',villa);for(const dx of [-.55,.55])for(const dz of [-.3,.3])box('Gamba tavolo veranda',x+dx,y+.78,6.8+dz,.06,.55,.06,'#79583d',villa);for(const z of [6,7.7]){box('Panca veranda',x,y+.84,z,1.9,.12,.55,'#79583d',villa);box('Panca veranda schienale',x,y+1.2,z+.2,1.9,.7,.08,'#79583d',villa);}}
 // Broad garden staircase, white risers, terracotta treads and flowerpots (DSC09417).
 for(let i=0;i<7;i++){const top=.8+(i+1)*.13;box('Scala giardino alzata bianca',-13,top-.065,-1.8+i*.36,4.5,.13,.36,white,villa);box('Scala giardino pedata cotto',-13,top+.01,-1.8+i*.36,4.55,.04,.36,cotto,villa);for(const side of [-1,1])pot(-13+side*2.0,-1.8+i*.36,top,false,villa);}
 for(const side of [-1,1])rod('Corrimano scala giardino',[-13+side*2.35,1.6,-2],[-13+side*2.35,2.51,.7],.025,iron,villa);
 slab('Patio giardino cotto',[[-17,-7],[-10.5,-7],[-10.5,-2],[-17,-2]],.81,cotto,villa);
 hedge([-17,-7],[-17,5],.8,villa);
 for(const [x,z] of [[-15,4],[-12,15],[12,13],[12,4]])shrub(x,z,1.2,.8,true,villa);
 // Place the villa on the measured 1:200 footprint, not the preliminary photo placement.
 // Visible PDF vector vertices; the legend masks the short northern connection.
 const footprint=[[-5.698,0],[5.698,0],[8.197,3.677],[11.200,12.359],[7.557,20.132],[-1.767,15.689],[-2.625,14.427],[-1.719,13.809],[-2.903,12.068],[-3.809,12.686],[-5.378,10.380]];
 const replaceNames=['Casa volume bianco','Terrazzo tetto calpestio','Parapetto terrazzo','Cimasa cotto'];
 for(const o of [...villa.children])if(replaceNames.includes(o.name)||o.children.some(c=>c.name==='Tetto falda cotto'))o.removeFromParent();
 const fit=new T.Matrix4().makeScale(11.3957907/19,1,.8).multiply(new T.Matrix4().makeTranslation(0,0,-5.65));
 for(const o of villa.children)o.applyMatrix4(fit);
 villa.position.copy(xy(1317.46,753.485));villa.rotation.y=-.333027111;
 villa.userData={footprintSource:'planimetria.pdf, A3 1:200, vector outline',frontWidthMetres:11.3957907,hiddenOutline:'Northern connection under PDF legend reconstructed',poolDimensionsEstimated:true};
 // Open veranda occupies the first 1.6 m; remaining outline forms the enclosed house.
 const shell=footprint.map(([x,z])=>[x,z===0?1.6:z]);
 const hs=new T.Shape();shell.forEach(([x,z],i)=>i?hs.lineTo(x,-z):hs.moveTo(x,-z));hs.closePath();
 const hg=new T.ExtrudeGeometry(hs,{depth:3.5,bevelEnabled:false});hg.rotateX(-Math.PI/2);mesh(hg,white,'Casa sagoma da planimetria',[0,y,0],villa);
 slab('Tetto terrazza sagoma originale',footprint,y+3.55,cotto,villa);
 for(let i=0;i<footprint.length;i++){const a=footprint[i],b=footprint[(i+1)%footprint.length];rod('Parapetto sagoma villa',[a[0],y+3.85,a[1]],[b[0],y+3.85,b[1]],.25,white,villa);rod('Cimasa sagoma villa',[a[0],y+4.12,a[1]],[b[0],y+4.12,b[1]],.075,cotto,villa);const len=Math.hypot(b[0]-a[0],b[1]-a[1]);for(let j=0;j<len/.19;j++){const t=j*.19/len,x=a[0]+(b[0]-a[0])*t,z=a[1]+(b[1]-a[1])*t;const n=new T.Vector2(-(b[1]-a[1]),b[0]-a[0]).normalize();rod('Coppi bordo sagoma',[x,y+3.6,z],[x+n.x*.6,y+3.37,z+n.y*.6],.048,cotto,villa);}}
 // Windows on the traced perimeter.
 for(let i=1;i<footprint.length;i++){const a=footprint[i],b=footprint[(i+1)%footprint.length],dx=b[0]-a[0],dz=b[1]-a[1],len=Math.hypot(dx,dz);if(len<2)continue;const n=[dz/len,-dx/len];for(let j=1;j<=Math.floor(len/2.4);j++){const t=j/(Math.floor(len/2.4)+1),g=new T.Group();g.position.set(a[0]+dx*t+n[0]*.03,y+1.9,a[1]+dz*t+n[1]*.03);g.rotation.y=-Math.atan2(dz,dx);villa.add(g);box('Finestra villa telaio',0,0,0,1.14,1.65,.06,'#6b4f35',g);box('Finestra villa vetro',0,0,-.045,1.03,1.52,.02,'#30423d',g);for(let k=0;k<6;k++)rod('Grata villa',[-.48+k*.192,-.8,-.085],[-.48+k*.192,.8,-.085],.015,iron,g);for(const h of [-.55,.55])rod('Traversa grata villa',[-.54,h,-.085],[.54,h,-.085],.017,iron,g);}}
 // Pitched terracotta wings around the central roof terrace.
 for(let i=1;i<footprint.length;i++){const a=footprint[i],b=footprint[(i+1)%footprint.length],len=Math.hypot(b[0]-a[0],b[1]-a[1]);if(len<3)continue;const inward=new T.Vector2(-(b[1]-a[1]),b[0]-a[0]).normalize();for(let j=0;j<len/.16;j++){const t=j*.16/len,x=a[0]+(b[0]-a[0])*t,z=a[1]+(b[1]-a[1])*t;rod('Coppi falda villa',[x,y+3.65,z],[x+inward.x*1.65,y+4.20,z+inward.y*1.65],.078,j%3?'#b87954':'#a16245',villa);}}
 slab('Raccordo prato costa',[[11,18],[15,-29],[22,-35],[35,-35],[40,74],[20,74]],-.09,green);
 for(let i=0;i<30;i++){const z=23+i*1.35;shrub(18+Math.sin(i*.5),z,.8,.78,i%5===0);}
 for(let i=0;i<22;i++){const z=26+i*1.65;shrub(-31+Math.sin(i)*1.7,z,.8,.78,i%4===0);}
 // Slightly sloping coastal scrub beyond the black sea railing, leaving lawn tables untouched.
 const shore=new T.BufferGeometry();shore.setAttribute('position',new T.Float32BufferAttribute([17,-.2,-27,25,-.2,24,58,-8,45,17,-.2,-27,58,-8,45,62,-8,-48],3));shore.computeVertexNormals();mesh(shore,'#70794a','Pendio macchia mediterranea');
 for(let i=0;i<85;i++){const x=25+rand()*25,z=-29+rand()*64;shrub(x,z,.4+rand()*.65,-.3-(x-25)*.16);}
 // Sea, Dino island silhouette and mainland coast are scenic geometry, not a land survey.
 const panorama=new T.Group();panorama.name='Mare Isola di Dino e costa';root.add(panorama);
 const sea=box('Mare',560,-10.2,0,1050,.10,1550,new T.MeshStandardMaterial({color:'#377b99',roughness:.34,metalness:.28}),panorama);sea.castShadow=false;
 for(let i=0;i<110;i++){const x=65+rand()*740,z=-600+rand()*1200;const wave=box('Increspatura mare',x,-10.13,z,.10,.01,2+rand()*13,'#6495aa',panorama);wave.castShadow=false;}
 // Low, long limestone island with a vegetated plateau and an irregular cliff perimeter.
 const island=new T.Group();island.name='Isola di Dino';island.position.set(245,-10,-155);island.rotation.y=-.20;panorama.add(island);
 const outline=[[-16,-47],[-24,-35],[-26,-14],[-24,12],[-16,43],[-6,52],[7,49],[17,35],[22,8],[18,-23],[8,-43]];
 const positions=[],colors=[];const rock=new T.Color('#aaa68c'),leaf=new T.Color('#657856');
 function tri(a,b,c,color){positions.push(...a,...b,...c);for(let j=0;j<3;j++)colors.push(color.r,color.g,color.b);}
 for(let i=0;i<outline.length;i++){const a=outline[i],b=outline[(i+1)%outline.length],h=7.5+Math.sin(i*1.7)*1.3,hh=7.5+Math.sin((i+1)*1.7)*1.3;const aa=[a[0]*.83,h,a[1]*.9],bb=[b[0]*.83,hh,b[1]*.9];tri([a[0],0,a[1]],[b[0],0,b[1]],aa,rock);tri([b[0],0,b[1]],bb,aa,rock);tri(aa,bb,[0,10.5,0],leaf);}
 const ig=new T.BufferGeometry();ig.setAttribute('position',new T.Float32BufferAttribute(positions,3));ig.setAttribute('color',new T.Float32BufferAttribute(colors,3));ig.computeVertexNormals();mesh(ig,new T.MeshStandardMaterial({vertexColors:true,roughness:1,side:T.DoubleSide}),'Falesia e sommità isola',[0,0,0],island);
 for(let i=0;i<18;i++){const z=-37+i*4.5;rod('Striatura falesia',[-23,-.1,z],[-19,6.8,z+.8],.24,'#959880',island);}
 // Mainland landmass remains distinct from the island, separated by water.
 const coastpoints=[[370,-450],[330,-335],[348,-210],[400,-80],[470,70],[600,240],[880,480]];
 const cp=[];for(let i=1;i<coastpoints.length;i++){const a=coastpoints[i-1],b=coastpoints[i];cp.push(a[0],-10,a[1],b[0],-10,b[1],b[0]+220,40+28*Math.sin(i),b[1],a[0],-10,a[1],b[0]+220,40+28*Math.sin(i),b[1],a[0]+220,40+28*Math.sin(i-1),a[1]);}
 const cg=new T.BufferGeometry();cg.setAttribute('position',new T.Float32BufferAttribute(cp,3));cg.computeVertexNormals();mesh(cg,new T.MeshStandardMaterial({color:'#7f9188',roughness:1,side:T.DoubleSide}),'Costa e rilievi sullo sfondo',[0,0,0],panorama);
 for(let i=0;i<38;i++){const z=-340+i*18,x=360+(z+340)*.35;box('Edifici lontani sulla costa',x,-4,z,2+rand()*3,2+rand()*3,3,'#cac7b4',panorama);}
 return {root,villa,panorama,gardenTarget:xy(1370,620,2),panoramaTarget:new T.Vector3(130,-3,-70)};
}
