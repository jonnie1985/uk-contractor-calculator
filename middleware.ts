import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

export const config = {
  matcher: ['/api/subscribe']
};

export async function middleware() {
  // Initialize subscribers if they don't exist
  const subscribers = await get('subscribers') || [];
  
  return NextResponse.next();
}
