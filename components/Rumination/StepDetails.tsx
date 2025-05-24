
import React from 'react';
import { StepData, Technique } from '../../types';

interface StepDetailsProps {
  steps: StepData[];
  currentStep: number;
  completedSteps: Set<number>;
  isAnimating: boolean;
  currentTechnique: Technique;
}

const StepDetails: React.FC<StepDetailsProps> = ({ steps, currentStep, completedSteps, isAnimating, currentTechnique }) => (
  <div className="space-y-6">
    {steps.map((step, index) => {
      const isActive = currentStep === index && isAnimating;
      const isCompleted = completedSteps.has(index);
      
      return (
        <div
          key={index}
          className={`p-5 sm:p-6 rounded-2xl transition-all duration-500 ease-in-out transform border-2 ${
            isActive 
              ? `scale-105 shadow-2xl bg-gradient-to-br ${step.color} border-transparent` 
              : isCompleted 
                ? 'bg-gray-800/60 border-green-500/70 shadow-lg' 
                : 'bg-gray-800/80 border-gray-700 hover:border-gray-600'
          }`}
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-3">
            <div className={`p-2 rounded-full ${isActive || isCompleted ? 'bg-white/20' : 'bg-white/10'}`}>
              {React.cloneElement(step.icon, { className: "w-7 h-7 sm:w-8 sm:h-8 text-white"})}
            </div>
            <h3 className={`text-lg sm:text-xl font-bold ${isActive ? 'text-white' : 'text-gray-100'}`}>{step.title}</h3>
          </div>
          
          <p className={`mb-3 text-sm sm:text-base ${isActive ? 'text-gray-50' : 'text-gray-300'}`}>{step.description}</p>
          <p className={`text-xs sm:text-sm mb-4 ${isActive ? 'text-gray-200' : 'text-gray-400'}`}>{step.detail}</p>
          
          <div className="space-y-2">
            <h4 className={`font-semibold text-xs sm:text-sm uppercase tracking-wider ${isActive ? 'text-gray-100' : 'text-gray-400'}`}>
              Ejemplos ({currentTechnique.name}):
            </h4>
            <div className="flex flex-wrap gap-2">
              {step.examples.map((example, exIndex) => (
                <span
                  key={exIndex}
                  className={`px-2.5 py-1 sm:px-3 bg-black/40 rounded-full text-xs sm:text-sm ${isActive ? 'text-gray-50' : 'text-gray-200'}`}
                >
                  {example}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

export default StepDetails;
