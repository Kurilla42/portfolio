import { handleDayclearLead } from '@/lib/dayclear-mail.mjs';
export const runtime = 'nodejs';
export const maxDuration = 15;
export async function POST(request: Request) { return handleDayclearLead(request); }
