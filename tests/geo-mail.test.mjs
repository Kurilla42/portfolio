import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { handleGeoLead, validateLead, PRIVACY_VERSION, RETRY_WINDOW_MS } from '../src/lib/geo-mail.mjs';
const now=Date.now();
const lead = (extra={}) => ({segment:'business',product:'full',contact:'qa@example.invalid',website:'example.invalid',name:'Тест',consent:true,policy_version:PRIVACY_VERSION,attempt_started_at:now,...extra});
const env={NODE_ENV:'production',RESEND_API_KEY:'test-only',GEO_FORM_ENABLED:'true',GEO_MAIL_FROM:'GEO <test@example.invalid>'};
const request=(payload,key=randomUUID(),origin='https://www.kolesnikovdesign.pro')=>new Request('https://www.kolesnikovdesign.pro/api/geo-leads',{method:'POST',headers:{'content-type':'application/json',origin,'idempotency-key':key},body:JSON.stringify(payload)});
test('business/agency × full/mini validation; additional qualifiers required',()=>{
  for(const segment of ['business','agency'])for(const product of ['full','mini']) {
    const data=lead({segment,product,agency_name:'Агентство',analysis_target_confirmed:true,task:'Проверить описание компании',price_acknowledged:true});
    assert.equal(validateLead(data,now).product,product);
    if(segment==='agency')assert.throws(()=>validateLead({...data,analysis_target_confirmed:false},now));
    if(product==='mini')assert.throws(()=>validateLead({...data,price_acknowledged:false},now));
  }
  for(const patch of [{consent:false},{contact:'x'},{website:'javascript:alert(1)'},{segment:'other'},{policy_version:'old'},{fax:'spam'},{attempt_started_at:now-RETRY_WINDOW_MS-1}])assert.throws(()=>validateLead(lead(patch),now));
});
test('only a valid provider receipt returns accepted; fixed recipient, plain text, attribution',async()=>{
  let sent;
  const id=randomUUID();
  const result=await handleGeoLead(request(lead({attribution:{utm_source:'yandex',contact:'not-a-tag',client_id:'123'}})),{env,now,fetchImpl:async(url,options)=>{sent={url,...JSON.parse(options.body)};return Response.json({id});}});
  assert.deepEqual(await result.json(),{accepted:true,lead_id:id});
  assert.deepEqual(sent.to,['sterlet.prod@gmail.com']);assert.match(sent.text,/utm_source: yandex/);assert.match(sent.text,/client_id: 123/);assert.doesNotMatch(sent.text,/not-a-tag/);assert.equal(sent.html,undefined);
});

test('provider UUIDv7 receipt confirms acceptance for both landing pages',async()=>{
  const id='019a546a-d180-7d31-8c1a-61fe7cf89370';
  for(const segment of ['business','agency']) {
    const response=await handleGeoLead(request(lead({segment,agency_name:'Агентство',analysis_target_confirmed:true})),{env,now,fetchImpl:async()=>Response.json({id})});
    assert.equal(response.status,200);
    assert.deepEqual(await response.json(),{accepted:true,lead_id:id});
  }
});
test('double click/retry use same provider key and receipt',async()=>{
  const key=randomUUID(),id=randomUUID();const deliveries=new Map();let sends=0;
  const fetchImpl=async(url,options)=>{const k=options.headers['Idempotency-Key'];if(!deliveries.has(k)){deliveries.set(k,options.body);sends++;}else assert.equal(deliveries.get(k),options.body);return Response.json({id});};
  const results=await Promise.all([1,2].map(()=>handleGeoLead(request(lead(),key),{env,now,fetchImpl})));
  assert.equal(sends,1);assert.deepEqual(await results[0].json(),await results[1].json());
});
test('errors, offline, timeout and malformed receipts never report success',async()=>{
  const failures=[async()=>Response.json({id:randomUUID()},{status:500}),async()=>Response.json({name:'invalid_idempotent_request'},{status:409}),async()=>Response.json({id:'bad'}),async()=>{throw new TypeError('network');},async()=>{throw new DOMException('timeout','TimeoutError');}];
  for(const fetchImpl of failures){const response=await handleGeoLead(request(lead()),{env,now,fetchImpl});assert.ok(response.status>=400);assert.notEqual((await response.json()).accepted,true);}
});
test('missing configuration, foreign origin and malformed input send no email',async()=>{
  const fetchImpl=()=>{throw new Error('must not be reached');};
  assert.equal((await handleGeoLead(request(lead()),{env:{},fetchImpl})).status,503);
  assert.equal((await handleGeoLead(request(lead(),randomUUID(),'https://evil.example'),{env,fetchImpl})).status,403);
  assert.equal((await handleGeoLead(request(lead({contact:'x'})),{env,now,fetchImpl})).status,422);
  assert.equal((await handleGeoLead(request(lead({name:'x'.repeat(17000)})),{env,now,fetchImpl})).status,413);
});
