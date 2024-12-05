'use client';

import React, { useState } from 'react';
import HourlyCalculator from './HourlyCalculator';
import GrossSalaryCalculator from './GrossSalaryCalculator';
import SalarySummary from './SalarySummary';
import { Period } from './types';

const SalaryCalculator: React.FC = () => {
    const [hourlySalary, setHourlySalary] = useState<number>(0);
    const [grossSalary, setGrossSalary] = useState<number>(0);
    const [selectedPeriod, setSelectedPeriod] = useState<Period>('annually');
    const [hourlySalaryTakeHome, setHourlySalaryTakeHome] = useState<number>(0);
    const [grossSalaryTakeHome, setGrossSalaryTakeHome] = useState<number>(0);

    return (
        <div className="flex flex-row space-x-6 w-full">
            <div className="flex-1">
                <HourlyCalculator 
                    onSalaryChange={setHourlySalary} 
                    onTakeHomeChange={setHourlySalaryTakeHome}
                    selectedPeriod={selectedPeriod}
                    onPeriodChange={setSelectedPeriod}
                />
            </div>
            <div className="flex-1">
                <GrossSalaryCalculator 
                    onSalaryChange={setGrossSalary}
                    onTakeHomeChange={setGrossSalaryTakeHome}
                    selectedPeriod={selectedPeriod}
                    onPeriodChange={setSelectedPeriod}
                />
            </div>
            <div className="flex-1">
                <SalarySummary 
                    hourlySalary={hourlySalary} 
                    grossSalary={grossSalary}
                    hourlySalaryTakeHome={hourlySalaryTakeHome}
                    grossSalaryTakeHome={grossSalaryTakeHome}
                    selectedPeriod={selectedPeriod}
                />
            </div>
        </div>
    );
};

export default SalaryCalculator;
