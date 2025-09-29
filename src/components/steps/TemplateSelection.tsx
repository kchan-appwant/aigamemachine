import React, { useState } from 'react';
import { GameProject, GameTemplate } from '../../types';
import { gameTemplates } from '../../data/templates';

interface TemplateSelectionProps {
  project: GameProject;
  onUpdateProject: (project: GameProject) => void;
  onNext: () => void;
}

const TemplateSelection: React.FC<TemplateSelectionProps> = ({ 
  project, 
  onUpdateProject, 
  onNext 
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<GameTemplate | null>(
    project.template
  );

  const handleTemplateSelect = (template: GameTemplate) => {
    setSelectedTemplate(template);
    onUpdateProject({
      ...project,
      template
    });
  };

  const handleNext = () => {
    if (selectedTemplate) {
      onNext();
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '16px' }}>Choose Your Game Template</h2>
      <p style={{ color: '#666', marginBottom: '32px' }}>
        Select a game template to get started. Each template includes pre-configured 
        mechanics and asset requirements.
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        marginBottom: '32px'
      }}>
        {gameTemplates.map((template) => (
          <div
            key={template.id}
            className={`asset-item ${selectedTemplate?.id === template.id ? 'selected' : ''}`}
            onClick={() => handleTemplateSelect(template)}
            style={{ padding: '24px', cursor: 'pointer' }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>
              {template.preview}
            </div>
            <h3 style={{ marginBottom: '8px' }}>{template.name}</h3>
            <p style={{ 
              color: '#666', 
              fontSize: '14px', 
              marginBottom: '16px',
              minHeight: '40px'
            }}>
              {template.description}
            </p>
            <div style={{ textAlign: 'left' }}>
              <strong style={{ fontSize: '12px', color: '#667eea' }}>
                MECHANICS:
              </strong>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '4px',
                marginTop: '4px'
              }}>
                {template.mechanics.map((mechanic, index) => (
                  <span
                    key={index}
                    style={{
                      background: '#f8f9fa',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      color: '#495057'
                    }}
                  >
                    {mechanic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="wizard-nav">
        <div></div>
        <button 
          className="btn btn-primary"
          onClick={handleNext}
          disabled={!selectedTemplate}
        >
          Next: Create Assets →
        </button>
      </div>
    </div>
  );
};

export default TemplateSelection;