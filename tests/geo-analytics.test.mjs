import { test } from 'node:test';
import assert from 'node:assert/strict';
import { COUNTER_ID, goalId, sendGoal, backendAccepted, attributionForBackend, mountGeoAnalytics, formAttempt, formError } from '../src/lib/geo-analytics.mjs';
test('valid IDs, no personal parameters, calls do not block when unavailable', () => {
 const calls=[]; const ym=(...args)=>calls.push(args);
 assert.equal(goalId('business','full','hero_cta'),'geo_business_full_hero_cta');
 assert.equal(goalId('agency','mini','lead_success'),'geo_agency_mini_lead_success');
 assert.equal(goalId('agency',null,'telegram_click'),'geo_agency_telegram_click');
 assert.equal(goalId('wrong','full','hero_cta'),null);
 assert.equal(sendGoal('business','full','hero_cta',ym),true);
 assert.deepEqual(calls,[[COUNTER_ID,'reachGoal','geo_business_full_hero_cta']]);
 assert.equal(sendGoal('business','full','hero_cta',()=>{throw Error()}),false);
});
test('attempt and errors never count as success; receipt sends only once', () => {
 const calls=[]; const ym=(...args)=>calls.push(args);
 formAttempt('agency','mini',ym); formError('agency','mini',ym);
 assert.equal(backendAccepted({segment:'agency',product:'mini',receipt:''},ym),false);
 assert.equal(backendAccepted({segment:'agency',product:'mini',receipt:'receipt-1'},ym),true);
 assert.equal(backendAccepted({segment:'agency',product:'mini',receipt:'receipt-1'},ym),false);
 assert.deepEqual(calls.map(c=>c[2]),['geo_agency_mini_form_submit_attempt','geo_agency_mini_form_error','geo_agency_mini_lead_success']);
 assert.equal(JSON.stringify(calls).includes('receipt-1'),false);
});
test('attribution allowlist, bounded values and official callback', async () => {
 const result=await attributionForBackend({search:'?utm_source=yandex&yclid=123&email=a%40b.ru&utm_term=a%40b.ru&utm_medium='+ 'x'.repeat(101),ym:(id,method,cb)=>{assert.equal(method,'getClientID');cb('12345')}});
 assert.deepEqual(result,{utm_source:'yandex',yclid:'123',client_id:'12345'});
 assert.deepEqual(await attributionForBackend({search:'?utm_source=test',ym:()=>{},timeoutMs:5}),{utm_source:'test'});
 assert.deepEqual(await attributionForBackend({search:'',ym:()=>{throw Error()}}),{});
});
test('observer threshold, once, cleanup', () => {
 const calls=[]; let callback, observed=0, disconnected=false; const listeners={};
 const el={dataset:{geoSection:'pricing',segment:'business'},closest:(selector)=>selector === '[data-segment]' ? el : null};
 const root={addEventListener:(k,v)=>listeners[k]=v,removeEventListener:k=>delete listeners[k],querySelectorAll:()=>[el],contains:()=>true};
 class Observer { constructor(cb,opts){ callback=cb; assert.equal(opts.threshold,0.5); } observe(){observed++} unobserve(){} disconnect(){disconnected=true} }
 const cleanup=mountGeoAnalytics({root,Observer,ym:(...v)=>calls.push(v)});
 callback([{target:el,isIntersecting:true,intersectionRatio:.49}]);
 callback([{target:el,isIntersecting:true,intersectionRatio:.5},{target:el,isIntersecting:true,intersectionRatio:.9}]);
 assert.equal(observed,1); assert.equal(calls.length,1); assert.equal(calls[0][2],'geo_business_pricing_view');
 cleanup(); assert.equal(disconnected,true); assert.deepEqual(listeners,{});
});
import { readFileSync } from 'node:fs';
import { captureAttribution, ATTRIBUTION_TTL_MS } from '../src/lib/geo-analytics.mjs';
test('failed receipt call can be retried after counter loads', () => {
 const args={segment:'business',product:'full',receipt:'retry-unique'};
 assert.equal(backendAccepted(args,()=>{throw Error()}),false);
 const calls=[]; assert.equal(backendAccepted(args,(...x)=>calls.push(x)),true);
 assert.equal(backendAccepted(args,(...x)=>calls.push(x)),false); assert.equal(calls.length,1);
});
test('late counter lookup and failed section remains observed', () => {
 let callback, unobserved=0; const calls=[], listeners={};
 const el={dataset:{geoSection:'pricing',segment:'agency'},closest:s=>s==='[data-segment]'?el:null};
 const root={addEventListener:(k,v)=>listeners[k]=v,removeEventListener:()=>{},querySelectorAll:()=>[el],contains:()=>true};
 class Observer { constructor(cb){callback=cb} observe(){} unobserve(){unobserved++} disconnect(){} }
 const prior=globalThis.window; globalThis.window={};
 try {const cleanup=mountGeoAnalytics({root,Observer}); const entry={target:el,isIntersecting:true,intersectionRatio:.7};
 callback([entry]); assert.equal(unobserved,0);
 globalThis.window.ym=(...a)=>calls.push(a); callback([entry]); assert.equal(calls[0][2],'geo_agency_pricing_view'); assert.equal(unobserved,1); cleanup();
 } finally {globalThis.window=prior;}
});
test('campaign tags persist across pages for 30 minutes, filtered and storage failures safe', async () => {
 const map=new Map(), storage={setItem:(k,v)=>map.set(k,v),getItem:k=>map.get(k),removeItem:k=>map.delete(k)};
 const search='?utm_source=ya&utm_medium=cpc&utm_campaign=geo_audit_search_123&utm_content=123.456.search.desktop&utm_term='+encodeURIComponent('гео аудит цена')+'&yclid=123456789012345&match_type=exact&phrase_id=456&region_id=213&email=foo%40example.com';
 const first=captureAttribution({search,storage,now:1000}); assert.equal(first.utm_term,'гео аудит цена'); assert.equal(first.utm_content,'123.456.search.desktop'); assert.equal(first.yclid,'123456789012345'); assert.equal(first.match_type,'exact'); assert.equal(first.email,undefined);
 assert.deepEqual(captureAttribution({search:'',storage,now:2000}),first);
 const backend=await attributionForBackend({search:'',storage,now:2000,ym:(id,method,cb)=>cb('999')}); assert.equal(backend.client_id,'999'); assert.equal(JSON.stringify([...map.values()]).includes('999'),false);
 assert.deepEqual(captureAttribution({search:'',storage,now:1000+ATTRIBUTION_TTL_MS}),{});
 assert.deepEqual(captureAttribution({search:'?utm_term=hello%40example.com',storage,now:4000}),{});
 const broken={getItem(){throw Error()},setItem(){throw Error()},removeItem(){throw Error()}};
 assert.deepEqual(captureAttribution({search:'?utm_source=ya',storage:broken}),{utm_source:'ya'}); assert.deepEqual(captureAttribution({search:'',storage:broken}),{});
});
test('manifest exactly matches module goal identifiers', () => {
 const manifest=JSON.parse(readFileSync(new URL('./goals.json',import.meta.url),'utf8')); const ids=new Set();
 for(const g of manifest.goals) {assert.equal(g.identifier,goalId(g.segment,g.product,g.event)); assert.equal(ids.has(g.identifier),false); ids.add(g.identifier);}
 const events=['hero_cta','pricing_view','sample_open','form_start','form_submit_attempt','form_error','lead_success','telegram_click','phone_click','email_click'];
 for(const seg of ['business','agency']) for(const ev of events) for(const prod of ['full','mini']) {const id=goalId(seg,prod,ev); if(id) assert.ok(ids.has(id),id);}
});

