import React from 'react';
import { TaxCalculationResult } from '@/utils/taxCalculations';
import { Period } from './types';

interface GrossSalaryBreakdownProps {
    grossSalary: number;
    calculations: TaxCalculationResult;
    selectedPeriod: Period;
    onPeriodChange: (period: Period) => void;
}

export const GrossSalaryBreakdown: React.FC<GrossSalaryBreakdownProps> = ({
    grossSalary,
    calculations,
    selectedPeriod,
    onPeriodChange
}) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    const getPeriodValue = (annualValue: number): number => {
        switch (selectedPeriod) {
            case 'weekly':
                return annualValue / 52;
            case 'monthly':
                return annualValue / 12;
            default:
                return annualValue;
        }
    };

    return (
        <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Breakdown</h3>
                <div className="flex gap-2">
                    {(['weekly', 'monthly', 'annually'] as Period[]).map((period) => (
                        <button
                            key={period}
                            onClick={() => onPeriodChange(period)}
                            className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                selectedPeriod === period
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Gross Salary:</span>
                    <span className="font-medium">{formatCurrency(getPeriodValue(grossSalary))}</span>
                </div>
                
                <div className="flex justify-between items-center text-red-600">
                    <span>Income Tax:</span>
                    <span className="font-medium">-{formatCurrency(getPeriodValue(calculations.incomeTax))}</span>
                </div>
                
                <div className="flex justify-between items-center text-red-600">
                    <span>National Insurance:</span>
                    <span className="font-medium">-{formatCurrency(getPeriodValue(calculations.nationalInsurance))}</span>
                </div>

                {calculations.studentLoan > 0 && (
                    <div className="flex justify-between items-center text-red-600">
                        <span>Student Loan:</span>
                        <span className="font-medium">-{formatCurrency(getPeriodValue(calculations.studentLoan))}</span>
                    </div>
                )}
                
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="font-semibold">Take Home:</span>
                    <span className="font-semibold text-green-600">
                        {formatCurrency(getPeriodValue(calculations.takeHome))}
                    </span>
                </div>

                {selectedPeriod === 'monthly' && (
                    <div className="text-sm text-gray-500 text-right mt-2">
                        (Based on calendar month - 12 payments per year)
                    </div>
                )}
            </div>
        </div>
    );
};
