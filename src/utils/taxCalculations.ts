import { StudentLoanPlan, STUDENT_LOAN_THRESHOLDS, STUDENT_LOAN_RATES } from '@/components/salary/types';

export interface TaxCalculationResult {
    takeHome: number;
    incomeTax: number;
    nationalInsurance: number;
    employerNI: number;
    studentLoan: number;
    grossAfterEmployerNI: number;
    taxBreakdown: TaxBreakdown;
}

export interface TaxBreakdown {
    personalAllowance: number;
    basicRate: number;
    higherRate: number;
    additionalRate: number;
}

const TAX_CONSTANTS = {
    PERSONAL_ALLOWANCE: 12_570,
    BASIC_RATE_THRESHOLD: 50_270,
    HIGHER_RATE_THRESHOLD: 125_140,
    NI_WEEKLY_THRESHOLD: 242, // £242 per week (£12,584 annually)
    NI_WEEKLY_UPPER_LIMIT: 967, // £967 per week (£50,270 annually)
    EMPLOYER_NI_WEEKLY_THRESHOLD: 175, // £175 per week
    EMPLOYER_NI_RATE: 0.138, // 13.8%
    EMPLOYEE_NI_RATE: 0.08, // 8% for 2024/25 (reduced from 12%)
    EMPLOYEE_NI_UPPER_RATE: 0.02 // 2%
};

const calculateEmployerNI = (grossSalary: number, weeklyUmbrellaFee: number = 0): number => {
    const weeklyGross = grossSalary / 52;
    
    // Using the formula: (((rate x hours - umbrella_fee) - 175) / 113.8 * 100) + 175
    // This gives us the amount that NI applies to
    const weeklyNIableAmount = ((weeklyGross - weeklyUmbrellaFee - TAX_CONSTANTS.EMPLOYER_NI_WEEKLY_THRESHOLD) / 113.8 * 100) 
        + TAX_CONSTANTS.EMPLOYER_NI_WEEKLY_THRESHOLD;
    
    // Then calculate 13.8% of the amount above threshold
    let weeklyNI = 0;
    if (weeklyNIableAmount > TAX_CONSTANTS.EMPLOYER_NI_WEEKLY_THRESHOLD) {
        weeklyNI = (weeklyNIableAmount - TAX_CONSTANTS.EMPLOYER_NI_WEEKLY_THRESHOLD) * TAX_CONSTANTS.EMPLOYER_NI_RATE;
    }

    return Math.floor(weeklyNI * 52);
};

const calculateEmployeeNI = (grossSalary: number): number => {
    // Round to 2 decimal places at each step to avoid floating point errors
    const weeklyGross = Math.round((grossSalary / 52) * 100) / 100;
    let weeklyNI = 0;

    if (weeklyGross > TAX_CONSTANTS.NI_WEEKLY_UPPER_LIMIT) {
        // 2% on income above upper limit (£967 per week)
        const upperAmount = Math.round((weeklyGross - TAX_CONSTANTS.NI_WEEKLY_UPPER_LIMIT) * 100) / 100;
        weeklyNI += Math.round((upperAmount * TAX_CONSTANTS.EMPLOYEE_NI_UPPER_RATE) * 100) / 100;
        
        // 8% on income between primary threshold and upper limit
        const mainAmount = Math.round((TAX_CONSTANTS.NI_WEEKLY_UPPER_LIMIT - TAX_CONSTANTS.NI_WEEKLY_THRESHOLD) * 100) / 100;
        weeklyNI += Math.round((mainAmount * TAX_CONSTANTS.EMPLOYEE_NI_RATE) * 100) / 100;
    } else if (weeklyGross > TAX_CONSTANTS.NI_WEEKLY_THRESHOLD) {
        // 8% on income above primary threshold up to upper limit
        const amount = Math.round((weeklyGross - TAX_CONSTANTS.NI_WEEKLY_THRESHOLD) * 100) / 100;
        weeklyNI += Math.round((amount * TAX_CONSTANTS.EMPLOYEE_NI_RATE) * 100) / 100;
    }

    return Math.floor(weeklyNI * 52);
};

const calculateStudentLoanDeduction = (salary: number, plan: StudentLoanPlan): number => {
    if (plan === 'none' || !salary) return 0;
    
    const threshold = STUDENT_LOAN_THRESHOLDS[plan];
    const rate = STUDENT_LOAN_RATES[plan];
    
    if (salary <= threshold) return 0;
    
    // Calculate annual deduction
    const amount = Math.round((salary - threshold) * 100) / 100;
    return Math.floor(amount * rate);
};

export const calculateTakeHome = (
    grossBeforeDeductions: number, 
    umbrellaFee: number = 0,
    studentLoanPlan: StudentLoanPlan = 'none',
    isPermanent: boolean = false
): TaxCalculationResult => {
    // Handle invalid input
    if (!grossBeforeDeductions || grossBeforeDeductions < 0) {
        return {
            takeHome: 0,
            incomeTax: 0,
            nationalInsurance: 0,
            employerNI: 0,
            studentLoan: 0,
            grossAfterEmployerNI: 0,
            taxBreakdown: {
                personalAllowance: 0,
                basicRate: 0,
                higherRate: 0,
                additionalRate: 0
            }
        };
    }

    // Calculate Employer's NI using the weekly umbrella fee
    const employerNI = isPermanent ? 0 : calculateEmployerNI(grossBeforeDeductions, umbrellaFee);
    
    // First deduct umbrella fee from gross
    const annualUmbrellaFee = umbrellaFee * 52;
    const grossAfterFee = grossBeforeDeductions - annualUmbrellaFee;
    
    // For contractors, deduct both umbrella fee and employer NI to get adjusted gross
    // For permanent employees, use original gross
    const grossAfterEmployerNI = isPermanent ? grossBeforeDeductions : (grossAfterFee - employerNI);
    const taxableGross = isPermanent ? grossBeforeDeductions : grossAfterEmployerNI;

    // Calculate Income Tax
    let taxableIncome = Math.max(0, taxableGross - TAX_CONSTANTS.PERSONAL_ALLOWANCE);
    let incomeTax = 0;
    let basicRate = 0;
    let higherRate = 0;
    let additionalRate = 0;

    if (taxableGross > TAX_CONSTANTS.HIGHER_RATE_THRESHOLD) {
        // Additional rate (45%)
        const additionalRateIncome = taxableGross - TAX_CONSTANTS.HIGHER_RATE_THRESHOLD;
        additionalRate = additionalRateIncome * 0.45;
        incomeTax += additionalRate;

        // Higher rate (40%)
        const higherRateIncome = TAX_CONSTANTS.HIGHER_RATE_THRESHOLD - TAX_CONSTANTS.BASIC_RATE_THRESHOLD;
        higherRate = higherRateIncome * 0.40;
        incomeTax += higherRate;

        // Basic rate (20%)
        const basicRateIncome = TAX_CONSTANTS.BASIC_RATE_THRESHOLD - TAX_CONSTANTS.PERSONAL_ALLOWANCE;
        basicRate = basicRateIncome * 0.20;
        incomeTax += basicRate;

    } else if (taxableGross > TAX_CONSTANTS.BASIC_RATE_THRESHOLD) {
        // Higher rate (40%)
        const higherRateIncome = taxableGross - TAX_CONSTANTS.BASIC_RATE_THRESHOLD;
        higherRate = higherRateIncome * 0.40;
        incomeTax += higherRate;

        // Basic rate (20%)
        const basicRateIncome = TAX_CONSTANTS.BASIC_RATE_THRESHOLD - TAX_CONSTANTS.PERSONAL_ALLOWANCE;
        basicRate = basicRateIncome * 0.20;
        incomeTax += basicRate;

    } else if (taxableIncome > 0) {
        // Basic rate only (20%)
        basicRate = taxableIncome * 0.20;
        incomeTax += basicRate;
    }

    // Calculate Employee's National Insurance using original gross for permanent employees
    const niGross = isPermanent ? grossBeforeDeductions : grossAfterEmployerNI;
    const nationalInsurance = calculateEmployeeNI(niGross);

    // Calculate Student Loan using original gross for permanent employees
    const studentLoanGross = isPermanent ? grossBeforeDeductions : grossAfterEmployerNI;
    const studentLoan = calculateStudentLoanDeduction(studentLoanGross, studentLoanPlan);

    // Calculate final take-home
    const takeHome = Math.floor(grossAfterEmployerNI - incomeTax - nationalInsurance - studentLoan);

    return {
        takeHome,
        incomeTax: Math.floor(incomeTax),
        nationalInsurance,
        employerNI: Math.floor(employerNI),
        studentLoan,
        grossAfterEmployerNI: Math.floor(grossAfterEmployerNI),
        taxBreakdown: {
            personalAllowance: TAX_CONSTANTS.PERSONAL_ALLOWANCE,
            basicRate,
            higherRate,
            additionalRate
        }
    };
}
