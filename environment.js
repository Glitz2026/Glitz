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
 slab('Prato esteso casa', [[-35,18],[-12,19],[22,24],[25,67],[-35,70]],.799,'#50634d');
 box('Muro contenimento villa',-5,.30,68,58,1.1,.3);
 hedge([-34,21],[-34,67]);hedge([-34,67],[23,67]);
 for(const [x,z,h,r] of [[-30,30,5,2.4],[-26,42,5.8,2.8],[-32,57,6,2.5],[20,60,4.5,2],[21,31,5,2.1]])tree(x,z,h,r,.8);
 // Paired stepping stones traced from the original plan.
 const walk=[[1045,655],[1100,927],[1495,1062]];
 for(let k=1;k<walk.length;k++){const a=xy(...walk[k-1],.82),b=xy(...walk[k],.82),d=b.clone().sub(a),n=Math.ceil(d.length()/.43),normal=new T.Vector3(-d.z,0,d.x).normalize();for(let i=0;i<=n;i++)for(const side of [-1,1]){const p=a.clone().lerp(b,i/n).addScaledVector(normal,side*.25);const stoneMesh=mesh(new T.CylinderGeometry(.20,.22,.055,8),stone,'Passi in pietra da planimetria',p.toArray());stoneMesh.rotation.y=i*.6;}}

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
 box('Trampolino bianco',7.0,y+.4,0,2.6,.12,.55,white,villa);box('Base trampolino',8,y+.18,0,.5,.36,.48,white,villa);
 for(const z of [-.45,.45]){rod('Scaletta piscina',[-6.8,y-1,z],[-6.8,y+.65,z],.035,'#b9ccca',villa);rod('Scaletta piscina maniglia',[-6.8,y+.65,z],[-7.6,y+.65,z],.035,'#b9ccca',villa);}for(let i=0;i<4;i++)rod('Scaletta piscina gradino',[-6.8,y-.95+i*.26,-.45],[-6.8,y-.95+i*.26,.45],.036,'#b9ccca',villa);
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
 // Place the villa on the measured 1:200 footprint, not the preliminary photo placement.
 // Visible PDF vector vertices; the legend masks the short northern connection.
 const footprint=[[-11.3993, 10.4106], [-6.7644, -0.0], [-2.3883, -0.7876], [6.7644, 0.0], [12.3837, 6.4903], [4.5321, 13.2008], [3.0302, 13.4709], [2.834, 12.3917], [0.7625, 12.7661], [0.9582, 13.8453], [-1.7866, 14.3399]];
 const replaceNames=['Casa volume bianco','Terrazzo tetto calpestio','Parapetto terrazzo','Cimasa cotto','Veranda pavimento','Veranda soffitto','Veranda pilastro','Infisso legno','Vetro finestra','Grata finestra','Grata traversa','Finestra laterale','Inferriata laterale','Panca veranda','Panca veranda schienale'];
 for(const o of [...villa.children])if(replaceNames.includes(o.name)||o.children.some(c=>c.name==='Tetto falda cotto'))o.removeFromParent();
 const fit=new T.Matrix4().makeScale(13.528706216292582/19,1,.8).multiply(new T.Matrix4().makeTranslation(0,0,-5.65));
 for(const o of villa.children)o.applyMatrix4(fit);
 villa.position.copy(xy(1510.73,619.47));villa.rotation.y=-1.4849557511646156;
 villa.userData={footprintSource:'planimetria.pdf, A3 1:200, vector outline',frontWidthMetres:13.528706216292582,frontWidthEstimatedAcrossLegend:true,hiddenOutline:'Northern connection under PDF legend reconstructed',poolDimensionsEstimated:true};
 // Open veranda occupies the first 1.6 m; remaining outline forms the enclosed house.
 const shell=footprint.map(([x,z])=>[x,Math.max(2.35,z)]);
 const hs=new T.Shape();shell.forEach(([x,z],i)=>i?hs.lineTo(x,-z):hs.moveTo(x,-z));hs.closePath();
 const hg=new T.ExtrudeGeometry(hs,{depth:3.5,bevelEnabled:false});hg.rotateX(-Math.PI/2);mesh(hg,white,'Casa sagoma da planimetria',[0,y,0],villa);
 slab('Tetto terrazza sagoma originale',footprint,y+3.55,cotto,villa);
 // Portico facing the pool and sea, with a central passage through its low front wall.
 box('Portico pavimento cotto',0,y+.33,1.2,13.3,.20,2.7,cotto,villa);
 box('Portico soffitto intonaco',0,y+3.25,1.2,13.8,.20,3.05,white,villa);
 for(const x of [-6.5,-2.3,2.3,6.5])box('Portico pilastro quadrato',x,y+1.75,0,.24,2.9,.24,white,villa);
 for(const x of [-4.05,4.05]){box('Portico muretto basso',x,y+.65,-.04,4.65,.66,.22,white,villa);box('Portico copertina cotto',x,y+1.0,-.04,4.76,.065,.31,cotto,villa);}
 // The actual front wall is set behind the open portico.
 for(const x of [-4.6,0,4.8]){box('Portico porta legno',x,y+1.52,2.30,1.7,2.35,.09,'#624631',villa);box('Portico vetrata',x,y+1.60,2.23,1.43,1.92,.035,'#263e3b',villa);for(let k=0;k<7;k++)rod('Portico grata',[x-.69+k*.23,y+.54,2.18],[x-.69+k*.23,y+2.70,2.18],.014,iron,villa);}
 // Open metal spiral staircase at the end of the veranda, documented in DSC09584.
 const spiral=new T.Group();spiral.name='Scala a chiocciola portico';spiral.position.set(-5.75,y+.43,1.25);villa.add(spiral);
 rod('Scala chiocciola asse',[0,0,0],[0,3.55,0],.04,iron,spiral);
 for(let i=0;i<18;i++){const a=i*Math.PI/7,h=i*.19,g=new T.Group();g.position.y=h;g.rotation.y=a;spiral.add(g);box('Scala chiocciola pedata',.35,0,0,.7,.035,.25,iron,g);rod('Scala chiocciola montante',[.68,0,0],[.68,.84,0],.012,iron,g);if(i){const b=(i-1)*Math.PI/7;rod('Scala chiocciola corrimano',[Math.cos(b)*.68,h+.65,-Math.sin(b)*.68],[Math.cos(a)*.68,h+.84,-Math.sin(a)*.68],.015,iron,spiral);}}
 // Suspended wrought-wire lanterns and climbing vines under the beam.
 for(const x of [-5.4,0,5.4]){rod('Catena lanterna',[x,y+3.12,.15],[x,y+2.70,.15],.009,iron,villa);for(let j=0;j<8;j++){const a=j*Math.PI/4,b=(j+1)*Math.PI/4;rod('Lanterna portico gabbia',[x+Math.cos(a)*.24,y+2.25,.15+Math.sin(a)*.24],[x,y+2.70,.15],.009,iron,villa);rod('Lanterna portico bordo',[x+Math.cos(a)*.24,y+2.25,.15+Math.sin(a)*.24],[x+Math.cos(b)*.24,y+2.25,.15+Math.sin(b)*.24],.009,iron,villa);}mesh(new T.CylinderGeometry(.045,.045,.13,8),'#efe0b6','Candela portico',[x,y+2.29,.15],villa);}
 for(let i=0;i<24;i++){const x=-6.4+i*.55;rod('Ramo rampicante portico',[x,y+3.1,-.05],[x+.24,y+2.85-(i%4)*.09,-.05],.012,green,villa);for(let j=0;j<4;j++){const leaf=mesh(new T.SphereGeometry(.075,5,3),j%2?'#415c30':'#5b773b','Foglia rampicante portico',[x+j*.06,y+3.03-j*.11,-.1],villa);leaf.scale.set(1.2,1,.22);}}
 // Wooden armchairs with pale cushions around the veranda tables.
 for(const x of [-4.7,-3.2,3.2,4.7])for(const z of [.65,1.8]){const chair=new T.Group();chair.position.set(x,y+.43,z);if(z>1)chair.rotation.y=Math.PI;villa.add(chair);box('Poltrona portico cuscino',0,.42,0,.55,.09,.52,white,chair);for(const a of [-.26,.26]){rod('Poltrona portico gamba',[a,0,-.22],[a,.85,-.22],.027,'#735039',chair);rod('Poltrona portico gamba',[a,0,.22],[a,.58,.22],.027,'#735039',chair);box('Poltrona portico bracciolo',a,.61,0,.055,.06,.60,'#735039',chair);}for(let j=0;j<4;j++)box('Poltrona portico schienale',-.21+j*.14,.71,-.23,.065,.40,.045,'#735039',chair);}
 // Windows on the traced perimeter.
 for(let i=1;i<footprint.length;i++){const a=footprint[i],b=footprint[(i+1)%footprint.length],dx=b[0]-a[0],dz=b[1]-a[1],len=Math.hypot(dx,dz);if(len<2||(a[1]<2.36&&b[1]<2.36))continue;const n=[dz/len,-dx/len];for(let j=1;j<=Math.floor(len/2.4);j++){const t=j/(Math.floor(len/2.4)+1),g=new T.Group();g.position.set(a[0]+dx*t+n[0]*.03,y+1.9,a[1]+dz*t+n[1]*.03);g.rotation.y=-Math.atan2(dz,dx);villa.add(g);box('Finestra villa telaio',0,0,0,1.14,1.65,.06,'#6b4f35',g);box('Finestra villa vetro',0,0,-.045,1.03,1.52,.02,'#30423d',g);for(let k=0;k<6;k++)rod('Grata villa',[-.48+k*.192,-.8,-.085],[-.48+k*.192,.8,-.085],.015,iron,g);for(const h of [-.55,.55])rod('Traversa grata villa',[-.54,h,-.085],[.54,h,-.085],.017,iron,g);}}
 // Joined pitched wings around a central terrace; mitred corners prevent crossing tiles.
 const roofOutline=[footprint[0],footprint[1],footprint[2],footprint[3],footprint[4],footprint[5],footprint[10]];
 function insetVertex(i){const n=roofOutline.length,a=new T.Vector2(...roofOutline[(i+n-1)%n]),b=new T.Vector2(...roofOutline[i]),c=new T.Vector2(...roofOutline[(i+1)%n]);const d=b.clone().sub(a).normalize(),e=c.clone().sub(b).normalize(),p=b.clone().add(new T.Vector2(-d.y,d.x).multiplyScalar(2.7)),q=b.clone().add(new T.Vector2(-e.y,e.x).multiplyScalar(2.7));const cross=(u,v)=>u.x*v.y-u.y*v.x,den=cross(d,e);return Math.abs(den)<.001?p:p.addScaledVector(d,cross(q.clone().sub(p),e)/den);}
 const innerRoof=roofOutline.map((_,i)=>insetVertex(i));
 for(let i=0;i<roofOutline.length;i++){const a=new T.Vector2(...roofOutline[i]),b=new T.Vector2(...roofOutline[(i+1)%roofOutline.length]),aa=innerRoof[i],bb=innerRoof[(i+1)%roofOutline.length];const q=[[a.x,y+3.57,a.y],[b.x,y+3.57,b.y],[bb.x,y+4.12,bb.y],[aa.x,y+4.12,aa.y]];const panel=new T.BufferGeometry();panel.setAttribute('position',new T.Float32BufferAttribute([...q[0],...q[1],...q[2],...q[0],...q[2],...q[3]],3));panel.computeVertexNormals();mesh(panel,new T.MeshStandardMaterial({color:cotto,side:T.DoubleSide,roughness:.9}),'Falda villa superficie continua',[0,0,0],villa);const count=Math.ceil(a.distanceTo(b)/.16);for(let j=0;j<count;j++){const p=a.clone().lerp(b,(j+.5)/count),r=aa.clone().lerp(bb,(j+.5)/count);rod('Coppi falda villa',[p.x,y+3.65,p.y],[r.x,y+4.20,r.y],.068,j%3?'#b87954':'#a16245',villa);}rod('Parapetto terrazza interno',[aa.x,y+4.24,aa.y],[bb.x,y+4.24,bb.y],.15,white,villa);rod('Cimasa terrazza interno',[aa.x,y+4.40,aa.y],[bb.x,y+4.40,bb.y],.045,cotto,villa);rod('Gronda villa',[a.x,y+3.56,a.y],[b.x,y+3.56,b.y],.07,cotto,villa);}
 // Removed permanently per screenshot 3: annex and patterned courtyard are outside Glitz.
 // Screenshot 6: trace patio/pool relationships from DJI_20250915173634_0048_D(1).
 // Image mapping is scaled to the current pool; elevations remain photographic estimates.
 const patio=new T.Group();patio.name='Piazzale piscina bar e scala ad angolo';villa.add(patio);
 const photo=(px,py)=>[(754-px)*.011824,(550-py)*.01308-4.52];
 const outlineUpper=[[1195,130],[1260,0],[1760,0],[1860,145],[1917,185],[1917,335],[1780,347],[1540,350],[1360,328],[1200,270]];
 const outlineLower=[[1375,405],[1540,442],[1780,439],[1917,410],[1917,940],[1780,1020],[1420,985]];
 slab('Piazzale cotto superiore collegato piscina',outlineUpper.map(p=>photo(...p)),1.70,cotto,patio);
 slab('Piazzale cotto inferiore zona bar',outlineLower.map(p=>photo(...p)),.825,cotto,patio);
 // Keep an uninterrupted tiled connection from the pool surround to the upper piazza.
 slab('Raccordo cotto piscina piazzale',[[ -5.0,-2.0],[-7.35,-2.0],[-7.35,1.5],[-5.0,1.5]],1.70,cotto,patio);
 function edging(points,height){for(let i=1;i<points.length;i++){const a=photo(...points[i-1]),b=photo(...points[i]);rod('Cordolo bianco confine prato',[a[0],height-.12,a[1]],[b[0],height-.12,b[1]],.12,white,patio);rod('Copertina cotto confine prato',[a[0],height+.02,a[1]],[b[0],height+.02,b[1]],.055,cotto,patio);}}
 edging([[1260,0],[1760,0],[1860,145],[1917,185],[1917,335]],1.7);
 edging([[1917,410],[1917,940],[1780,1020],[1420,985]],.825);
 // Seven bent treads: white risers and a terracotta nose follow the same corner.
 for(let i=0;i<7;i++){const py=340+i*13,h=1.7-(i+1)*.125;const line=[[1360-i*3,py-20],[1540,py],[1780,py-5]];const next=[[1780,py+8],[1540,py+13],[1357-i*3,py-7]];slab('Scala angolo pedata cotto',[...line,...next].map(p=>photo(...p)),h,cotto,patio);for(let j=1;j<line.length;j++){const a=photo(...line[j-1]),b=photo(...line[j]);const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute([a[0],h,a[1],b[0],h,b[1],b[0],h+.125,b[1],a[0],h,a[1],b[0],h+.125,b[1],a[0],h+.125,a[1]],3));g.computeVertexNormals();mesh(g,new T.MeshStandardMaterial({color:white,side:T.DoubleSide}),'Scala angolo alzata bianca',[0,0,0],patio);rod('Scala angolo naso cotto',[a[0],h+.015,a[1]],[b[0],h+.015,b[1]],.027,cotto,patio);}for(const px of [1360-i*3,1780]){const a=photo(px,py);pot(a[0],a[1],h,true,patio);}}
 for(const px of [1330,1815]){const a=photo(px,320),b=photo(px,445);rod('Scala angolo corrimano nero',[a[0],2.55,a[1]],[b[0],1.7,b[1]],.025,iron,patio);for(const [q,h]of[[a,1.7],[b,.825]])rod('Scala angolo montante nero',[q[0],h,q[1]],[q[0],h+.85,q[1]],.025,iron,patio);}
 // Planted separator between the pool deck and lower bar patio, with a low white retaining wall.
 const hedgeA=photo(1435,465),hedgeB=photo(1435,960);hedge(hedgeA,hedgeB,1.2,patio);rod('Muretto aiuola piscina bar',[hedgeA[0],1.24,hedgeA[1]],[hedgeB[0],1.24,hedgeB[1]],.18,white,patio);
 // Stone inset and the actual uncovered bar shown in the photos. No pergola or roof.
 const inset=[[1570,475],[1745,475],[1745,905],[1570,905]].map(p=>photo(...p));slab('Tappeto pietra piazzale bar',inset,.84,stone,patio);
 for(const px of [1585,1730]){const a=photo(px,490),b=photo(px,890);rod('Tappeto cornice cotto',[a[0],.85,a[1]],[b[0],.85,b[1]],.045,cotto,patio);}
 const bp=photo(1645,830),bar=new T.Group();bar.name='Bar patio scoperto da foto';bar.position.set(bp[0],.825,bp[1]);patio.add(bar);box('Bar patio pannello bianco',0,.52,0,1.85,1.04,.62,white,bar);box('Bar patio top legno',0,1.08,0,1.98,.07,.76,'#956444',bar);box('Bar patio piano interno',0,.77,-.36,1.65,.055,.4,white,bar);
 for(let i=0;i<12;i++)box('Bar patio fuga doghe',-.84+i*.15,.51,.315,.008,.96,.012,'#c1c4b9',bar);
 // Small white tables and director-style chairs line the club-side hedge.
 for(const py of [510,675,830]){const tp=photo(1860,py);box('Tavolino patio bianco',tp[0],1.35,tp[1],.52,.04,.52,white,patio);for(const x of [-.22,.22])for(const z of [-.22,.22])box('Tavolino patio gamba',tp[0]+x,1.08,tp[1]+z,.025,.51,.025,white,patio);for(const dz of [-.65,.65]){const z=tp[1]+dz;box('Sedia patio telo',tp[0],1.25,z,.49,.045,.45,white,patio);box('Sedia patio schienale',tp[0],1.55,z+(dz>0?.2:-.2),.49,.50,.04,white,patio);for(const dx of [-.23,.23]){rod('Sedia patio telaio',[tp[0]+dx,.825,z-.2],[tp[0]+dx,1.25,z+.2],.02,white,patio);rod('Sedia patio telaio',[tp[0]+dx,.825,z+.2],[tp[0]+dx,1.25,z-.2],.02,white,patio);}}}
 slab('Raccordo prato costa',[[11,18],[15,-29],[22,-35],[35,-35],[40,74],[20,74]],-.09,green);
 for(let i=0;i<30;i++){const z=23+i*1.35;shrub(18+Math.sin(i*.5),z,.8,.78,i%5===0);}
 for(let i=0;i<22;i++){const z=26+i*1.65;shrub(-31+Math.sin(i)*1.7,z,.8,.78,i%4===0);}
 // Removed permanently per screenshot 1: no freestanding pergola/bar at this location.
 // Warm globe fixtures along the photographed paths.
 for(const [u,v] of [[1080,650],[1130,740],[1210,845],[1390,1000],[1570,890]]){const p=xy(u,v,.8);rod('Lampione giardino',p.toArray(),[p.x,p.y+1.35,p.z],.025,iron);mesh(new T.SphereGeometry(.14,10,6),new T.MeshStandardMaterial({color:'#fff1c5',emissive:'#ffbd67',emissiveIntensity:.65}),'Globo giardino',[p.x,p.y+1.4,p.z]);}
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
 return {root,villa,panorama,gardenTarget:xy(1490,570,2),panoramaTarget:new T.Vector3(130,-3,-70)};
}
