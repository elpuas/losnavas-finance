import { Expense } from '../types';
import {
  GraduationCap,
  Home,
  UtensilsCrossed,
  HeartPulse,
  Car,
  Plane,
  Circle,
  CheckCircle2,
  Calendar,
  Package,
} from 'lucide-react';

interface ExpenseItemProps {
  expense: Expense;
  onToggle: (id: string) => void;
}

const categoryIcons: Record<string, any> = {
  education: GraduationCap,
  food: UtensilsCrossed,
  health: HeartPulse,
  home: Home,
  transport: Car,
  travel: Plane,
  other: Package,
};

export default function ExpenseItem({ expense, onToggle }: ExpenseItemProps) {
  const Icon = categoryIcons[expense.category] || Circle;
  const isExtra = expense.type === 'extra';

  const formattedDate = new Date(expense.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
        expense.active
          ? isExtra
            ? 'bg-white border-orange-200'
            : 'bg-white border-gray-200'
          : 'bg-gray-50 border-gray-200 opacity-60'
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isExtra ? 'bg-orange-100' : 'bg-gray-100'
          }`}
        >
          <Icon
            className={`w-5 h-5 ${isExtra ? 'text-orange-600' : 'text-gray-600'}`}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="font-medium text-gray-900">{expense.name}</div>
            {isExtra && (
              <span className="text-[10px] bg-orange-200 text-orange-700 px-1.5 py-0.5 rounded">
                EXTRA
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
            <Calendar className="w-3 h-3" />
            {formattedDate}
          </div>
          {expense.notes && (
            <div className="text-xs text-gray-400 mt-1">{expense.notes}</div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div
            className={`font-bold ${
              expense.active ? 'text-red-600' : 'text-gray-400'
            }`}
          >
            -${expense.amount.toLocaleString('en-US')}
          </div>
        </div>
        <button
          onClick={() => onToggle(expense.id)}
          className="w-6 h-6 flex items-center justify-center"
        >
          {expense.active ? (
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          ) : (
            <Circle className="w-6 h-6 text-gray-300" />
          )}
        </button>
      </div>
    </div>
  );
}