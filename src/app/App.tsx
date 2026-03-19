import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router'
import { supabase } from '../lib/supabase'
import { router } from './routes'

export default function App() {
  const [, setCurrentPeriod] = useState<Record<string, unknown> | null>(null)

  useEffect(() => {
    async function runFinancialCalculations() {
      const { data: periods, error: periodsError } = await supabase
        .from('periods')
        .select('*')
        .order('start_date', { ascending: false })

      if (periodsError) {
        console.error('Current period selected', periodsError)
        return
      }

      const selectedPeriod = periods[0] ?? null

      setCurrentPeriod(selectedPeriod)

      if (!selectedPeriod) {
        console.log('Financial calculations', {
          message: 'No current period found.',
        })
        return
      }

      const [{ data: expenses, error: expensesError }, { data: income, error: incomeError }] =
        await Promise.all([
          supabase.from('expenses').select('*').eq('period_id', selectedPeriod.id),
          supabase.from('income').select('*').eq('period_id', selectedPeriod.id),
        ])

      if (expensesError || incomeError) {
        console.error('Financial calculations', {
          expensesError,
          incomeError,
        })
        return
      }

      if (expenses.length === 0 && income.length === 0) {
        console.log('Financial calculations', {
          current_period_name: selectedPeriod.name,
          message: 'No expenses or income found for the current period.',
        })
        return
      }

      const fixedExpenses = expenses.filter((expense) => expense.type === 'fixed')
      const extraExpenses = expenses.filter((expense) => expense.type === 'extra')

      const total_fixed = fixedExpenses.reduce((sum, expense) => sum + expense.amount, 0)
      const total_extra = extraExpenses.reduce((sum, expense) => sum + expense.amount, 0)
      const total_income = income.reduce((sum, entry) => sum + entry.amount, 0)
      const remaining = total_income - total_fixed - total_extra
      const split = remaining / 2

      console.log('Financial calculations', {
        current_period_name: selectedPeriod.name,
        total_fixed,
        total_extra,
        total_income,
        remaining,
        split,
      })
    }

    runFinancialCalculations()
  }, [])

  return <RouterProvider router={router} />
}
