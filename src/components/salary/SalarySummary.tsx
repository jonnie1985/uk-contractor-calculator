'use client';

import React from 'react';
import { Period } from './types';

interface SalarySummaryProps {
    hourlySalary: number;
    grossSalary: number;
    hourlySalaryTakeHome: number;
    grossSalaryTakeHome: number;
    selectedPeriod: Period;
}

const SalarySummary: React.FC<SalarySummaryProps> = ({ hourlySalary, grossSalary, hourlySalaryTakeHome, grossSalaryTakeHome, selectedPeriod }) => {
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

    const periodLabel = selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1);
    const difference = hourlySalary - grossSalary;
    const percentageDiff = grossSalary ? (difference / grossSalary) * 100 : 0;
    const takeHomeDifference = hourlySalaryTakeHome - grossSalaryTakeHome;
    const takeHomePercentageDiff = grossSalaryTakeHome ? (takeHomeDifference / grossSalaryTakeHome) * 100 : 0;

    return (
        <div className="relative bg-white p-6 rounded-xl shadow-lg border-2 border-purple-400 h-full">
            <div className="absolute right-4 top-3">
                <span className="bg-purple-400 text-white rounded-full px-3 py-1 text-sm">
                    Comparison
                </span>
            </div>
            <h2 className="text-xl font-semibold mb-6 mt-8 text-gray-800">Salary Comparison</h2>
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-orange-50 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-600 mb-2">Hourly Based</h3>
                        <p className="text-xl font-bold text-orange-600">
                            {formatCurrency(getPeriodValue(hourlySalary))}
                        </p>
                        <p className="text-sm text-gray-500">{periodLabel}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-600 mb-2">Gross Based</h3>
                        <p className="text-xl font-bold text-blue-600">
                            {formatCurrency(getPeriodValue(grossSalary))}
                        </p>
                        <p className="text-sm text-gray-500">{periodLabel}</p>
                    </div>
                </div>

                {(hourlySalary > 0 && grossSalary > 0) && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-600 mb-2">Difference</h3>
                        <p className={`text-lg font-bold ${difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {difference >= 0 ? '+' : ''}{formatCurrency(getPeriodValue(difference))}
                        </p>
                        <p className={`text-sm ${difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {difference >= 0 ? '+' : ''}{percentageDiff.toFixed(1)}%
                        </p>
                        <p className="text-sm text-gray-500 mt-1">{periodLabel} difference</p>
                    </div>
                )}

                {(hourlySalaryTakeHome > 0 && grossSalaryTakeHome > 0) && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Take Home Comparison</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-orange-50 rounded-lg">
                                <h4 className="text-xs font-medium text-gray-600 mb-1">Contractor</h4>
                                <p className="text-lg font-bold text-orange-600">
                                    {formatCurrency(getPeriodValue(hourlySalaryTakeHome))}
                                </p>
                                <p className="text-xs text-gray-500">{periodLabel}</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <h4 className="text-xs font-medium text-gray-600 mb-1">Permanent</h4>
                                <p className="text-lg font-bold text-blue-600">
                                    {formatCurrency(getPeriodValue(grossSalaryTakeHome))}
                                </p>
                                <p className="text-xs text-gray-500">{periodLabel}</p>
                            </div>
                        </div>
                        <div className="mt-3 p-3 bg-gray-100 rounded-lg">
                            <h4 className="text-xs font-medium text-gray-600 mb-1">Difference</h4>
                            <p className={`text-lg font-bold ${takeHomeDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {takeHomeDifference >= 0 ? '+' : ''}{formatCurrency(getPeriodValue(takeHomeDifference))}
                            </p>
                            <p className={`text-xs ${takeHomeDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {takeHomeDifference >= 0 ? '+' : ''}{takeHomePercentageDiff.toFixed(1)}%
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SalarySummary;
