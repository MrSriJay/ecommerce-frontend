import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OrderTable from '../components/OrderTable';
import { fetchOrders, deleteOrder, type Order } from '../services/api';
import { Plus, Package } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadOrders = async () => {
    try {
      const res = await fetchOrders();
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to load orders:', err);
      alert('Could not load orders — check backend connection');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteOrder(id);
      await loadOrders(); // Refresh list
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete order');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-4 mb-4">
            <Package className="w-12 h-12" />
            <h1 className="text-5xl font-bold tracking-tight">Order Management</h1>
          </div>
          <p className="text-xl text-indigo-100 max-w-3xl">
            Manage your e-commerce orders with real-time search, instant actions, and a beautiful interface.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 -mt-8 relative z-10">
        {/* Search + New Order Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-slate-200">
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <input
                type="text"
                placeholder="Search by order ID or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-6 py-4 text-lg border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
              />
              <svg className="absolute left-4 top-5 h-6 w-6 text-slate-400 absolute pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <Link
              to="/new"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
              New Order
            </Link>
          </div>
        </div>

        {/* Orders Table Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="px-8 py-6 border-b border-slate-200 bg-slate-50">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></span>
              All Orders ({orders.length})
            </h2>
          </div>
          <div className="p-8">
            {orders.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  <Package className="w-16 h-16 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No orders yet</h3>
                <p className="text-slate-500">Create your first order to get started!</p>
              </div>
            ) : (
              <OrderTable
                orders={orders}
                search={search}
                onEdit={(id) => navigate(`/edit/${id}`)}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}