import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { AppLayoutContext } from '../components/Layout';

type Period = {
  id: string;
  name: string;
  start_date: string;
};

type ExpenseRow = {
  amount: number;
  type: 'fixed' | 'extra';
};

type IncomeRow = {
  amount: number;
};

function calculateFinancialTotals(expenses: ExpenseRow[], income: IncomeRow[]) {
  const fixedExpenses = expenses.filter((expense) => expense.type === 'fixed');
  const extraExpenses = expenses.filter((expense) => expense.type === 'extra');

  const totalFixed = fixedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalExtra = extraExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalIncome = income.reduce((sum, entry) => sum + entry.amount, 0);
  const remaining = totalIncome - totalFixed - totalExtra;
  const split = remaining / 2;

  return {
    totalFixed,
    totalExtra,
    totalIncome,
    remaining,
    split,
  };
}

export default function Dashboard() {
  const {
    currentPeriodId,
    setCurrentPeriodId,
    periodRefreshCount,
  } = useOutletContext<AppLayoutContext>();
  const [periods, setPeriods] = useState<Period[]>([]);
  const [selectedPeriodName, setSelectedPeriodName] = useState('No period selected');
  const [totals, setTotals] = useState({
    totalFixed: 0,
    totalExtra: 0,
    totalIncome: 0,
    remaining: 0,
    split: 0,
  });

  useEffect(() => {
    async function loadPeriods() {
      const { data, error } = await supabase
        .from('periods')
        .select('id, name, start_date')
        .order('start_date', { ascending: false });

      if (error) {
        console.error('Periods fetch failed', error);
        return;
      }

      const fetchedPeriods = data ?? [];
      setPeriods(fetchedPeriods);

      const initialPeriod = fetchedPeriods[0] ?? null;

      if (!initialPeriod) {
        setSelectedPeriodName('No period selected');
        console.log('Financial calculations', {
          message: 'No periods found.',
        });
        return;
      }

      if (!currentPeriodId) {
        setCurrentPeriodId(initialPeriod.id);
        setSelectedPeriodName(initialPeriod.name);
        return;
      }

      const matchingPeriod = fetchedPeriods.find((period) => period.id === currentPeriodId) ?? null;

      if (!matchingPeriod) {
        setCurrentPeriodId(initialPeriod.id);
        setSelectedPeriodName(initialPeriod.name);
        return;
      }

      setSelectedPeriodName(matchingPeriod.name);
    }

    loadPeriods();
  }, [currentPeriodId, setCurrentPeriodId]);

  useEffect(() => {
    async function loadFinancialData() {
      if (!currentPeriodId) {
        return;
      }

      const selectedPeriod = periods.find((period) => period.id === currentPeriodId) ?? null;
      setSelectedPeriodName(selectedPeriod?.name ?? 'No period selected');

      const [{ data: expenses, error: expensesError }, { data: income, error: incomeError }] =
        await Promise.all([
          supabase.from('expenses').select('amount, type').eq('period_id', currentPeriodId),
          supabase.from('income').select('amount').eq('period_id', currentPeriodId),
        ]);

      if (expensesError || incomeError) {
        console.error('Financial calculations', {
          expensesError,
          incomeError,
        });
        return;
      }

      const nextTotals = calculateFinancialTotals(expenses ?? [], income ?? []);
      setTotals(nextTotals);

      console.log('Financial calculations', {
        current_period_name: selectedPeriod?.name ?? 'Unknown period',
        total_fixed: nextTotals.totalFixed,
        total_extra: nextTotals.totalExtra,
        total_income: nextTotals.totalIncome,
        remaining: nextTotals.remaining,
        split: nextTotals.split,
      });
    }

    loadFinancialData();
  }, [currentPeriodId, periodRefreshCount, periods]);

  const totalExpenses = totals.totalFixed + totals.totalExtra;

  const chartData = [
    { name: 'Fixed', value: totals.totalFixed, color: '#6b7280' },
    { name: 'Extra', value: totals.totalExtra, color: '#f59e0b' },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Family Finance</h1>
        <p className="text-sm text-gray-500 mt-1">{selectedPeriodName}</p>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
        <label htmlFor="period-selector" className="block text-sm font-medium text-gray-700 mb-2">
          Select Period
        </label>
        <select
          id="period-selector"
          value={currentPeriodId}
          onChange={(event) => setCurrentPeriodId(event.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none"
        >
          {periods.map((period) => (
            <option key={period.id} value={period.id}>
              {period.name}
            </option>
          ))}
        </select>
      </div>

      {/* Income Card */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm opacity-90">Total Income</span>
          <TrendingUp className="w-5 h-5 opacity-90" />
        </div>
        <div className="text-4xl font-bold mb-1">
          ${totals.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
        <div className="text-sm opacity-90">Income for selected period</div>
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
            ${totals.totalFixed.toLocaleString('en-US')}
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
            ${totals.totalExtra.toLocaleString('en-US')}
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
          ${totals.remaining.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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
            ${totals.split.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <div className="text-sm text-blue-600 mb-1">Alfredo</div>
            <div className="text-xl font-bold text-blue-700">
              ${totals.split.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="bg-pink-50 rounded-xl p-4 text-center">
            <div className="text-sm text-pink-600 mb-1">Cata</div>
            <div className="text-xl font-bold text-pink-700">
              ${totals.split.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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
              ${totals.totalIncome.toLocaleString('en-US')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Fixed Expenses</span>
            <span className="text-sm font-semibold text-gray-700">
              -${totals.totalFixed.toLocaleString('en-US')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Extra Expenses</span>
            <span className="text-sm font-semibold text-orange-600">
              -${totals.totalExtra.toLocaleString('en-US')}
            </span>
          </div>
          <div className="h-px bg-gray-300 my-2"></div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-900">Balance</span>
            <span className="text-sm font-bold text-blue-600">
              ${totals.remaining.toLocaleString('en-US')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
