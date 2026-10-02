import React, { useEffect, useState } from 'react';
import { CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

export default function Toast({ toast, onDismiss }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const icons = {
    success: <CheckCircle size={15} className="text-green-600 flex-shrink-0" />,
    info: <Info size={15} className="text-blue-600 flex-shrink-0" />,
    warning: <AlertTriangle size={15} className="text-amber-600 flex-shrink-0" />,
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
  };

  return (
    <div
      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border shadow-md text-sm font-medium min-w-[280px] max-w-[380px] transition-all duration-300 ${colors[toast.type]} ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      {icons[toast.type]}
      <span className="flex-1">{toast.message}</span>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-current opacity-50 hover:opacity-80 transition-opacity ml-1 cursor-pointer"
      >
        <X size={13} />
      </button>
    </div>
  );
}
