// src/components/OrderTable.tsx
import { Trash2, Edit } from 'lucide-react';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import type { Order } from '../services/api';

interface Props {
  orders: Order[];
  search: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => Promise<void>;
}

export default function OrderTable({ orders, search, onEdit, onDelete }: Props) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  const filtered = orders.filter(
    (order) =>
      order.id.toString().includes(search) ||
      order.orderDescription.toLowerCase().includes(search.toLowerCase())
  );

  const openDeleteModal = (order: Order) => {
    setOrderToDelete(order);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setOrderToDelete(null);
  };

  const confirmDelete = async () => {
    if (!orderToDelete) return;

    try {
      await onDelete(orderToDelete.id);
      closeDeleteModal();
    } catch (error) {
      alert('Failed to delete order');
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Id</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Description</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Count of Products</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center text-gray-500 text-lg">
                  {search ? 'No matching orders found' : 'No orders yet. Create your first one!'}
                </td>
              </tr>
            ) : (
              filtered.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{order.id}</td>
                  <td className="px-6 py-4 text-gray-900 max-w-sm truncate" title={order.orderDescription}>
                    {order.orderDescription}
                  </td>
                  <td className="px-6 py-4 text-center font-semibold text-indigo-600">
                    {order.productCount}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onEdit(order.id)}
                      className="text-indigo-600 hover:text-indigo-800 mr-6 transition"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5 inline" /> <span className="hidden sm:inline ml-1"></span>
                    </button>

                    <button
                      onClick={() => openDeleteModal(order)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5 inline" /> <span className="hidden sm:inline ml-1"></span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Beautiful Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Order?"
        message={
          orderToDelete ? (
            <>
              Are you sure you want to delete <strong>Order #{orderToDelete.id}</strong>?
              <br /><br />
              <em className="text-gray-600">"{orderToDelete.orderDescription}"</em>
              <br /><br />
              <span className="text-red-600 font-medium">This action cannot be undone.</span>
            </>
          ) : ''
        }
        confirmText="Yes, Delete"
        cancelText="Cancel"
        isDestructive={true}
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
      />
    </>
  );
}