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
    
    // Use Edge Config API directly
    const response = await fetch(`https://edge-config.vercel.com/v1/items?edgeConfigId=${process.env.EDGE_CONFIG_ID}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${process.env.EDGE_CONFIG_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            operation: 'upsert',
            key: 'subscribers',
            value: newSubscribers
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update subscribers');
    }

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
