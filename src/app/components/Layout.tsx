import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { LayoutDashboard, Receipt, TrendingUp, Plus } from 'lucide-react';

export type AppLayoutContext = {
  currentPeriodId: string;
  setCurrentPeriodId: (periodId: string) => void;
  periodRefreshCount: number;
  refreshCurrentPeriodData: () => void;
};

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPeriodId, setCurrentPeriodId] = useState('');
  const [periodRefreshCount, setPeriodRefreshCount] = useState(0);

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/expenses', icon: Receipt, label: 'Expenses' },
    { path: '/income', icon: TrendingUp, label: 'Income' },
    { path: '/add', icon: Plus, label: 'Add' },
  ];

  function refreshCurrentPeriodData() {
    setPeriodRefreshCount((count) => count + 1);
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto">
        <Outlet
          context={{
            currentPeriodId,
            setCurrentPeriodId,
            periodRefreshCount,
            refreshCurrentPeriodData,
          }}
        />
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-2' : ''}`} />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
