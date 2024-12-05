import { NextResponse } from 'next/server';
import { createClient } from '@vercel/edge-config';
import { experimental_set } from '@vercel/edge-config';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Invalid email' },
        { status: 400 }
      );
    }

    const client = createClient(process.env.EDGE_CONFIG_ID!);
    
    // Get existing subscribers
    const subscribers = (await client.get('subscribers')) as string[] || [];
    
    // Check if email already exists
    if (subscribers.includes(email)) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      );
    }

    // Add new subscriber
    await experimental_set('subscribers', [...subscribers, email]);

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
