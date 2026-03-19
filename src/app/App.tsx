import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router'
import { supabase } from '../lib/supabase'
import { router } from './routes'

export default function App() {
  const [, setCurrentPeriod] = useState(null)

  useEffect(() => {
    async function selectCurrentPeriod() {
      const { data, error } = await supabase
        .from('periods')
        .select('*')
        .order('start_date', { ascending: false })

      if (error) {
        console.error('Current period selected', error)
        return
      }

      const selectedPeriod = data[0] ?? null

      setCurrentPeriod(selectedPeriod)
      console.log('Current period selected', selectedPeriod)
    }

    selectCurrentPeriod()
  }, [])

  return <RouterProvider router={router} />
}
