'use client';

import React, { useState, useEffect } from 'react';
import { Slider } from '../Slider';
import { calculateTakeHome } from '@/utils/taxCalculations';
import { SalaryBreakdown } from './SalaryBreakdown';
import { Period, StudentLoanPlan } from './types';

interface HourlyCalculatorProps {
    onSalaryChange: (salary: number) => void;
    onTakeHomeChange: (takeHome: number) => void;
    selectedPeriod: Period;
    onPeriodChange: (period: Period) => void;
}

const HourlyCalculator: React.FC<HourlyCalculatorProps> = ({ 
    onSalaryChange, 
    onTakeHomeChange,
    selectedPeriod, 
    onPeriodChange 
}) => {
    const [hourlyRate, setHourlyRate] = useState<string>('');
    const [hoursPerWeek, setHoursPerWeek] = useState<string>('');
    const [umbrellaFee, setUmbrellaFee] = useState<number>(20);
    const [studentLoanPlan, setStudentLoanPlan] = useState<StudentLoanPlan>('none');

    const annualSalary = (parseFloat(hourlyRate) || 0) * (parseFloat(hoursPerWeek) || 0) * 52;
    const takeHomeCalculations = calculateTakeHome(annualSalary, umbrellaFee, studentLoanPlan, false);

    useEffect(() => {
        onSalaryChange(annualSalary);
        onTakeHomeChange(takeHomeCalculations.takeHome);
    }, [annualSalary, takeHomeCalculations.takeHome, onSalaryChange, onTakeHomeChange]);

    return (
        <div className="relative bg-white p-6 rounded-xl shadow-lg border-2 border-orange-400 h-full">
            <div className="absolute right-4 top-3">
                <span className="bg-orange-400 text-white rounded-full px-3 py-1 text-sm">
                    Contract
                </span>
            </div>
            <h2 className="text-xl font-semibold mb-6 mt-8 text-gray-800">Contractor Rate Calculator</h2>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate (£)</label>
                    <input
                        type="number"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        placeholder="Enter hourly rate"
                        min="0"
                        step="0.01"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hours per Week</label>
                    <input
                        type="number"
                        value={hoursPerWeek}
                        onChange={(e) => setHoursPerWeek(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        placeholder="Enter hours per week"
                        min="0"
                        max="168"
                        step="0.5"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student Loan Plan</label>
                    <select
                        value={studentLoanPlan}
                        onChange={(e) => setStudentLoanPlan(e.target.value as StudentLoanPlan)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    >
                        <option value="none">No Student Loan</option>
                        <option value="plan1">Plan 1 (£22,015)</option>
                        <option value="plan2">Plan 2 (£27,295)</option>
                        <option value="plan4">Plan 4 (£27,660)</option>
                        <option value="plan5">Plan 5 (£25,000)</option>
                        <option value="postgraduate">Postgraduate Loan (£21,000)</option>
                    </select>
                </div>

                <div className="pt-4 border-t border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Umbrella Company Fee</label>
                    <Slider
                        label="Weekly Fee (£)"
                        value={umbrellaFee}
                        onChange={setUmbrellaFee}
                        min={0}
                        max={50}
                        step={1}
                    />
                    <div className="mt-2 text-sm text-gray-500 flex justify-between">
                        <span>Annual fee:</span>
                        <span>£{(umbrellaFee * 52).toLocaleString()}</span>
                    </div>
                </div>

                {(parseFloat(hourlyRate) > 0 || parseFloat(hoursPerWeek) > 0) && (
                    <SalaryBreakdown
                        grossSalary={annualSalary}
                        umbrellaFee={umbrellaFee}
                        calculations={takeHomeCalculations}
                        selectedPeriod={selectedPeriod}
                        onPeriodChange={onPeriodChange}
                    />
                )}
            </div>
        </div>
    );
};

export default HourlyCalculator;
