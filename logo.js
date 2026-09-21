import * as THREE from 'three';
import source from './logo-paths.json';
export function createLogo(width=1.85,depth=.045){
 const group=new THREE.Group();group.name='Logo GLITZ originale PDF';
 const [x0,y0,x1,y1]=source.bounds,scale=width/(x1-x0);
 const material=new THREE.MeshBasicMaterial({color:'#ffffff',side:THREE.DoubleSide});
 for(const commands of source.paths){const path=new THREE.ShapePath();
 for(const [op,...v] of commands){const x=a=>(a-(x0+x1)/2)*scale,y=a=>(y1-a)*scale;
 if(op==='M')path.moveTo(x(v[0]),y(v[1]));
 else if(op==='L')path.lineTo(x(v[0]),y(v[1]));
 else if(op==='C')path.bezierCurveTo(x(v[0]),y(v[1]),x(v[2]),y(v[3]),x(v[4]),y(v[5]));
 else if(op==='Z')path.currentPath.closePath();}
 for(const shape of path.toShapes(true)){const mesh=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:false,curveSegments:20}),material);mesh.name='Logo originale vettoriale';group.add(mesh)}
 }
 group.userData={source:'Logo bianco su nero 3(1).pdf',width,height:(y1-y0)*scale};return group;
}
