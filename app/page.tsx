import Layout from '../src/components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="px-4 lg:px-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Latest News</h2>
          <p className="text-gray-600">
            Stay updated with the latest social work news and updates
          </p>
        </div>
        
        <div className="space-y-4">
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
