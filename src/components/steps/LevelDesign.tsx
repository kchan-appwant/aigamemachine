import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { GameProject, Level } from '../../types';

interface LevelDesignProps {
  project: GameProject;
  onUpdateProject: (project: GameProject) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const LevelDesign: React.FC<LevelDesignProps> = ({ 
  project, 
  onUpdateProject, 
  onNext, 
  onPrevious 
}) => {
  const [levels, setLevels] = useState<Level[]>([
    {
      id: '1',
      name: 'Level 1 - Tutorial',
      difficulty: 1,
      layout: 'Simple introduction level',
      assets: []
    }
  ]);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(levels[0]);
  const [isEditing, setIsEditing] = useState(false);

  const addLevel = () => {
    const newLevel: Level = {
      id: Date.now().toString(),
      name: `Level ${levels.length + 1}`,
      difficulty: Math.min(levels.length + 1, 5),
      layout: 'New level layout',
      assets: []
    };
    setLevels([...levels, newLevel]);
    setSelectedLevel(newLevel);
    setIsEditing(true);
  };

  const updateLevel = (updatedLevel: Level) => {
    const updatedLevels = levels.map(level => 
      level.id === updatedLevel.id ? updatedLevel : level
    );
    setLevels(updatedLevels);
    setSelectedLevel(updatedLevel);
  };

  const deleteLevel = (levelId: string) => {
    const updatedLevels = levels.filter(level => level.id !== levelId);
    setLevels(updatedLevels);
    if (selectedLevel?.id === levelId) {
      setSelectedLevel(updatedLevels[0] || null);
    }
  };

  const handleNext = () => {
    onUpdateProject({
      ...project,
      levels
    } as any);
    onNext();
  };

  return (
    <div>
      <h2 style={{ marginBottom: '16px' }}>Design Game Levels</h2>
      <p style={{ color: '#666', marginBottom: '32px' }}>
        Create and configure levels for your game. Each level can have different 
        difficulty settings and layouts.
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '300px 1fr', 
        gap: '32px',
        marginBottom: '32px'
      }}>
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h3>Levels</h3>
            <button className="btn btn-primary" onClick={addLevel}>
              <Plus size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {levels.map((level) => (
              <div
                key={level.id}
                className={`asset-item ${selectedLevel?.id === level.id ? 'selected' : ''}`}
                onClick={() => setSelectedLevel(level)}
                style={{ 
                  padding: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: '600' }}>{level.name}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Difficulty: {level.difficulty}/5
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button 
                    className="btn btn-secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLevel(level);
                      setIsEditing(true);
                    }}
                    style={{ padding: '4px 8px', fontSize: '12px' }}
                  >
                    <Edit size={12} />
                  </button>
                  {levels.length > 1 && (
                    <button 
                      className="btn btn-secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteLevel(level.id);
                      }}
                      style={{ padding: '4px 8px', fontSize: '12px' }}
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {selectedLevel ? (
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h3>{selectedLevel.name}</h3>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Save' : 'Edit'}
                </button>
              </div>

              {isEditing ? (
                <div>
                  <div className="form-group">
                    <label>Level Name</label>
                    <input
                      type="text"
                      value={selectedLevel.name}
                      onChange={(e) => updateLevel({
                        ...selectedLevel,
                        name: e.target.value
                      })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Difficulty: {selectedLevel.difficulty}/5</label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={selectedLevel.difficulty}
                      onChange={(e) => updateLevel({
                        ...selectedLevel,
                        difficulty: parseInt(e.target.value)
                      })}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div className="form-group">
                    <label>Layout Description</label>
                    <textarea
                      value={selectedLevel.layout}
                      onChange={(e) => updateLevel({
                        ...selectedLevel,
                        layout: e.target.value
                      })}
                      rows={4}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ 
                    background: '#f8f9fa', 
                    padding: '16px', 
                    borderRadius: '8px',
                    marginBottom: '20px'
                  }}>
                    <div style={{ marginBottom: '8px' }}>
                      <strong>Difficulty:</strong> {selectedLevel.difficulty}/5
                    </div>
                    <div>
                      <strong>Layout:</strong> {selectedLevel.layout}
                    </div>
                  </div>

                  <div style={{ 
                    border: '2px dashed #e9ecef',
                    borderRadius: '8px',
                    padding: '40px',
                    textAlign: 'center',
                    background: '#f8f9fa'
                  }}>
                    <h4>Level Preview</h4>
                    <p style={{ color: '#666', marginTop: '8px' }}>
                      Visual level editor would appear here
                    </p>
                    <div style={{ 
                      display: 'grid',
                      gridTemplateColumns: 'repeat(10, 1fr)',
                      gap: '2px',
                      maxWidth: '300px',
                      margin: '20px auto'
                    }}>
                      {Array.from({ length: 30 }).map((_, i) => (
                        <div
                          key={i}
                          style={{
                            width: '20px',
                            height: '20px',
                            background: Math.random() > 0.7 ? '#667eea' : '#e9ecef',
                            borderRadius: '2px'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px',
              color: '#666'
            }}>
              Select a level to edit
            </div>
          )}
        </div>
      </div>

      <div className="wizard-nav">
        <button className="btn btn-secondary" onClick={onPrevious}>
          ← Back
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          Next: Test Game →
        </button>
      </div>
    </div>
  );
};

export default LevelDesign;