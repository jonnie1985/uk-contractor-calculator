export type Period = 'weekly' | 'monthly' | 'annually';

export type StudentLoanPlan = 'none' | 'plan1' | 'plan2' | 'plan4' | 'plan5' | 'postgraduate';

export const STUDENT_LOAN_THRESHOLDS = {
    plan1: 22_015,  // £22,015 per year
    plan2: 27_295,  // £27,295 per year
    plan4: 27_660,  // £27,660 per year
    plan5: 25_000,  // £25,000 per year
    postgraduate: 21_000  // £21,000 per year
};

export const STUDENT_LOAN_RATES = {
    plan1: 0.09,  // 9%
    plan2: 0.09,  // 9%
    plan4: 0.09,  // 9%
    plan5: 0.09,  // 9%
    postgraduate: 0.06  // 6%
};
