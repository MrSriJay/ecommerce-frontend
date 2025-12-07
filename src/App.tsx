import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import OrdersPage from './pages/OrdersPage';
import NewOrderPage from './pages/NewOrderPage';
import EditOrderPage from './pages/EditOrderPage';
import LoginForm from './components/LoginForm';
import { Package, LogOut, LogIn, User } from 'lucide-react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleClose = () => {
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    setIsLoggedIn(false);
  };

  const handleOpenLogin = () => {
    setShowLogin(true);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">

        {/* Modern Header */}
        <header className="bg-white shadow-lg border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
                  Order Management
                </h1>
              </div>
            </Link>

            {/* Auth Section */}
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="group flex items-center gap-3 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-medium hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all shadow-lg"
                >
                  <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleOpenLogin}
                  className="group flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg"
                >
                  <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  Login
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 pb-20">
          {showLogin && <LoginForm onLogin={handleLogin} onClose={handleClose} />}

          {isLoggedIn ? (
            <Routes>
              <Route path="/" element={<OrdersPage />} />
              <Route path="/new" element={<NewOrderPage />} />
              <Route path="/edit/:id" element={<EditOrderPage />} />
            </Routes>
          ) : (
            <div className="min-h-screen flex items-center justify-center px-6">
              <div className="text-center max-w-md">
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl p-12 shadow-2xl">
                  <User className="w-20 h-20 text-indigo-600 mx-auto mb-6" />
                  <h2 className="text-4xl font-bold text-slate-800 mb-4">
                    Welcome Back
                  </h2>
                  <p className="text-xl text-slate-600 mb-8">
                    Please log in to access your order management dashboard
                  </p>
                  <button
                    onClick={handleOpenLogin}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold px-10 py-4 rounded-2xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-xl"
                  >
                    Login to Continue
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>


        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 mt-auto">
          <div className="max-w-7xl mx-auto px-6 py-8 text-center text-slate-600">
            <p className="font-medium">
              Built with <span className="text-red-500">React</span> • <span className="text-purple-600">NestJS</span> • <span className="text-green-600">PostgreSQL (Aiven)</span>
            </p>
            <p>© 2025 Order Management System</p>
          </div>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;
