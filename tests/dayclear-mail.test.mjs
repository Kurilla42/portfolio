import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { handleDayclearLead, validateDayclearLead, emailForDayclearLead, PRIVACY_VERSION, RETRY_WINDOW_MS } from '../src/lib/dayclear-mail.mjs';
const now = Date.now();
const lead = (extra={}) => ({contact:'qa@example.invalid',website:'',name:'',task:'',consent:true,policy_version:PRIVACY_VERSION,attempt_started_at:now,...extra});
const env={NODE_ENV:'production',RESEND_API_KEY:'test-only',GEO_FORM_ENABLED:'true',GEO_MAIL_FROM:'Test <test@example.invalid>'};
const request=(payload,key=randomUUID(),origin='https://www.kolesnikovdesign.pro')=>new Request('https://www.kolesnikovdesign.pro/api/dayclear-leads',{method:'POST',headers:{'content-type':'application/json',origin,'idempotency-key':key},body:JSON.stringify(payload)});
test('sender display name changes without replacing mailbox; unusual configuration is preserved',()=>{
  const valid=validateDayclearLead(lead(),now);
  for(const from of ['GEO <leads@notify.kolesnikovdesign.pro>','leads@notify.kolesnikovdesign.pro']) {
    const email=emailForDayclearLead(valid,randomUUID(),from);
    assert.equal(email.from,'Dayclear <leads@notify.kolesnikovdesign.pro>');
    assert.equal(email.subject,'Dayclear: обсудить настройку');
    assert.deepEqual(email.to,['sterlet.prod@gmail.com']);
  }
  for(const from of ['broken <test@example.invalid','test@example.invalid>','Name <a@b> extra']) assert.equal(emailForDayclearLead(valid,randomUUID(),from).from,from);
});
test('optional fields and validation boundaries',()=>{
  assert.equal(validateDayclearLead(lead(),now).website,'');
  assert.equal(validateDayclearLead(lead({website:'example.invalid'}),now).website,'https://example.invalid/');
  for(const patch of [{contact:'x'},{consent:false},{policy_version:'old'},{website:'javascript:alert(1)'},{fax:'spam'},{task:'x'.repeat(2001)},{attempt_started_at:now-RETRY_WINDOW_MS-1}]) assert.throws(()=>validateDayclearLead(lead(patch),now));
});
test('provider receipt and fixed recipient; retries retain key and payload',async()=>{
  const id='019a546a-d180-7d31-8c1a-61fe7cf89370',key=randomUUID(), deliveries=new Map(); let sends=0;
  const fetchImpl=async(url,options)=>{assert.equal(url,'https://api.resend.com/emails');const k=options.headers['Idempotency-Key']; assert.equal(k,`dayclear/${key}`); if(!deliveries.has(k)){deliveries.set(k,options.body);sends++;}else assert.equal(deliveries.get(k),options.body);return Response.json({id});};
  for(let i=0;i<2;i++){const response=await handleDayclearLead(request(lead({task:'Текущая отчетность'}),key),{env,now,fetchImpl});assert.deepEqual(await response.json(),{accepted:true,lead_id:id});}
  assert.equal(sends,1); const sent=JSON.parse([...deliveries.values()][0]);assert.deepEqual(sent.to,['sterlet.prod@gmail.com']);assert.match(sent.text,/Текущая отчетность/);assert.doesNotMatch(sent.text,/GEO|25 000/);
});
test('pre-update pending request keeps the exact legacy provider payload when attribution is absent',async()=>{
  const key=randomUUID(),input=lead({task:'Старое ожидающее обращение'}), id=randomUUID();
  const legacyText=['Заявка Dayclear',`ID обращения: ${key}`,`Контакт: ${input.contact}`,'Имя: Не указано','Сайт: Не указан',`Задача и текущая отчетность: ${input.task}`,`Согласие: ${PRIVACY_VERSION}`,`Время начала отправки: ${new Date(now).toISOString()}`].join('\n');
  const legacyPayload=JSON.stringify({from:'Dayclear <test@example.invalid>',to:['sterlet.prod@gmail.com'],subject:'Dayclear: обсудить настройку',text:legacyText,reply_to:input.contact});
  const fetchImpl=async(url,options)=>{assert.equal(options.headers['Idempotency-Key'],`dayclear/${key}`);assert.equal(options.body,legacyPayload);return Response.json({id});};
  for(const payload of [input,{...input,attribution:{}}]) {
    const response=await handleDayclearLead(request(payload,key),{env,now,fetchImpl});
    assert.deepEqual(await response.json(),{accepted:true,lead_id:id});
  }
});
test('unavailable or malformed provider does not confirm acceptance',async()=>{
  for(const fetchImpl of [async()=>Response.json({id:randomUUID()},{status:500}),async()=>Response.json({},{status:409}),async()=>Response.json({id:'bad'}),async()=>{throw new TypeError('offline');}]){
    const response=await handleDayclearLead(request(lead()),{env,now,fetchImpl});assert.ok(response.status>=400);assert.notEqual((await response.json()).accepted,true);
  }
});
test('origin, configuration, input and body size rejected before sending',async()=>{
  const fetchImpl=()=>{throw Error('must not send');};
  assert.equal((await handleDayclearLead(request(lead()),{env:{},fetchImpl})).status,503);
  assert.equal((await handleDayclearLead(request(lead(),randomUUID(),'https://evil.example'),{env,fetchImpl})).status,403);
  assert.equal((await handleDayclearLead(request(lead({contact:'x'})),{env,now,fetchImpl})).status,422);
  assert.equal((await handleDayclearLead(request(lead({task:'x'.repeat(17000)})),{env,now,fetchImpl})).status,413);
});
