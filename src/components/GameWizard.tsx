import React from 'react';
import { GameProject, WizardStep } from '../types';
import StepIndicator from './StepIndicator';
import TemplateSelection from './steps/TemplateSelection';
import AssetCreation from './steps/AssetCreation';
import GameMechanics from './steps/GameMechanics';
import LevelDesign from './steps/LevelDesign';
import GameTesting from './steps/GameTesting';
import GameExport from './steps/GameExport';

interface GameWizardProps {
  project: GameProject;
  onUpdateProject: (project: GameProject) => void;
}

const GameWizard: React.FC<GameWizardProps> = ({ project, onUpdateProject }) => {
  const steps = [
    { key: WizardStep.TEMPLATE_SELECTION, label: 'Template' },
    { key: WizardStep.ASSET_CREATION, label: 'Assets' },
    { key: WizardStep.GAME_MECHANICS, label: 'Mechanics' },
    { key: WizardStep.LEVEL_DESIGN, label: 'Levels' },
    { key: WizardStep.TESTING, label: 'Testing' },
    { key: WizardStep.EXPORT, label: 'Export' }
  ];

  const currentStepIndex = steps.findIndex(step => step.key === project.currentStep);

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      const nextStep = steps[currentStepIndex + 1];
      onUpdateProject({
        ...project,
        currentStep: nextStep.key
      });
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      const previousStep = steps[currentStepIndex - 1];
      onUpdateProject({
        ...project,
        currentStep: previousStep.key
      });
    }
  };

  const renderCurrentStep = () => {
    switch (project.currentStep) {
      case WizardStep.TEMPLATE_SELECTION:
        return (
          <TemplateSelection 
            project={project}
            onUpdateProject={onUpdateProject}
            onNext={goToNextStep}
          />
        );
      case WizardStep.ASSET_CREATION:
        return (
          <AssetCreation 
            project={project}
            onUpdateProject={onUpdateProject}
            onNext={goToNextStep}
            onPrevious={goToPreviousStep}
          />
        );
      case WizardStep.GAME_MECHANICS:
        return (
          <GameMechanics 
            project={project}
            onUpdateProject={onUpdateProject}
            onNext={goToNextStep}
            onPrevious={goToPreviousStep}
          />
        );
      case WizardStep.LEVEL_DESIGN:
        return (
          <LevelDesign 
            project={project}
            onUpdateProject={onUpdateProject}
            onNext={goToNextStep}
            onPrevious={goToPreviousStep}
          />
        );
      case WizardStep.TESTING:
        return (
          <GameTesting 
            project={project}
            onUpdateProject={onUpdateProject}
            onNext={goToNextStep}
            onPrevious={goToPreviousStep}
          />
        );
      case WizardStep.EXPORT:
        return (
          <GameExport 
            project={project}
            onUpdateProject={onUpdateProject}
            onPrevious={goToPreviousStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <div className="card">
        <StepIndicator 
          steps={steps}
          currentStep={project.currentStep}
        />
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default GameWizard;