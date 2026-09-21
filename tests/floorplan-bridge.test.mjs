import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeInventory, isTableAvailable } from '../frontend/src/components/floorplanBridge.js';
const model = [{ id:'B0',zoneId:'back' },{id:'R1',zoneId:'riva'},{id:'G1',zoneId:'glitzbar'}];
const tables = [{id:'B0',zone:'STAGE'},{id:'R1',zone:'RIVA'},{id:'G1',zone:'BAR'}];
const info = t => ({ price_from: '€ 200', min_spend: t.id==='B0' ? '€ 450 minimum' : '' });
test('reserved and booked are never selectable; free table keeps exact price text',()=>{
 const rows=makeInventory(model,tables,{B0:'reserved',R1:'booked'},info,true);
 assert.deepEqual(rows.map(r=>r.status),['soldout','soldout','available']);
 assert.equal(rows[0].priceLabel,'€ 450 minimum');
 assert.equal(rows[2].priceLabel,'Da € 200');
 assert.equal(rows[2].minSpend,null);
});
test('unverified data, deleted tables and changed zones fail closed',()=>{
 assert.ok(makeInventory(model,tables,{},info,false).every(r=>r.status==='unavailable'));
 const rows=makeInventory(model,[{id:'B0',zone:'BAR'},tables[1]],{},info,true);
 assert.deepEqual(rows.map(r=>r.status),['unavailable','available','unavailable']);
});
test('all model tables are overwritten after an inventory change',()=>{
 const a=makeInventory(model,tables,{B0:'reserved'},info,true);
 const b=makeInventory(model,tables,{R1:'booked'},info,true);
 assert.equal(a[0].status,'soldout');assert.equal(b[0].status,'available');assert.equal(b[1].status,'soldout');
});
test('unknown statuses cannot open the booking modal',()=>{
 for(const status of ['reserved','booked','soldout','unavailable','pending','unexpected'])assert.equal(isTableAvailable(status),false);
 assert.equal(isTableAvailable(undefined),true);assert.equal(isTableAvailable('available'),true);
});
