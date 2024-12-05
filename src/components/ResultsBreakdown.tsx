'use client';

import { calculateTakeHome } from '@/utils/taxCalculations';

interface ResultsBreakdownProps {
  grossSalary: number;
  umbrellaMargin: number; // Now represents annual flat fee
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export function ResultsBreakdown({ grossSalary, umbrellaMargin }: ResultsBreakdownProps) {
  const calculations = calculateTakeHome(grossSalary, 0, 'none', false);
  const afterUmbrellaGross = grossSalary - umbrellaMargin;
  const finalCalculations = calculateTakeHome(afterUmbrellaGross, 0, 'none', false);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-6">Detailed Breakdown</h2>
      
      <div className="space-y-6">
        <div className="grid gap-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Gross Annual Salary:</span>
            <span className="font-medium">{formatCurrency(grossSalary)}</span>
          </div>
          
          <div className="flex justify-between items-center text-red-600">
            <span>Umbrella Company Fee:</span>
            <span className="font-medium">-{formatCurrency(umbrellaMargin)} per year</span>
          </div>
          <div className="flex justify-between items-center text-sm text-red-600">
            <span className="ml-4">Weekly Fee:</span>
            <span>-{formatCurrency(umbrellaMargin / 52)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Taxable Gross:</span>
            <span className="font-medium">{formatCurrency(afterUmbrellaGross)}</span>
          </div>

          <div className="pt-2 border-t border-gray-200">
            <div className="flex justify-between items-center text-red-600">
              <span>Income Tax:</span>
              <span className="font-medium">-{formatCurrency(finalCalculations.incomeTax)}</span>
            </div>
            <div className="flex justify-between items-center text-red-600">
              <span>National Insurance:</span>
              <span className="font-medium">-{formatCurrency(finalCalculations.nationalInsurance)}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Annual Take Home:</span>
              <span className="font-semibold text-green-600">{formatCurrency(finalCalculations.takeHome)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Monthly Take Home:</span>
              <span>{formatCurrency(finalCalculations.takeHome / 12)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Weekly Take Home:</span>
              <span>{formatCurrency(finalCalculations.takeHome / 52)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Tax Rates Applied</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Personal Allowance:</span>
              <span>{formatCurrency(finalCalculations.taxBreakdown.personalAllowance)}</span>
            </div>
            <div className="flex justify-between">
              <span>Basic Rate:</span>
              <span>{finalCalculations.taxBreakdown.basicRate}%</span>
            </div>
            <div className="flex justify-between">
              <span>Higher Rate:</span>
              <span>{finalCalculations.taxBreakdown.higherRate}%</span>
            </div>
            <div className="flex justify-between">
              <span>Additional Rate:</span>
              <span>{finalCalculations.taxBreakdown.additionalRate}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
