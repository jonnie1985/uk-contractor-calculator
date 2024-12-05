import Calculator from '@/components/Calculator';
import Layout from '@/components/Layout';

export default function CalculatorPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 px-6">
          <h2 className="text-xl font-semibold mb-2">
            UK Contractor Salary Calculator 2024/2025
          </h2>
          <p className="text-gray-600">
            Calculate your potential earnings as a UK contractor with our comprehensive calculator
          </p>
        </div>
        <Calculator />
      </div>
    </Layout>
  );
}
