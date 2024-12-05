'use client';

import { useState } from 'react';
import HourlyCalculator from './salary/HourlyCalculator';
import GrossSalaryCalculator from './salary/GrossSalaryCalculator';
import SalarySummary from './salary/SalarySummary';
import { Period } from './salary/types';

const Calculator: React.FC = () => {
  const [hourlySalary, setHourlySalary] = useState<number>(0);
  const [grossSalary, setGrossSalary] = useState<number>(0);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('annually');
  const [hourlySalaryTakeHome, setHourlySalaryTakeHome] = useState<number>(0);
  const [grossSalaryTakeHome, setGrossSalaryTakeHome] = useState<number>(0);

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0 w-full">
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

export default Calculator;
