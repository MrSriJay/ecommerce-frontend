// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { User, Lock, X } from 'lucide-react';

interface LoginFormProps {
  onLogin: () => void;
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please fill in both fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await loginUser(username, password);
      localStorage.setItem('jwt_token', data.access_token);
      onLogin();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-purple-900/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md transform transition-all duration-300 scale-100 animate-in fade-in zoom-in-95">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur p-4 rounded-2xl">
                  <User className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Welcome Back!</h2>
                  <p className="text-white/80 mt-1">Sign in to continue</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="hover:bg-white/20 p-2 rounded-xl transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 pt-10">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
                <div className="text-2xl">Warning</div>
                <p className="font-medium">{error}</p>
              </div>
            )}

            {/* Username Field */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-lg"
                  placeholder="Enter your username"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-lg"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 py-4 border-2 border-slate-300 text-slate-700 rounded-2xl font-semibold hover:bg-slate-50 transition-all"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {isLoading && (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {isLoading ? 'Signing in...' : 'Login'}
              </button>
            </div>

            {/* Footer Note */}
            <p className="text-center text-sm text-slate-500 mt-8">
              Test credentials: <code className="bg-slate-100 px-2 py-1 rounded">john_doe / securePassword123</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;