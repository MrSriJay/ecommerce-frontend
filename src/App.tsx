import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OrdersPage from './pages/OrdersPage';
import NewOrderPage from './pages/NewOrderPage';
import EditOrderPage from './pages/EditOrderPage';


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
  {/* Header */}
  <header className="bg-white shadow-sm border-b">
    <div className="container mx-auto px-6 lg:px-8 py-4">
      <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
    </div>
  </header>

  {/* Main Content */}
  <main className="flex-1">
    <div className="container mx-auto px-6 lg:px-8 py-8">
      <Routes>
        <Route path="/" element={<OrdersPage />} />
        <Route path="/new" element={<NewOrderPage />} />
        <Route path="/edit/:id" element={<EditOrderPage />} />
      </Routes>
    </div>
  </main>
</div>
    </BrowserRouter>
  );
}

export default App;