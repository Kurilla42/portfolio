// Local test preload only. Never imported by the app or enabled on Vercel.
import { randomUUID } from 'node:crypto';
if (process.env.VERCEL) throw new Error('Local test preload must not run on Vercel');
const original=globalThis.fetch;
const receipts=new Map();
globalThis.fetch=async (input,options)=>{
  if(String(input)==='https://api.resend.com/emails'){
    const body=JSON.parse(options.body);
    if(body.text.includes('qa-error@example.invalid'))return Response.json({error:'test failure'},{status:500});
    const key=options.headers['Idempotency-Key'];
    if(!receipts.has(key))receipts.set(key,randomUUID());
    return Response.json({id:receipts.get(key)});
  }
  return original(input,options);
};
