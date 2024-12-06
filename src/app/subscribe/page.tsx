'use client';

import React from 'react';
import NewsletterSignup from '@/components/NewsletterSignup';

export default function SubscribePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Newsletter Subscription
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Stay up to date with the latest contractor news, tax updates, and industry insights.
        Subscribe to our newsletter to receive regular updates directly in your inbox.
      </p>
      <div className="mt-8">
        <NewsletterSignup />
      </div>
    </div>
  );
}
