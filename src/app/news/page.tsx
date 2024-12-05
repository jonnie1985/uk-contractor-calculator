import Layout from '@/components/Layout';

export default function NewsPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Latest News
          </h2>
          <p className="text-base text-gray-600">
            Stay updated with the latest social work news and updates
          </p>
        </div>
        <div className="space-y-6">
          {/* Example news items */}
          <article className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">2024 Social Work Updates</h3>
            <p className="text-gray-600 mb-4">
              Latest changes and developments in social work practice for 2024.
            </p>
            <span className="text-sm text-gray-500">Posted: March 2024</span>
          </article>
          
          <article className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Professional Development Opportunities</h3>
            <p className="text-gray-600 mb-4">
              Upcoming training and development opportunities for social workers.
            </p>
            <span className="text-sm text-gray-500">Posted: February 2024</span>
          </article>
        </div>
      </div>
    </Layout>
  );
}
