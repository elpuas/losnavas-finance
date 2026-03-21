import { FormEvent, ReactNode, useEffect, useState } from 'react';
import { Home } from 'lucide-react';

const ACCESS_STORAGE_KEY = 'navas_access';
const accessPhrase = import.meta.env.VITE_LOS_NAVAS_APP_ACCESS?.trim() ?? '';

type AccessGateProps = {
  children: ReactNode;
};

export default function AccessGate({ children }: AccessGateProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [phrase, setPhrase] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!accessPhrase) {
      setIsUnlocked(true);
      return;
    }

    if (window.localStorage.getItem(ACCESS_STORAGE_KEY) === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (phrase.trim() !== accessPhrase) {
      setErrorMessage('Incorrect access phrase.');
      return;
    }

    if (rememberMe) {
      window.localStorage.setItem(ACCESS_STORAGE_KEY, 'true');
    } else {
      window.localStorage.removeItem(ACCESS_STORAGE_KEY);
    }

    setErrorMessage('');
    setIsUnlocked(true);
  }

  return (
    <>
      {children}

      {!isUnlocked ? (
        <div className="fixed inset-0 z-50 bg-gray-50 px-4">
          <div className="mx-auto flex min-h-screen max-w-md items-center justify-center">
            <div className="w-full rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Home className="h-8 w-8" />
              </div>

              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">Navas Finance</h1>
                <p className="mt-2 text-sm text-gray-500">
                  Enter the family access phrase to continue.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div>
                  <label htmlFor="access-phrase" className="mb-2 block text-sm font-medium text-gray-700">
                    Access Phrase
                  </label>
                  <input
                    id="access-phrase"
                    type="password"
                    value={phrase}
                    onChange={(event) => setPhrase(event.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500"
                    placeholder="Enter phrase"
                    autoComplete="current-password"
                    required
                  />
                </div>

                <label className="flex items-center gap-3 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  Remember me
                </label>

                {errorMessage ? (
                  <p className="text-sm text-red-600">{errorMessage}</p>
                ) : null}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Enter
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
