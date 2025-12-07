import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props {
  isOpen: boolean;
  title?: string;
  message: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

export default function ConfirmModal({
  isOpen,
  title = "Confirm Action",
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isDestructive = false,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-purple-900/90 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md transform transition-all duration-300 scale-100 animate-in fade-in zoom-in-95">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          {/* Header */}
          <div className={`p-8 text-white ${isDestructive ? 'bg-gradient-to-r from-red-600 to-pink-600' : 'bg-gradient-to-r from-indigo-600 to-purple-600'}`}>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold">{title}</h3>
              <button
                onClick={onCancel}
                className="hover:bg-white/20 p-3 rounded-2xl transition-all"
              >
                <X className="w-7 h-7" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-10">
            <div className="text-center text-slate-700 leading-relaxed text-lg">
              {message}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-10">
              <button
                onClick={onCancel}
                className="flex-1 py-4 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-2xl font-bold text-lg hover:from-slate-200 hover:to-slate-300 transform hover:scale-105 transition-all shadow-lg"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className={`flex-1 py-4 text-white rounded-2xl font-bold text-lg transform hover:scale-105 transition-all shadow-2xl ${
                  isDestructive
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
                }`}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}