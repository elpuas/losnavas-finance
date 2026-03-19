import { Income } from '../types';
import { TrendingUp, User, Calendar } from 'lucide-react';

interface IncomeItemProps {
  income: Income;
}

export default function IncomeItem({ income }: IncomeItemProps) {
  const formattedDate = new Date(income.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <div className="font-medium text-gray-900">{income.name}</div>
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
            {income.user && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {income.user}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </div>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold text-green-600">
          +${income.amount.toLocaleString('en-US')}
        </div>
      </div>
    </div>
  );
}