export type User = 'Alfredo' | 'Cata';

export type ExpenseType = 'fixed' | 'extra';

export interface Income {
  id: string;
  name: string;
  amount: number;
  user?: User;
  date: string;
}

export interface Expense {
  id: string;
  name: string;
  amount: number;
  type: ExpenseType;
  category: string;
  active: boolean;
  date: string;
  notes?: string;
}

export interface FinanceData {
  income: Income[];
  expenses: Expense[];
}