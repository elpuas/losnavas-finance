import { useNavigate } from 'react-router';
import { AlertCircle, Home } from 'lucide-react';

export default function ErrorBoundary() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Oops! Something went wrong
        </h1>
        
        <p className="text-gray-600 mb-6">
          An unexpected error occurred. Please try again.
        </p>
        
        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white rounded-xl py-3 px-4 font-medium hover:bg-blue-700 transition-colors"
        >
          <Home className="w-5 h-5" />
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
