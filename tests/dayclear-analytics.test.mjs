import test from 'node:test';
import assert from 'node:assert/strict';
import { ATTRIBUTION_TTL_MS, captureDayclearAttribution, safeDayclearAttribution, dayclearGoal, dayclearAccepted } from '../src/lib/dayclear-analytics.mjs';
import { validateDayclearLead, emailForDayclearLead, PRIVACY_VERSION } from '../src/lib/dayclear-mail.mjs';

const tags = { utm_source:'youtube', utm_medium:'organic_social', utm_campaign:'dayclear_7d_20261119', utm_content:'profile' };
test('video attribution survives navigation in the tab, expires, and cannot break forms when storage is blocked', () => {
  const values = new Map();
  const storage = { setItem:(k,v)=>values.set(k,v), getItem:k=>values.get(k), removeItem:k=>values.delete(k) };
  const search = '?' + new URLSearchParams(tags);
  assert.deepEqual(captureDayclearAttribution({search,storage,now:10}),tags);
  assert.deepEqual(captureDayclearAttribution({search:'',storage,now:11}),tags);
  assert.deepEqual(captureDayclearAttribution({search:'',storage,now:10+ATTRIBUTION_TTL_MS}),{});
  const blocked = { setItem(){throw Error('blocked');},getItem(){throw Error('blocked');} };
  assert.deepEqual(captureDayclearAttribution({search,storage:blocked}),tags);
  assert.deepEqual(captureDayclearAttribution({search:'',storage:blocked}),{});
  assert.deepEqual(captureDayclearAttribution({search:'?'+new URLSearchParams({...tags,utm_source:'instagram'}),storage}),{...tags,utm_source:'instagram'});
});
test('only campaign labels pass to the existing lead mail; contact values and arbitrary query parameters are excluded', () => {
  assert.deepEqual(safeDayclearAttribution({...tags,utm_term:'qa@example.invalid',contact:'+79999999999',client_id:'123'}),tags);
  assert.deepEqual(safeDayclearAttribution({...tags,utm_campaign:'qa@example.invalid',utm_content:'+79999999999'}),{utm_source:'youtube',utm_medium:'organic_social'});
  assert.deepEqual(safeDayclearAttribution({...tags,utm_source:'qa@example.invalid'}),{});
  const now=Date.now();
  const lead=validateDayclearLead({contact:'qa@example.invalid',consent:true,policy_version:PRIVACY_VERSION,attempt_started_at:now,attribution:{...tags,contact:'PRIVATE'}},now);
  const text=emailForDayclearLead(lead,'local-test','test@example.invalid').text;
  assert.match(text,/utm_source: youtube/);
  assert.match(text,/utm_campaign: dayclear_7d_20261119/);
  assert.doesNotMatch(text,/PRIVATE/);
});
test('goals contain only counter and fixed event; accepted receipt is deduplicated and never transmitted', () => {
  const calls=[]; const ym=(...args)=>calls.push(args);
  assert.equal(dayclearGoal('arbitrary',ym),false);
  assert.equal(dayclearAccepted('invalid',ym),false);
  assert.equal(dayclearGoal('dayclear_telegram_click',ym),true);
  const receipt='019a546a-d180-7d31-8c1a-61fe7cf89371';
  assert.equal(dayclearAccepted(receipt,ym),true);
  assert.equal(dayclearAccepted(receipt,ym),false);
  assert.deepEqual(calls,[[109643428,'reachGoal','dayclear_telegram_click'],[109643428,'reachGoal','dayclear_lead_accepted']]);
  assert.equal(dayclearGoal('dayclear_sample_open',()=>{throw Error('blocked');}),false);
});
