
import React from 'react';

const STRATEGIES = [
  { title: "Identifica tus disparadores", desc: "Reconoce qué situaciones o pensamientos inician la rumiación.", color: "bg-yellow-500/80" },
  { title: "Practica la Atención Plena", desc: "Observa tus pensamientos sin juzgarlos y déjalos pasar.", color: "bg-green-500/80" },
  { title: "Reenfoca tu atención", desc: "Dirige tu mente activamente hacia una tarea o actividad absorbente.", color: "bg-blue-500/80" },
  { title: "Establece 'tiempo para preocuparse'", desc: "Limita la rumiación a un periodo específico del día.", color: "bg-purple-500/80" }
];

const StrategiesSection: React.FC = () => (
  <div className="bg-gradient-to-r from-indigo-900/60 to-purple-900/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mt-12 shadow-xl">
    <h2 className="text-xl sm:text-2xl font-bold mb-8 text-center text-gray-100">💡 Estrategias Clave para Manejar Rumiaciones</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      {STRATEGIES.map((strategy, index) => (
        <div key={index} className="flex items-start gap-4 p-1">
          <div className={`w-8 h-8 ${strategy.color} rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md`}>
            <span className="text-sm font-bold text-white">{index + 1}</span>
          </div>
          <div>
            <h4 className="font-semibold mb-1 text-gray-50">{strategy.title}</h4>
            <p className="text-gray-300 text-sm">{strategy.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default StrategiesSection;
