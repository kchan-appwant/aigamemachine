import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import GameWizard from './components/GameWizard';
import Dashboard from './components/Dashboard';
import { GameProject, WizardStep } from './types';

function App() {
  const [currentProject, setCurrentProject] = useState<GameProject | null>(null);

  const createNewProject = () => {
    const newProject: GameProject = {
      id: Date.now().toString(),
      name: 'New Game Project',
      description: '',
      template: null as any,
      assets: [],
      currentStep: WizardStep.TEMPLATE_SELECTION,
      createdAt: new Date()
    };
    setCurrentProject(newProject);
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route 
          path="/" 
          element={
            <Dashboard 
              onCreateProject={createNewProject}
              currentProject={currentProject}
            />
          } 
        />
        <Route 
          path="/wizard" 
          element={
            currentProject ? (
              <GameWizard 
                project={currentProject}
                onUpdateProject={setCurrentProject}
              />
            ) : (
              <Dashboard onCreateProject={createNewProject} currentProject={null} />
            )
          } 
        />
      </Routes>
    </div>
  );
}

export default App;