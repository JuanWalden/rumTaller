
import React from 'react';
import { TECHNIQUE_EXAMPLES } from '../../constants';
import { Technique } from '../../types';

interface TechniqueSelectorProps {
  selectedTechniqueKey: string;
  setSelectedTechniqueKey: (key: string) => void;
}

const TechniqueSelector: React.FC<TechniqueSelectorProps> = ({ selectedTechniqueKey, setSelectedTechniqueKey }) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold mb-6 text-center text-gray-200">Elige una técnica de ejemplo:</h3>
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      {Object.entries(TECHNIQUE_EXAMPLES).map(([key, technique]: [string, Technique]) => (
        <button
          key={key}
          onClick={() => setSelectedTechniqueKey(key)}
          className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-medium text-sm sm:text-base transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${
            selectedTechniqueKey === key
              ? `${technique.color} text-white shadow-lg ring-2 ring-white/50`
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-500'
          }`}
        >
          <span className="mr-2 text-lg">{technique.icon}</span>
          {technique.name}
        </button>
      ))}
    </div>
  </div>
);

export default TechniqueSelector;
