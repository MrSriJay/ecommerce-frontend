import { useState, useEffect } from 'react';
import type { Product } from '../services/api';
import { fetchProducts } from '../services/api';
import { Package, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  initialData?: { description: string; products: number[] };
  onSubmit: (desc: string, products: number[]) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

export default function OrderForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isEdit = false 
}: Props) {
  const [description, setDescription] = useState(initialData?.description || '');
  const [selectedProducts, setSelectedProducts] = useState<number[]>(initialData?.products || []);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetchProducts();
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const toggleProduct = (id: number) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (!description.trim()) {
      alert('Please enter an order description');
      return;
    }
    if (selectedProducts.length === 0) {
      alert('Please select at least one product');
      return;
    }
    onSubmit(description, selectedProducts);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent mx-auto"></div>
          <p className="mt-6 text-xl font-medium text-slate-700">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Connection Failed</h3>
          <p className="text-slate-600 mb-8">Could not load products from the server</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-8 py-5 rounded-3xl shadow-2xl">
            <Package className="w-10 h-10" />
            <h1 className="text-4xl font-bold">
              {isEdit ? 'Edit Order' : 'Create New Order'}
            </h1>
          </div>
          <p className="mt-4 text-xl text-slate-600">
            {isEdit ? 'Update your order details below' : 'Fill in the details to create a new order'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">Order Details</h2>
                <p className="text-indigo-100 mt-2">Required fields are marked</p>
              </div>
              <button
                onClick={onCancel}
                className="text-white/80 hover:text-white hover:bg-white/20 p-3 rounded-2xl transition-all"
              >
                <X className="w-7 h-7" />
              </button>
            </div>
          </div>

          <div className="p-10">
            {/* Description Field */}
            <div className="mb-10">
              <label className="block text-lg font-semibold text-slate-800 mb-3">
                Order Description <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-6 py-5 text-lg border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                placeholder="e.g. Corporate laptop order for Q4"
              />
            </div>

            {/* Products Selection */}
            <div className="text-lg font-semibold text-slate-800 mb-6">
              Select Products <span className="text-red-500">*</span>
              <span className="text-sm font-normal text-slate-500 ml-3">
                ({selectedProducts.length} selected)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {products.map((product) => {
                const isSelected = selectedProducts.includes(product.id);
                return (
                  <label
                    key={product.id}
                    className={`relative block cursor-pointer rounded-2xl border-2 transition-all duration-200 transform hover:scale-105 ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50 shadow-lg ring-4 ring-indigo-100'
                        : 'border-slate-200 bg-white hover:border-indigo-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleProduct(product.id)}
                      className="sr-only"
                    />
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`mt-1 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${
                          isSelected 
                            ? 'bg-indigo-600 border-indigo-600' 
                            : 'border-slate-300'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-white" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-xl text-slate-800">
                            {product.productName}
                          </h4>
                          <p className="text-slate-600 mt-1">
                            {product.productDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-6 pt-8 border-t border-slate-200">
              <button
                onClick={onCancel}
                className="px-10 py-4 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-2xl font-bold text-lg hover:from-slate-200 hover:to-slate-300 transform hover:scale-105 transition-all shadow-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-12 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all shadow-2xl flex items-center gap-3"
              >
                <Package className="w-6 h-6" />
                {isEdit ? 'Update Order' : 'Book Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}