import { handleGeoLead } from '@/lib/geo-mail.mjs';
export const runtime = 'nodejs';
export const maxDuration = 15;
export async function POST(request: Request) { return handleGeoLead(request); }
