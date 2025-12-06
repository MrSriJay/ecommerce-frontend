// src/pages/OrdersPage.tsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OrderTable from '../components/OrderTable';
import { fetchOrders, deleteOrder, type Order } from '../services/api';

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
      alert('Could not load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // THIS IS THE KEY — REFRESH AFTER DELETE
  const handleDelete = async (id: number) => {
    try {
      await deleteOrder(id);  // Calls DELETE /api/orders/:id
      await loadOrders();     // Refresh the list
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete order');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl text-gray-600">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Order Management</h1>

      <div className="flex justify-between items-center mb-8">
        <input
          type="text"
          placeholder="Search by order id or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-6 py-3 border border-gray-300 rounded-lg w-96 text-lg"
        />
        <Link
          to="/new"
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition"
        >
          New Order
        </Link>
      </div>

      <OrderTable
        orders={orders}
        search={search}
        onEdit={(id) => navigate(`/edit/${id}`)}
        onDelete={handleDelete}  // This now refreshes!
      />
    </div>
  );
}