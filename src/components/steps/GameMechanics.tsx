import React, { useState } from 'react';
import { GameProject, GameMechanics } from '../../types';

interface GameMechanicsProps {
  project: GameProject;
  onUpdateProject: (project: GameProject) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const GameMechanicsStep: React.FC<GameMechanicsProps> = ({ 
  project, 
  onUpdateProject, 
  onNext, 
  onPrevious 
}) => {
  const [mechanics, setMechanics] = useState<GameMechanics>({
    playerSpeed: 200,
    jumpHeight: 300,
    gravity: 800,
    collectibles: true,
    enemies: true,
    powerUps: false
  });

  const handleMechanicChange = (key: keyof GameMechanics, value: number | boolean) => {
    setMechanics(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNext = () => {
    onUpdateProject({
      ...project,
      mechanics
    } as any);
    onNext();
  };

  return (
    <div>
      <h2 style={{ marginBottom: '16px' }}>Configure Game Mechanics</h2>
      <p style={{ color: '#666', marginBottom: '32px' }}>
        Fine-tune your game's mechanics to create the perfect gameplay experience.
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '32px',
        marginBottom: '32px'
      }}>
        <div>
          <h3 style={{ marginBottom: '20px' }}>Movement Settings</h3>
          
          <div className="form-group">
            <label>Player Speed: {mechanics.playerSpeed}px/s</label>
            <input
              type="range"
              min="100"
              max="500"
              value={mechanics.playerSpeed}
              onChange={(e) => handleMechanicChange('playerSpeed', parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <label>Jump Height: {mechanics.jumpHeight}px</label>
            <input
              type="range"
              min="200"
              max="500"
              value={mechanics.jumpHeight}
              onChange={(e) => handleMechanicChange('jumpHeight', parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <label>Gravity: {mechanics.gravity}px/s²</label>
            <input
              type="range"
              min="400"
              max="1200"
              value={mechanics.gravity}
              onChange={(e) => handleMechanicChange('gravity', parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '20px' }}>Game Features</h3>
          
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={mechanics.collectibles}
                onChange={(e) => handleMechanicChange('collectibles', e.target.checked)}
              />
              Include Collectibles
            </label>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
              Add items for players to collect for points
            </p>
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={mechanics.enemies}
                onChange={(e) => handleMechanicChange('enemies', e.target.checked)}
              />
              Include Enemies
            </label>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
              Add obstacles and enemies to avoid
            </p>
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={mechanics.powerUps}
                onChange={(e) => handleMechanicChange('powerUps', e.target.checked)}
              />
              Include Power-ups
            </label>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
              Add special abilities and temporary boosts
            </p>
          </div>
        </div>
      </div>

      <div style={{ 
        background: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '24px'
      }}>
        <h4 style={{ marginBottom: '12px' }}>Preview Settings</h4>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px',
          fontSize: '14px'
        }}>
          <div>
            <strong>Movement:</strong>
            <br />Speed: {mechanics.playerSpeed}px/s
            <br />Jump: {mechanics.jumpHeight}px
            <br />Gravity: {mechanics.gravity}px/s²
          </div>
          <div>
            <strong>Features:</strong>
            <br />Collectibles: {mechanics.collectibles ? '✓' : '✗'}
            <br />Enemies: {mechanics.enemies ? '✓' : '✗'}
            <br />Power-ups: {mechanics.powerUps ? '✓' : '✗'}
          </div>
        </div>
      </div>

      <div className="wizard-nav">
        <button className="btn btn-secondary" onClick={onPrevious}>
          ← Back
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          Next: Design Levels →
        </button>
      </div>
    </div>
  );
};

export default GameMechanicsStep;