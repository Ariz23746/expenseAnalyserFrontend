export interface categoryExpenseProps {
  month: number;
  year: number;
  totalAmountSpent: number;
  categoryName: string;
  categoryBudget: number;
  isDark: boolean;
  color: string;
  categoryId: string;
}
export interface expenseProps {
  userId: string;
  categoryId: string;
  name: string;
  description: string;
  amount: number;
  month: number;
  year: 2024;
  createdAt: string;
}

export interface PieChartDataFormat {
  label: number;
  y: number;
  color: string;
  name: string;
  id: string;
}

export interface ReportsProps {
  totalAmountSpent: number;
  month: number;
  year: number;
}

export interface BreakDownCardProps {
  variant: 'increase' | 'decrease' | 'neutral';
  type: 'incoming' | 'outgoing' | 'saving' | 'wallet';
  cardTitle: string;
  cardSubtitle?: string;
  amount?: string;
  percentage?: number;
  marginLeft?: boolean;
  isFallback?: boolean;
  index?: number;
}

export interface Budget {
  userId: string;
  amount: number;
  month: number;
  year: number;
}

export interface User {
  avatar: string;
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  passwordChangedAt: string;
  phone: string;
  updatedAt: string;
  username: string;
  _id?: string;
}
