import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import OrdersPage from './pages/OrdersPage';
import NewOrderPage from './pages/NewOrderPage';
import EditOrderPage from './pages/EditOrderPage';
import LoginForm from './components/LoginForm'; 
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);  
  const [showLogin, setShowLogin] = useState<boolean>(false);  
  useEffect(() => {
    // Check if there's a valid JWT token in localStorage
    const token = localStorage.getItem('jwt_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle login success
  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);  
  };

  // Handle close modal
  const handleClose = () => {
    setShowLogin(false);  
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('jwt_token');  
    setIsLoggedIn(false); 
  };

  // Handle opening the login modal
  const handleOpenLogin = () => {
    setShowLogin(true);  
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
            {/* Show Login or Logout button */}
            <button
              onClick={isLoggedIn ? handleLogout : handleOpenLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {isLoggedIn ? 'Logout' : 'Login'}  {/* Button text based on login state */}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <div className="container mx-auto px-6 lg:px-8 py-8">
            {showLogin && <LoginForm onLogin={handleLogin} onClose={handleClose} />}  {/* Show login modal */}

            {isLoggedIn ? (
              <Routes>
                <Route path="/" element={<OrdersPage />} />
                <Route path="/new" element={<NewOrderPage />} />
                <Route path="/edit/:id" element={<EditOrderPage />} />
              </Routes>
            ) : (
              <div className="text-center text-xl text-gray-600">
                <p>Please log in to access the application</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
