import { useState } from 'react';
import { mockData } from '../data';
import ExpenseItem from '../components/ExpenseItem';

export default function Expenses() {
  const [expenses, setExpenses] = useState(mockData.expenses);

  const toggleExpense = (id: string) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, active: !e.active } : e))
    );
  };

  const fixedExpenses = expenses.filter((e) => e.type === 'fixed');
  const extraExpenses = expenses.filter((e) => e.type === 'extra');

  const totalFixed = fixedExpenses
    .filter((e) => e.active)
    .reduce((sum, e) => sum + e.amount, 0);
  const totalExtra = extraExpenses
    .filter((e) => e.active)
    .reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = totalFixed + totalExtra;

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your costs</p>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-gray-500 mb-1">Fixed</div>
            <div className="text-lg font-bold text-gray-700">
              ${totalFixed.toLocaleString('en-US')}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Extra</div>
            <div className="text-lg font-bold text-orange-600">
              ${totalExtra.toLocaleString('en-US')}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Total</div>
            <div className="text-lg font-bold text-red-600">
              ${totalExpenses.toLocaleString('en-US')}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Expenses Section */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">Fixed Expenses</h2>
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">
            {fixedExpenses.filter((e) => e.active).length} active
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-4">Mandatory recurring costs</p>
        <div className="space-y-2">
          {fixedExpenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onToggle={toggleExpense}
            />
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              Fixed Total
            </span>
            <span className="text-lg font-bold text-gray-900">
              ${totalFixed.toLocaleString('en-US')}
            </span>
          </div>
        </div>
      </div>

      {/* Extra Expenses Section */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 shadow-sm border border-orange-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">Extra Expenses</h2>
          <span className="text-xs bg-orange-200 text-orange-700 px-2 py-1 rounded-full font-medium">
            {extraExpenses.filter((e) => e.active).length} active
          </span>
        </div>
        <p className="text-xs text-orange-700 mb-4">Optional or unexpected costs</p>
        <div className="space-y-2">
          {extraExpenses.length > 0 ? (
            extraExpenses.map((expense) => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                onToggle={toggleExpense}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No extra expenses yet</p>
            </div>
          )}
        </div>
        {extraExpenses.length > 0 && (
          <div className="mt-4 pt-4 border-t border-orange-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-orange-900">
                Extra Total
              </span>
              <span className="text-lg font-bold text-orange-700">
                ${totalExtra.toLocaleString('en-US')}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
