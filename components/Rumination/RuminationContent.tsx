
import React, { useState, useEffect, useCallback } from 'react';
import Header from '../Layout/Header';
import TechniqueSelector from './TechniqueSelector';
import ControlButtons from './ControlButtons';
import CircleDiagram from './CircleDiagram';
import StepDetails from './StepDetails';
import StrategiesSection from './StrategiesSection';
import { STEPS_DATA, TECHNIQUE_EXAMPLES, DEFAULT_TECHNIQUE_KEY } from '../../constants';
import { Technique } from '../../types';

const RuminationContent: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [selectedTechniqueKey, setSelectedTechniqueKey] = useState<string>(DEFAULT_TECHNIQUE_KEY);

  const currentTechniqueDetails = TECHNIQUE_EXAMPLES[selectedTechniqueKey] || TECHNIQUE_EXAMPLES[DEFAULT_TECHNIQUE_KEY];

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
    setCurrentStep(0);
    setCompletedSteps(new Set());
    
    let stepCounter = 0;
    const interval = setInterval(() => {
      setCompletedSteps(prev => new Set([...prev, stepCounter]));
      stepCounter++;
      if (stepCounter < STEPS_DATA.length) {
        setCurrentStep(stepCounter);
      } else {
        clearInterval(interval);
        // Keep last step active visual for a bit longer before animation truly "ends"
        setTimeout(() => setIsAnimating(false), 1000); 
      }
    }, 2500);

    // Cleanup function for the interval
    return () => clearInterval(interval);
  }, []);

  const resetAnimation = useCallback(() => {
    setIsAnimating(false);
    setCurrentStep(0);
    setCompletedSteps(new Set());
    // If there was an interval from startAnimation, it should be cleaned up
    // by a potential re-run of startAnimation or component unmount.
    // For direct reset, ensure any active interval is cleared if startAnimation doesn't handle it itself.
    // However, startAnimation returns a cleanup, so it's self-contained.
  }, []);

  // Effect to reset animation if the technique changes while animating
  useEffect(() => {
    if (isAnimating) {
      resetAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTechniqueKey]); // reset if technique changes

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4">
      <Header />
      <TechniqueSelector 
        selectedTechniqueKey={selectedTechniqueKey} 
        setSelectedTechniqueKey={setSelectedTechniqueKey} 
      />
      <ControlButtons 
        startAnimation={startAnimation} 
        resetAnimation={resetAnimation} 
        isAnimating={isAnimating} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 items-start">
        <CircleDiagram 
          steps={STEPS_DATA} 
          currentStep={currentStep} 
          completedSteps={completedSteps} 
          isAnimating={isAnimating}
          currentTechnique={currentTechniqueDetails as Technique}
        />
        <StepDetails 
          steps={STEPS_DATA} 
          currentStep={currentStep} 
          completedSteps={completedSteps} 
          isAnimating={isAnimating}
          currentTechnique={currentTechniqueDetails as Technique}
        />
      </div>
      <StrategiesSection />
    </div>
  );
};

export default RuminationContent;
