
import React from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface ControlButtonsProps {
  startAnimation: () => void;
  resetAnimation: () => void;
  isAnimating: boolean;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({ startAnimation, resetAnimation, isAnimating }) => (
  <div className="flex justify-center gap-4 mb-10">
    <button
      onClick={startAnimation}
      disabled={isAnimating}
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full font-semibold text-white hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-900"
    >
      <Play className="w-5 h-5" />
      Ver Proceso
    </button>
    <button
      onClick={resetAnimation}
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full font-semibold text-white hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-slate-900"
    >
      <RotateCcw className="w-5 h-5" />
      Reiniciar
    </button>
  </div>
);

export default ControlButtons;
