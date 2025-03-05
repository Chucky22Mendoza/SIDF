import { useState } from 'react';
import { Login } from '@/components/auth/login';
import { Dashboard } from '@/components/dashboard';

export function Routes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return <Dashboard />;
}