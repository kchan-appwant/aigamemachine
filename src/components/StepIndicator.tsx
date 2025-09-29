import React from 'react';
import { WizardStep } from '../types';

interface StepIndicatorProps {
  steps: { key: WizardStep; label: string }[];
  currentStep: WizardStep;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  const currentIndex = steps.findIndex(step => step.key === currentStep);

  return (
    <div className="step-indicator">
      {steps.map((step, index) => {
        let className = 'step ';
        if (index < currentIndex) {
          className += 'completed';
        } else if (index === currentIndex) {
          className += 'active';
        } else {
          className += 'inactive';
        }

        return (
          <div key={step.key} className={className}>
            {step.label}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;