
import React, { useState, useEffect, useCallback, useRef } from 'react';
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

  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentTechniqueDetails = TECHNIQUE_EXAMPLES[selectedTechniqueKey] || TECHNIQUE_EXAMPLES[DEFAULT_TECHNIQUE_KEY];

  const clearExistingInterval = () => {
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
      animationIntervalRef.current = null;
    }
  };

  const startAnimation = useCallback(() => {
    clearExistingInterval();
    setIsAnimating(true);
    setCurrentStep(0);
    setCompletedSteps(new Set());
    
    let stepCounter = 0;
    animationIntervalRef.current = setInterval(() => {
      setCompletedSteps(prev => new Set([...prev, stepCounter]));
      stepCounter++;
      if (stepCounter < STEPS_DATA.length) {
        setCurrentStep(stepCounter);
      } else {
        clearExistingInterval();
        // Keep last step active visual for a bit longer before animation truly "ends"
        setTimeout(() => setIsAnimating(false), 1000); 
      }
    }, 2500);
  }, []);

  const resetAnimation = useCallback(() => {
    clearExistingInterval();
    setIsAnimating(false);
    setCurrentStep(0);
    setCompletedSteps(new Set());
  }, []);

  // Effect to reset animation if the technique changes
  useEffect(() => {
    // When the technique changes, always reset the animation.
    // resetAnimation will now also clear any ongoing interval.
    resetAnimation();
  }, [selectedTechniqueKey, resetAnimation]);

  // Effect for component unmount cleanup
  useEffect(() => {
    // This effect only runs on mount and unmount
    return () => {
      clearExistingInterval();
    };
  }, []); // Empty dependency array

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
