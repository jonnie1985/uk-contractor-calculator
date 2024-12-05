import { NextResponse } from 'next/server';
import { createClient } from '@vercel/edge-config';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Invalid email' },
        { status: 400 }
      );
    }

    const config = createClient(process.env.EDGE_CONFIG_ID!);
    
    // Get existing subscribers
    const hasSubscribers = await config.has('subscribers');
    const subscribers = hasSubscribers ? ((await config.get('subscribers')) as string[]) : [];
    
    // Check if email already exists
    if (subscribers.includes(email)) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      );
    }

    // Add new subscriber
    const newSubscribers = [...subscribers, email];
    await config.update([
      {
        operation: 'set',
        key: 'subscribers',
        value: newSubscribers
      }
    ]);

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
