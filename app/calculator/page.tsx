import Layout from '../../src/components/Layout';
import Calculator from '../../src/components/Calculator';

export default function CalculatorPage() {
  return (
    <Layout>
      <div className="px-4 lg:px-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold mb-2">Contractor Calculator</h1>
          <p className="text-gray-600">Calculate your potential earnings as a contractor</p>
        </div>
        <div>
          <Calculator />
        </div>
      </div>
    </Layout>
  );
}
