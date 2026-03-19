import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { User, ExpenseType } from '../types';
import type { AppLayoutContext } from '../components/Layout';
import { supabase } from '../../lib/supabase';
import {
  GraduationCap,
  Home,
  UtensilsCrossed,
  HeartPulse,
  Car,
  Plane,
  ArrowLeft,
  Plus,
  Package,
} from 'lucide-react';

type TransactionTemplate = {
  id: string;
  name: string;
  type: 'income' | 'expense';
  subtype: 'fixed' | 'extra' | null;
  user_name: string | null;
};

const ADD_NEW_TEMPLATE = 'add-new';

export default function Add() {
  const navigate = useNavigate();
  const { currentPeriodId, refreshCurrentPeriodData } = useOutletContext<AppLayoutContext>();
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    user: '' as User | '',
    category: 'food',
    expenseType: 'fixed' as ExpenseType,
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });
  const [templates, setTemplates] = useState<TransactionTemplate[]>([]);
  const [selectedIncomeTemplateId, setSelectedIncomeTemplateId] = useState(ADD_NEW_TEMPLATE);
  const [selectedFixedTemplateId, setSelectedFixedTemplateId] = useState(ADD_NEW_TEMPLATE);

  const categories = [
    { value: 'education', label: 'Education', icon: GraduationCap },
    { value: 'food', label: 'Food', icon: UtensilsCrossed },
    { value: 'health', label: 'Health', icon: HeartPulse },
    { value: 'home', label: 'Home', icon: Home },
    { value: 'transport', label: 'Transport', icon: Car },
    { value: 'travel', label: 'Travel', icon: Plane },
    { value: 'other', label: 'Other', icon: Package },
  ];

  useEffect(() => {
    async function loadTemplates() {
      const { data, error } = await supabase
        .from('transaction_templates')
        .select('id, name, type, subtype, user_name')
        .order('name', { ascending: true });

      if (error) {
        console.error('Transaction templates fetch failed', error);
        return;
      }

      setTemplates(data ?? []);
    }

    loadTemplates();
  }, []);

  const incomeTemplates = templates.filter((template) => template.type === 'income');
  const fixedExpenseTemplates = templates.filter(
    (template) => template.type === 'expense' && template.subtype === 'fixed'
  );
  const extraExpenseTemplates = templates.filter(
    (template) => template.type === 'expense' && template.subtype === 'extra'
  );

  async function createTemplate(
    templateName: string,
    templateType: 'income' | 'expense',
    templateSubtype: 'fixed' | 'extra' | null
  ) {
    const trimmedName = templateName.trim();

    if (!trimmedName) {
      return;
    }

    const { data, error } = await supabase
      .from('transaction_templates')
      .insert({
        name: trimmedName,
        type: templateType,
        subtype: templateSubtype,
        user_name: formData.user || null,
      })
      .select('id, name, type, subtype, user_name')
      .single();

    if (error) {
      console.error('Transaction template insert failed', error);
      return;
    }

    setTemplates((currentTemplates) => [...currentTemplates, data]);
  }

  function resolveTransactionName() {
    if (type === 'income') {
      if (selectedIncomeTemplateId === ADD_NEW_TEMPLATE) {
        return formData.name.trim();
      }

      return (
        incomeTemplates.find((template) => template.id === selectedIncomeTemplateId)?.name ??
        formData.name.trim()
      );
    }

    if (formData.expenseType === 'fixed' && selectedFixedTemplateId !== ADD_NEW_TEMPLATE) {
      return (
        fixedExpenseTemplates.find((template) => template.id === selectedFixedTemplateId)?.name ??
        formData.name.trim()
      );
    }

    return formData.name.trim();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPeriodId) {
      console.error('Add transaction failed', {
        message: 'No current period selected.',
      });
      return;
    }

    const transactionName = resolveTransactionName();

    if (!transactionName) {
      console.error('Add transaction failed', {
        message: 'Transaction name is required.',
      });
      return;
    }

    if (type === 'income' && selectedIncomeTemplateId === ADD_NEW_TEMPLATE) {
      await createTemplate(transactionName, 'income', null);
    }

    if (type === 'expense' && formData.expenseType === 'fixed' && selectedFixedTemplateId === ADD_NEW_TEMPLATE) {
      await createTemplate(transactionName, 'expense', 'fixed');
    }

    const amount = Number(formData.amount);

    if (type === 'income') {
      const { error } = await supabase.from('income').insert({
        name: transactionName,
        amount,
        user_name: formData.user || null,
        income_date: formData.date,
        period_id: currentPeriodId,
      });

      if (error) {
        console.error('Add transaction failed', error);
        return;
      }
    } else {
      const { error } = await supabase.from('expenses').insert({
        name: transactionName,
        amount,
        category: formData.category,
        type: formData.expenseType,
        note: formData.notes || null,
        expense_date: formData.date,
        user_name: formData.user || null,
        period_id: currentPeriodId,
      });

      if (error) {
        console.error('Add transaction failed', error);
        return;
      }
    }

    refreshCurrentPeriodData();
    navigate('/');
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="pt-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add Transaction</h1>
          <p className="text-sm text-gray-500 mt-1">Record income or expense</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type Toggle */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
              type === 'income'
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            Income
          </button>
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
              type === 'expense'
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            Expense
          </button>
        </div>

        {type === 'income' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Template
            </label>
            <select
              value={selectedIncomeTemplateId}
              onChange={(e) => setSelectedIncomeTemplateId(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={ADD_NEW_TEMPLATE}>Add new</option>
              {incomeTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {(type === 'income' && selectedIncomeTemplateId === ADD_NEW_TEMPLATE) && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter name"
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}

        {/* Amount Input */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
              $
            </span>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              placeholder="0.00"
              step="0.01"
              className="w-full pl-8 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Date Input */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* User Selection (optional for income) */}
        {type === 'income' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              User (Optional)
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, user: formData.user === 'Alfredo' ? '' : 'Alfredo' })
                }
                className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all ${
                  formData.user === 'Alfredo'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Alfredo
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, user: formData.user === 'Cata' ? '' : 'Cata' })
                }
                className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all ${
                  formData.user === 'Cata'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Cata
              </button>
            </div>
          </div>
        )}

        {/* Category and Type for Expenses */}
        {type === 'expense' && (
          <>
            {/* Expense Type */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Expense Type
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, expenseType: 'fixed' })
                  }
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                    formData.expenseType === 'fixed'
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="text-sm font-semibold">Fixed</div>
                  <div className="text-xs opacity-75 mt-0.5">Mandatory</div>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, expenseType: 'extra' })
                  }
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                    formData.expenseType === 'extra'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="text-sm font-semibold">Extra</div>
                  <div className="text-xs opacity-75 mt-0.5">Optional</div>
                </button>
              </div>
            </div>

            {/* Category Selection */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, category: cat.value })
                      }
                      className={`py-3 px-2 rounded-xl font-medium transition-all flex flex-col items-center gap-1.5 ${
                        formData.category === cat.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {formData.expenseType === 'fixed' && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template
                </label>
                <select
                  value={selectedFixedTemplateId}
                  onChange={(e) => setSelectedFixedTemplateId(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={ADD_NEW_TEMPLATE}>Add new</option>
                  {fixedExpenseTemplates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}

        {type === 'expense' && formData.expenseType === 'fixed' && selectedFixedTemplateId === ADD_NEW_TEMPLATE && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter name"
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}

        {type === 'expense' && formData.expenseType === 'extra' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              list="extra-expense-template-suggestions"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter name"
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <datalist id="extra-expense-template-suggestions">
              {extraExpenseTemplates.map((template) => (
                <option key={template.id} value={template.name} />
              ))}
            </datalist>
          </div>
        )}

        {/* Notes */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes (Optional)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Add any notes..."
            rows={3}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 bg-blue-500 text-white font-semibold rounded-2xl shadow-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add {type === 'income' ? 'Income' : 'Expense'}
        </button>
      </form>
    </div>
  );
}
