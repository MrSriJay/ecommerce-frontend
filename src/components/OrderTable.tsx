import { Trash2, Edit, Package, Calendar, Hash } from 'lucide-react';
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
      {/* Responsive Table Container */}
      <div className="w-full overflow-x-auto rounded-2xl shadow-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          {/* Header */}
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-700">
            <tr>
              <th className="px-6 py-5 text-left text-xs font-bold text-white uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Hash className="w-5 h-5" />
                  Order ID
                </div>
              </th>
              <th className="px-6 py-5 text-left text-xs font-bold text-white uppercase tracking-wider">
                <div className="flex items-center gap-2 hidden md:flex">
                  <Package className="w-5 h-5" />
                  Description
                </div>
                <span className="md:hidden">Order</span>
              </th>
              <th className="px-6 py-5 text-center text-xs font-bold text-white uppercase tracking-wider">
                <div className="flex items-center justify-center gap-2">
                  <Package className="w-5 h-5" />
                  Products
                </div>
              </th>
              <th className="px-6 py-5 text-left text-xs font-bold text-white uppercase tracking-wider hidden lg:table-cell">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Created
                </div>
              </th>
              <th className="px-6 py-5 text-center text-xs font-bold text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="bg-white divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-24 text-center">
                  <div className="max-w-sm mx-auto">
                    <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-xl font-medium text-slate-600">
                      {search ? 'No orders match your search' : 'No orders yet'}
                    </p>
                    <p className="text-slate-500 mt-2">
                      {search ? 'Try a different term' : 'Create your first order to begin'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                >
                  {/* Order ID */}
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-2 rounded-lg">
                        <Hash className="w-5 h-5 text-indigo-700" />
                      </div>
                      <span className="font-bold text-lg">{order.id}</span>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="px-6 py-5">
                    <p className="text-base font-medium text-slate-800 max-w-xs lg:max-w-lg truncate" title={order.orderDescription}>
                      {order.orderDescription}
                    </p>
                  </td>

                  {/* Product Count */}
                  <td className="px-6 py-5 text-center">
                    <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-slate-100 to-indigo-50 text-indigo-700 font-bold text-lg px-5 py-3 rounded-full border-2 border-indigo-200 shadow-inner hover:shadow-md transition-all duration-200">
                      {order.productCount}
                      <Package className="w-5 h-5 text-indigo-600" />
                    </div>
                  </td>

                  {/* Created Date - Hidden on mobile */}
                  <td className="px-6 py-5 hidden lg:table-cell">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-5 h-5 text-indigo-600" />
                      <span className="font-medium">
                        {new Date(order.createdAt).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-3">
                      {/* EDIT BUTTON — Secondary style (soft blue) */}
                      <button
                        onClick={() => onEdit(order.id)}
                        className="group flex items-center gap-2.5 bg-slate-100 hover:bg-indigo-100 text-indigo-700 font-medium px-5 py-2.5 rounded-xl border border-slate-300 hover:border-indigo-400 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <Edit className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
                        Edit
                      </button>

                      {/* DELETE BUTTON — Secondary danger style (soft red) */}
                      <button
                        onClick={() => openDeleteModal(order)}
                        className="group flex items-center gap-2.5 bg-red-50 hover:bg-red-100 text-red-700 font-medium px-5 py-2.5 rounded-xl border border-red-200 hover:border-red-400 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <Trash2 className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Order?"
        message={
          orderToDelete ? (
            <>
              Are you sure you want to <span className="text-red-600 font-bold">permanently delete</span> this order?
              <br /><br />
              <div className="bg-slate-50 p-6 rounded-2xl text-center border border-slate-200">
                <p className="text-2xl font-bold text-slate-800">Order #{orderToDelete.id}</p>
                <p className="text-lg text-slate-600 mt-2 italic">"{orderToDelete.orderDescription}"</p>
              </div>
              <br />
              <span className="text-red-600 font-bold">This action cannot be undone.</span>
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