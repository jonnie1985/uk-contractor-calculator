'use client';

import React, { useState, useEffect } from 'react';
import { calculateTakeHome } from '@/utils/taxCalculations';
import { GrossSalaryBreakdown } from './GrossSalaryBreakdown';
import { Period, StudentLoanPlan } from './types';

interface GrossSalaryCalculatorProps {
    onSalaryChange: (salary: number) => void;
    onTakeHomeChange: (takeHome: number) => void;
    selectedPeriod: Period;
    onPeriodChange: (period: Period) => void;
}

const GrossSalaryCalculator: React.FC<GrossSalaryCalculatorProps> = ({ 
    onSalaryChange,
    onTakeHomeChange,
    selectedPeriod,
    onPeriodChange
}) => {
    const [grossSalary, setGrossSalary] = useState<string>('');
    const [studentLoanPlan, setStudentLoanPlan] = useState<StudentLoanPlan>('none');

    const takeHomeCalculations = calculateTakeHome(parseFloat(grossSalary) || 0, 0, studentLoanPlan, true);

    useEffect(() => {
        const salary = parseFloat(grossSalary) || 0;
        onSalaryChange(salary);
        onTakeHomeChange(takeHomeCalculations.takeHome);
    }, [grossSalary, takeHomeCalculations.takeHome, onSalaryChange, onTakeHomeChange]);

    return (
        <div className="relative bg-white p-6 rounded-xl shadow-lg border-2 border-blue-400 h-full">
            <div className="absolute right-4 top-3">
                <span className="bg-blue-400 text-white rounded-full px-3 py-1 text-sm">
                    Permanent
                </span>
            </div>
            <h2 className="text-xl font-semibold mb-6 mt-8 text-gray-800">Permanent Salary Calculator</h2>
            <div className="space-y-6">
                <div>
                    <label htmlFor="grossSalary" className="block text-sm font-medium text-gray-700 mb-1">
                        Annual Gross Salary (£)
                    </label>
                    <input
                        type="number"
                        id="grossSalary"
                        value={grossSalary}
                        onChange={(e) => setGrossSalary(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter annual gross salary"
                        min="0"
                        step="1000"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student Loan Plan</label>
                    <select
                        value={studentLoanPlan}
                        onChange={(e) => setStudentLoanPlan(e.target.value as StudentLoanPlan)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                        <option value="none">No Student Loan</option>
                        <option value="plan1">Plan 1 (£22,015)</option>
                        <option value="plan2">Plan 2 (£27,295)</option>
                        <option value="plan4">Plan 4 (£27,660)</option>
                        <option value="plan5">Plan 5 (£25,000)</option>
                        <option value="postgraduate">Postgraduate Loan (£21,000)</option>
                    </select>
                </div>

                {parseFloat(grossSalary) > 0 && (
                    <GrossSalaryBreakdown
                        grossSalary={parseFloat(grossSalary)}
                        calculations={takeHomeCalculations}
                        selectedPeriod={selectedPeriod}
                        onPeriodChange={onPeriodChange}
                    />
                )}
            </div>
        </div>
    );
};

export default GrossSalaryCalculator;
