import { createBrowserRouter, Navigate } from 'react-router';
import Dashboard from './screens/Dashboard';
import Expenses from './screens/Expenses';
import Income from './screens/Income';
import Add from './screens/Add';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, Component: Dashboard },
      { path: 'expenses', Component: Expenses },
      { path: 'income', Component: Income },
      { path: 'add', Component: Add },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);