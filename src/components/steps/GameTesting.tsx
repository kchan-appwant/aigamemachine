import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { GameProject } from '../../types';

interface GameTestingProps {
  project: GameProject;
  onUpdateProject: (project: GameProject) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const GameTesting: React.FC<GameTestingProps> = ({ 
  project, 
  onUpdateProject, 
  onNext, 
  onPrevious 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStats, setGameStats] = useState({
    score: 0,
    time: 0,
    level: 1
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setGameStats(prev => ({
          ...prev,
          time: prev.time + 1,
          score: prev.score + Math.floor(Math.random() * 10)
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setGameStats({ score: 0, time: 0, level: 1 });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h2 style={{ marginBottom: '16px' }}>Test Your Game</h2>
      <p style={{ color: '#666', marginBottom: '32px' }}>
        Play your game to test the mechanics and make sure everything works as expected.
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
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
            <h3>Game Preview</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                className="btn btn-primary"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button 
                className="btn btn-secondary"
                onClick={resetGame}
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
          </div>

          <div className="game-preview" style={{ position: 'relative' }}>
            {isPlaying ? (
              <div style={{ 
                color: 'white', 
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px'
              }}>
                <div style={{ fontSize: '24px' }}>🎮</div>
                <div>Game Running...</div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>
                  {project.template?.name} Demo
                </div>
                
                {/* Simulated game elements */}
                <div style={{ 
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  background: 'rgba(0,0,0,0.7)',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  Score: {gameStats.score}
                </div>
                <div style={{ 
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  background: 'rgba(0,0,0,0.7)',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  Time: {formatTime(gameStats.time)}
                </div>
              </div>
            ) : (
              <div style={{ 
                color: 'white', 
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px'
              }}>
                <div style={{ fontSize: '48px', opacity: 0.5 }}>⏸️</div>
                <div>Click Play to test your game</div>
              </div>
            )}
          </div>

          <div style={{ 
            background: '#f8f9fa', 
            padding: '16px', 
            borderRadius: '8px',
            marginTop: '16px'
          }}>
            <h4 style={{ marginBottom: '12px' }}>Controls</h4>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
              gap: '8px',
              fontSize: '14px'
            }}>
              <div><strong>Arrow Keys:</strong> Move</div>
              <div><strong>Space:</strong> Jump/Action</div>
              <div><strong>Enter:</strong> Pause</div>
              <div><strong>R:</strong> Restart</div>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '16px' }}>Game Stats</h3>
          
          <div style={{ 
            background: '#f8f9fa', 
            padding: '16px', 
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <div style={{ marginBottom: '12px' }}>
              <strong>Current Session</strong>
            </div>
            <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <div>Score: {gameStats.score}</div>
              <div>Time: {formatTime(gameStats.time)}</div>
              <div>Level: {gameStats.level}</div>
            </div>
          </div>

          <div style={{ 
            background: '#f8f9fa', 
            padding: '16px', 
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <div style={{ marginBottom: '12px' }}>
              <strong>Performance</strong>
            </div>
            <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <div>FPS: 60</div>
              <div>Load Time: 1.2s</div>
              <div>Memory: 45MB</div>
            </div>
          </div>

          <div style={{ 
            background: '#f8f9fa', 
            padding: '16px', 
            borderRadius: '8px'
          }}>
            <div style={{ marginBottom: '12px' }}>
              <strong>Issues Found</strong>
            </div>
            <div style={{ fontSize: '14px', color: '#28a745' }}>
              ✓ No issues detected
            </div>
          </div>

          <button 
            className="btn btn-secondary"
            style={{ width: '100%', marginTop: '16px' }}
          >
            <Settings size={16} />
            Advanced Settings
          </button>
        </div>
      </div>

      <div style={{ 
        background: '#e8f4fd', 
        border: '1px solid #bee5eb',
        padding: '16px', 
        borderRadius: '8px',
        marginBottom: '24px'
      }}>
        <h4 style={{ marginBottom: '8px', color: '#0c5460' }}>Testing Tips</h4>
        <ul style={{ fontSize: '14px', color: '#0c5460', margin: 0, paddingLeft: '20px' }}>
          <li>Test all game mechanics and controls</li>
          <li>Try different difficulty levels</li>
          <li>Check performance on different devices</li>
          <li>Verify all assets load correctly</li>
        </ul>
      </div>

      <div className="wizard-nav">
        <button className="btn btn-secondary" onClick={onPrevious}>
          ← Back
        </button>
        <button className="btn btn-primary" onClick={onNext}>
          Next: Export Game →
        </button>
      </div>
    </div>
  );
};

export default GameTesting;