import { useState, useEffect } from 'react';
import type { Product } from '../services/api';
import { fetchProducts } from '../services/api';

interface Props {
  initialData?: { description: string; products: number[] };
  onSubmit: (desc: string, products: number[]) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

export default function OrderForm({ initialData, onSubmit, onCancel, isEdit = false }: Props) {
  const [description, setDescription] = useState(initialData?.description || '');
  const [selectedProducts, setSelectedProducts] = useState<number[]>(initialData?.products || []);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch products using the shared api service
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
      alert('Please enter order description');
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
      <div className="text-center py-12">
        <div className="text-lg text-gray-600">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Failed to load products</div>
        <button
          onClick={() => window.location.reload()}
          className="text-indigo-600 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">{isEdit ? 'Edit' : 'New'} Order</h2>

      <div className="mb-6">
        <label className ="block text-sm font-medium text-gray-700 mb-2">
          Order Description
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g. Order for Customer XYZ"
        />
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Select Products</h3>
        <div className="space-y-3">
          {products.map((product) => (
            <label key={product.id} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-3 rounded">
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.id)}
                onChange={() => toggleProduct(product.id)}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <div>
                <div className="font-medium">{product.productName}</div>
                <div className="text-sm text-gray-500">{product.productDescription}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          {isEdit ? 'Update Order' : 'Book Order'}
        </button>
      </div>
    </div>
  );
}