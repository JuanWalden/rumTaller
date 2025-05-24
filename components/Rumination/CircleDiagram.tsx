
import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { StepData, Technique } from '../../types';

interface CircleDiagramProps {
  steps: StepData[];
  currentStep: number;
  completedSteps: Set<number>;
  isAnimating: boolean;
  currentTechnique: Technique;
}

const CircleDiagram: React.FC<CircleDiagramProps> = ({ steps, currentStep, completedSteps, isAnimating, currentTechnique }) => {
  const [diagramSize, setDiagramSize] = useState({ width: 288, radius: 110, stepSize: 64, iconSizeClass: "w-6 h-6" }); // Default sm

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) {
        setDiagramSize({ width: 288, radius: 110, stepSize: 64, iconSizeClass: "w-6 h-6" }); // h-72, step w-16 h-16
      } else {
        setDiagramSize({ width: 320, radius: 120, stepSize: 80, iconSizeClass: "w-8 h-8" }); // h-80, step w-20 h-20
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);


  return (
    <div className="flex items-center justify-center py-6">
      <div className="relative" style={{ width: `${diagramSize.width}px`, height: `${diagramSize.width}px`}}>
        {/* Central Circle */}
        <div 
          className={`absolute rounded-full flex items-center justify-center font-bold shadow-2xl transition-all duration-500 ease-in-out ${isAnimating ? 'animate-pulse' : ''} ${currentTechnique.color}`}
          style={{ 
            left: `${diagramSize.width / 2 - diagramSize.width / 4}px`, 
            top: `${diagramSize.width / 2 - diagramSize.width / 4}px`, 
            width: `${diagramSize.width / 2}px`, 
            height: `${diagramSize.width / 2}px`
          }}
        >
          <div className="text-center text-white">
            <div className={`mb-1 sm:mb-2 ${diagramSize.width < 300 ? 'text-4xl' : 'text-5xl'}`}>{currentTechnique.icon}</div>
            <div className={`px-1 ${diagramSize.width < 300 ? 'text-xs' : 'text-sm'}`}>{currentTechnique.name}</div>
          </div>
        </div>

        {/* Step Circles */}
        {steps.map((step, index) => {
          const angle = (index * 90) - 90; // Start from top, go clockwise
          const centerX = diagramSize.width / 2;
          const centerY = diagramSize.width / 2;
          const x = Math.cos(angle * Math.PI / 180) * diagramSize.radius + centerX;
          const y = Math.sin(angle * Math.PI / 180) * diagramSize.radius + centerY;
          
          const isActive = currentStep === index && isAnimating;
          const isCompleted = completedSteps.has(index);
          
          return (
            <React.Fragment key={index}>
              {/* Step Circle */}
              <div
                className={`absolute rounded-full flex items-center justify-center text-white font-bold transition-all duration-500 ease-in-out transform ${
                  isActive ? 'scale-125 shadow-2xl animate-bounce' : 
                  isCompleted ? 'scale-110 shadow-lg' : 'scale-100 shadow-md'
                }`}
                style={{
                  left: x - diagramSize.stepSize / 2, 
                  top: y - diagramSize.stepSize / 2,
                  width: `${diagramSize.stepSize}px`,
                  height: `${diagramSize.stepSize}px`,
                  background: isActive || isCompleted ? 
                    `linear-gradient(135deg, ${step.color.split(' ')[0]}, ${step.color.split(' ')[1]})` : // Use full from-xxx to-yyy for gradient
                    'linear-gradient(135deg, #4a5568, #2d3748)' // gray-700 to gray-800
                }}
              >
                {isCompleted ? <CheckCircle className={diagramSize.iconSizeClass} /> : React.cloneElement(step.icon, { className: diagramSize.iconSizeClass })}
              </div>

              {/* Arrow to next step (improved positioning) */}
              {index < steps.length -1 && ( // Only for steps before the last one
                <div
                    className={`absolute transition-opacity duration-500 ${ completedSteps.has(index) && isAnimating ? 'opacity-100' : 'opacity-30'}`}
                    style={{
                        left: `${centerX + Math.cos((angle + 45) * Math.PI / 180) * (diagramSize.radius * 0.707) - (diagramSize.width < 300 ? 8:12)}px`,
                        top: `${centerY + Math.sin((angle + 45) * Math.PI / 180) * (diagramSize.radius * 0.707) - (diagramSize.width < 300 ? 8:12)}px`,
                        transform: `rotate(${angle + 45}deg)`
                    }}
                >
                    <ArrowRight className={`text-yellow-400 ${diagramSize.width < 300 ? 'w-4 h-4' : 'w-6 h-6'}`} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CircleDiagram;
