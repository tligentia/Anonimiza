
import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgClass = {
    success: 'bg-black text-white border-green-500',
    error: 'bg-red-600 text-white border-black',
    info: 'bg-white text-black border-black shadow-md'
  }[type];

  return (
    <div className={`fixed bottom-28 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 border-l-4 ${bgClass} flex items-center space-x-4 animate-bounce-short rounded-sm`}>
      <span className="text-[10px] font-black uppercase tracking-widest">{message}</span>
      <button onClick={onClose} className="hover:opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
