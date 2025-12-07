import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrderForm from '../components/OrderForm';
import { fetchOrder, updateOrder } from '../services/api';

export default function EditOrderPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<{ description: string; products: number[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const res = await fetchOrder(Number(id));
        const order = res.data;

        setInitialData({
          description: order.orderDescription,
          products: order.orderProducts?.map((op: any) => op.productId) || [],
        });
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  const handleSubmit = async (description: string, productIds: number[]) => {
    setLoading(true);
    try {
      await updateOrder(Number(id), { orderDescription: description, productIds });
      navigate('/');
    } catch (error) {
      alert('Failed to update order. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading order...</div>
      </div>
    );
  }

  if (error || !initialData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600">Order not found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-indigo-600 hover:underline"
        >
          ← Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <OrderForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEdit={true}
      />
    </div>
  );
}