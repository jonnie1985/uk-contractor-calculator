import { createClient } from '@vercel/edge-config';
import { NextResponse } from 'next/server';

const client = createClient(process.env.EDGE_CONFIG_ID!);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Get current subscribers
    const subscribers = ((await client.get('subscribers')) || []) as string[];
    
    // Check if email already exists
    if (subscribers.includes(email)) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      );
    }

    // Add new subscriber
    await client.set('subscribers', [...subscribers, email]);

    return NextResponse.json(
      { message: 'Successfully subscribed' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
