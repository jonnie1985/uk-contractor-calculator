import { NextResponse } from 'next/server';
import { createClient } from '@vercel/edge-config';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    console.log('Received email:', email);

    if (!email || typeof email !== 'string') {
      console.log('Invalid email format');
      return NextResponse.json(
        { error: 'Invalid email' },
        { status: 400 }
      );
    }

    console.log('Edge Config ID:', process.env.EDGE_CONFIG_ID);
    const config = createClient(process.env.EDGE_CONFIG_ID!);
    
    try {
      // Get existing subscribers
      const hasSubscribers = await config.has('subscribers');
      console.log('Has subscribers:', hasSubscribers);
      
      const subscribers = hasSubscribers ? ((await config.get('subscribers')) as string[]) : [];
      console.log('Current subscribers:', subscribers);
      
      // Check if email already exists
      if (subscribers.includes(email)) {
        console.log('Email already exists');
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 400 }
        );
      }

      // Add new subscriber
      const newSubscribers = [...subscribers, email];
      console.log('New subscribers list:', newSubscribers);
      
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
        const errorText = await response.text();
        console.error('Edge Config API error:', errorText);
        throw new Error(`Failed to update subscribers: ${errorText}`);
      }

      console.log('Successfully updated subscribers');
      return NextResponse.json(
        { message: 'Successfully subscribed' },
        { status: 200 }
      );
    } catch (configError) {
      console.error('Edge Config operation error:', configError);
      throw configError;
    }
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
