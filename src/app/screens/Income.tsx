import { mockData } from '../data';
import IncomeItem from '../components/IncomeItem';

export default function Income() {
  const totalIncome = mockData.income.reduce((sum, i) => sum + i.amount, 0);
  const alfredoIncome = mockData.income
    .filter((i) => i.user === 'Alfredo')
    .reduce((sum, i) => sum + i.amount, 0);
  const cataIncome = mockData.income
    .filter((i) => i.user === 'Cata')
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Income</h1>
        <p className="text-sm text-gray-500 mt-1">Your earnings</p>
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
            {mockData.income.length} sources
          </span>
        </div>
        <div className="space-y-2">
          {mockData.income.map((income) => (
            <IncomeItem key={income.id} income={income} />
          ))}
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
