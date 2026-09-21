import * as T from 'three';
import assert from 'node:assert/strict';
import {createModel,SCALE} from './model.js';
const m=createModel();m.root.updateMatrixWorld(true);
const t=m.tables.find(t=>t.id==='R16'),b=new T.Box3().setFromObject(t.group);
const pts=[[b.min.x,b.min.z],[b.min.x,b.max.z],[b.max.x,b.min.z],[b.max.x,b.max.z]].map(([x,z])=>[z/SCALE+580,440-x/SCALE]);
const poly=m.zones.find(z=>z.id==='riva').coords;
function inside([x,y]){let hit=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const[a,c]=poly[i],[d,e]=poly[j];if((c>y)!=(e>y)&&x<(d-a)*(y-c)/(e-c)+a)hit=!hit;}return hit;}
assert.ok(pts.every(inside),'R16 outside terrace');
for(const other of m.tables.filter(o=>o.zoneId==='riva'&&o.id!=='R16'))assert.ok(!b.intersectsBox(new T.Box3().setFromObject(other.group)),'Overlap '+other.id);
const rails=[];m.root.traverse(o=>{if(o.name==='Corrimano'||o.name==='Montante')rails.push(o)});
assert.ok(!rails.some(o=>{const h=o.geometry.parameters.height/2,r=o.geometry.parameters.radiusTop;const a=o.localToWorld(new T.Vector3(0,-h,0)),c=o.localToWorld(new T.Vector3(0,h,0)),d=c.clone().sub(a),bb=b.clone().expandByScalar(r);if(bb.containsPoint(a))return true;const hit=new T.Ray(a,d.clone().normalize()).intersectBox(bb,new T.Vector3());return hit && hit.distanceTo(a)<=d.length();}),'R16 intersects railing');
assert.deepEqual(m.root.getObjectByName('Grande pianta PB chioma alta').userData.trunkPlan,[103,125]);
console.log('R16 fully inside terrace, no railing or lounge overlaps; tree behind PB7.');
