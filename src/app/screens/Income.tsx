import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import IncomeItem from '../components/IncomeItem';
import { supabase } from '../../lib/supabase';
import type { AppLayoutContext } from '../components/Layout';
import type { Income } from '../types';
import { formatPeriodRange } from '../utils/periodDisplay';

type Period = {
  id: string;
  name: string;
  start_date: string;
};

export default function Income() {
  const { currentPeriodId, setCurrentPeriodId, periodRefreshCount } =
    useOutletContext<AppLayoutContext>();
  const [periods, setPeriods] = useState<Period[]>([]);
  const [income, setIncome] = useState<Income[]>([]);

  useEffect(() => {
    async function loadPeriods() {
      const { data, error } = await supabase
        .from('periods')
        .select('id, name, start_date')
        .order('start_date', { ascending: false });

      if (error) {
        return;
      }

      setPeriods(data ?? []);
    }

    loadPeriods();
  }, []);

  useEffect(() => {
    async function loadIncome() {
      if (!currentPeriodId) {
        setIncome([]);
        return;
      }

      const { data, error } = await supabase
        .from('income')
        .select('id, name, amount, user_name, income_date')
        .eq('period_id', currentPeriodId)
        .order('created_at', { ascending: true });

      if (error) {
        return;
      }

      const nextIncome = (data ?? []).map((entry) => ({
        id: entry.id,
        name: entry.name,
        amount: entry.amount,
        user:
          entry.user_name === 'Alfredo' || entry.user_name === 'Cata'
            ? entry.user_name
            : undefined,
        date: entry.income_date ?? new Date().toISOString().split('T')[0],
      }));

      setIncome(nextIncome);
    }

    loadIncome();
  }, [currentPeriodId, periodRefreshCount]);

  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
  const alfredoIncome = income
    .filter((i) => i.user === 'Alfredo')
    .reduce((sum, i) => sum + i.amount, 0);
  const cataIncome = income
    .filter((i) => i.user === 'Cata')
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Income</h1>
        <p className="text-sm text-gray-500 mt-1">Your earnings</p>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
        <label htmlFor="income-period-selector" className="block text-sm font-medium text-gray-700 mb-2">
          Select Period
        </label>
        <select
          id="income-period-selector"
          value={currentPeriodId}
          onChange={(event) => setCurrentPeriodId(event.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none"
        >
          {periods.map((period) => (
            <option key={period.id} value={period.id}>
              {formatPeriodRange(period.name)}
            </option>
          ))}
        </select>
      </div>

      {/* Total Income Card */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="text-sm opacity-90 mb-2">Total Income</div>
        <div className="text-4xl font-bold mb-4">
          ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
            <div className="text-xs opacity-90 mb-1">Alfredo</div>
            <div className="text-lg font-bold">
              ${alfredoIncome.toLocaleString('en-US')}
            </div>
          </div>
          <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
            <div className="text-xs opacity-90 mb-1">Cata</div>
            <div className="text-lg font-bold">
              ${cataIncome.toLocaleString('en-US')}
            </div>
          </div>
        </div>
      </div>

      {/* Income List */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Income Sources</h2>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
            {income.length} sources
          </span>
        </div>
        <div className="space-y-2">
          {income.length > 0 ? (
            income.map((incomeEntry) => (
              <IncomeItem key={incomeEntry.id} income={incomeEntry} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No income for this period</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Income Info</h3>
        <p className="text-xs text-blue-700">
          This is the total amount of money coming in. All income sources are combined
          to calculate the remaining balance after expenses.
        </p>
      </div>
    </div>
  );
}
