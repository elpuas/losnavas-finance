import { mockData } from '../data';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, Users } from 'lucide-react';

export default function Dashboard() {
  const totalIncome = mockData.income.reduce((sum, i) => sum + i.amount, 0);

  const fixedExpenses = mockData.expenses
    .filter((e) => e.active && e.type === 'fixed')
    .reduce((sum, e) => sum + e.amount, 0);

  const extraExpenses = mockData.expenses
    .filter((e) => e.active && e.type === 'extra')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpenses = fixedExpenses + extraExpenses;
  const remainingBalance = totalIncome - totalExpenses;
  const splitAmount = remainingBalance / 2;

  const chartData = [
    { name: 'Fixed', value: fixedExpenses, color: '#6b7280' },
    { name: 'Extra', value: extraExpenses, color: '#f59e0b' },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Family Finance</h1>
        <p className="text-sm text-gray-500 mt-1">Fixed-expense-first model</p>
      </div>

      {/* Income Card */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm opacity-90">Total Income</span>
          <TrendingUp className="w-5 h-5 opacity-90" />
        </div>
        <div className="text-4xl font-bold mb-1">
          ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
        <div className="text-sm opacity-90">Monthly earnings</div>
      </div>

      {/* Expenses Breakdown */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-gray-700" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${fixedExpenses.toLocaleString('en-US')}
          </div>
          <div className="text-xs text-gray-500 mt-1">Fixed Expenses</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Mandatory costs</div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-orange-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-orange-600">
            ${extraExpenses.toLocaleString('en-US')}
          </div>
          <div className="text-xs text-gray-500 mt-1">Extra Expenses</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Optional costs</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-900 mb-4">Expense Breakdown</h2>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          {chartData.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600">
                {entry.name}: ${entry.value.toLocaleString('en-US')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Remaining Balance */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm opacity-90">Remaining Balance</span>
          <TrendingDown className="w-5 h-5 opacity-90" />
        </div>
        <div className="text-4xl font-bold mb-1">
          ${remainingBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
        <div className="text-sm opacity-90">
          After ${totalExpenses.toLocaleString('en-US')} in expenses
        </div>
      </div>

      {/* Split Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-gray-700" />
          <h2 className="font-semibold text-gray-900">Available to Split</h2>
        </div>
        <div className="text-center mb-4">
          <div className="text-sm text-gray-500 mb-1">Each person receives</div>
          <div className="text-3xl font-bold text-blue-600">
            ${splitAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <div className="text-sm text-blue-600 mb-1">Alfredo</div>
            <div className="text-xl font-bold text-blue-700">
              ${splitAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="bg-pink-50 rounded-xl p-4 text-center">
            <div className="text-sm text-pink-600 mb-1">Cata</div>
            <div className="text-xl font-bold text-pink-700">
              ${splitAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Stats</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Income</span>
            <span className="text-sm font-semibold text-green-600">
              ${totalIncome.toLocaleString('en-US')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Fixed Expenses</span>
            <span className="text-sm font-semibold text-gray-700">
              -${fixedExpenses.toLocaleString('en-US')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Extra Expenses</span>
            <span className="text-sm font-semibold text-orange-600">
              -${extraExpenses.toLocaleString('en-US')}
            </span>
          </div>
          <div className="h-px bg-gray-300 my-2"></div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-900">Balance</span>
            <span className="text-sm font-bold text-blue-600">
              ${remainingBalance.toLocaleString('en-US')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
