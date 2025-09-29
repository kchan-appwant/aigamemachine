import React, { useState } from 'react';
import { Download, Share, Globe, MessageCircle, Smartphone } from 'lucide-react';
import { GameProject, Platform } from '../../types';

interface GameExportProps {
  project: GameProject;
  onUpdateProject: (project: GameProject) => void;
  onPrevious: () => void;
}

const GameExport: React.FC<GameExportProps> = ({ 
  project, 
  onUpdateProject, 
  onPrevious 
}) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([Platform.GENERIC_WEB]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const platforms = [
    {
      id: Platform.GENERIC_WEB,
      name: 'Web (HTML5)',
      icon: <Globe size={24} />,
      description: 'Standard web deployment for any website'
    },
    {
      id: Platform.WECHAT,
      name: 'WeChat Mini Game',
      icon: <MessageCircle size={24} />,
      description: 'Optimized for WeChat platform'
    },
    {
      id: Platform.TELEGRAM,
      name: 'Telegram Web App',
      icon: <MessageCircle size={24} />,
      description: 'Deploy as Telegram bot game'
    },
    {
      id: Platform.FACEBOOK_MESSENGER,
      name: 'Facebook Messenger',
      icon: <MessageCircle size={24} />,
      description: 'Messenger platform integration'
    }
  ];

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsExporting(false);
    setExportComplete(true);
  };

  const shareableLink = `https://games.ai-studio.com/play/${project.id}`;

  return (
    <div>
      <h2 style={{ marginBottom: '16px' }}>Export Your Game</h2>
      <p style={{ color: '#666', marginBottom: '32px' }}>
        Choose your deployment platforms and export your game for sharing and distribution.
      </p>

      {!exportComplete ? (
        <>
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ marginBottom: '16px' }}>Select Platforms</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '16px'
            }}>
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`asset-item ${selectedPlatforms.includes(platform.id) ? 'selected' : ''}`}
                  onClick={() => togglePlatform(platform.id)}
                  style={{ padding: '20px', cursor: 'pointer' }}
                >
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    marginBottom: '8px'
                  }}>
                    {platform.icon}
                    <h4 style={{ margin: 0 }}>{platform.name}</h4>
                  </div>
                  <p style={{ 
                    color: '#666', 
                    fontSize: '14px',
                    margin: 0
                  }}>
                    {platform.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ 
            background: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '32px'
          }}>
            <h3 style={{ marginBottom: '16px' }}>Export Settings</h3>
            
            <div className="form-group">
              <label>Game Title</label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => onUpdateProject({
                  ...project,
                  name: e.target.value
                })}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={project.description}
                onChange={(e) => onUpdateProject({
                  ...project,
                  description: e.target.value
                })}
                rows={3}
                placeholder="Describe your game for players..."
              />
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '16px'
            }}>
              <div className="form-group">
                <label>
                  <input type="checkbox" defaultChecked />
                  {' '}Enable analytics
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input type="checkbox" defaultChecked />
                  {' '}Include leaderboard
                </label>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button 
              className="btn btn-primary"
              onClick={handleExport}
              disabled={selectedPlatforms.length === 0 || isExporting}
              style={{ fontSize: '18px', padding: '16px 32px' }}
            >
              {isExporting ? (
                <>
                  <div className="spinner" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download size={20} />
                  Export Game
                </>
              )}
            </button>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            background: '#d4edda', 
            border: '1px solid #c3e6cb',
            color: '#155724',
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '32px'
          }}>
            <h3 style={{ marginBottom: '8px' }}>🎉 Export Complete!</h3>
            <p>Your game has been successfully exported and is ready to play.</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '20px',
            marginBottom: '32px'
          }}>
            <div className="card">
              <h4 style={{ marginBottom: '12px' }}>
                <Globe size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                Play Online
              </h4>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
                Your game is live and ready to play
              </p>
              <input
                type="text"
                value={shareableLink}
                readOnly
                style={{ marginBottom: '12px', fontSize: '14px' }}
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-primary" style={{ flex: 1 }}>
                  <Share size={16} />
                  Share
                </button>
                <button className="btn btn-secondary">
                  Copy Link
                </button>
              </div>
            </div>

            <div className="card">
              <h4 style={{ marginBottom: '12px' }}>
                <Download size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                Download Files
              </h4>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
                Get the source files for self-hosting
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedPlatforms.map(platform => (
                  <button key={platform} className="btn btn-secondary">
                    Download {platform} build
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ 
            background: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '24px'
          }}>
            <h4 style={{ marginBottom: '12px' }}>Game Statistics</h4>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
              gap: '16px',
              fontSize: '14px'
            }}>
              <div>
                <strong>File Size:</strong><br />
                2.4 MB
              </div>
              <div>
                <strong>Assets:</strong><br />
                {project.assets.length} files
              </div>
              <div>
                <strong>Platforms:</strong><br />
                {selectedPlatforms.length} targets
              </div>
              <div>
                <strong>Load Time:</strong><br />
                ~1.2 seconds
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="wizard-nav">
        <button className="btn btn-secondary" onClick={onPrevious}>
          ← Back
        </button>
        {exportComplete && (
          <button 
            className="btn btn-primary"
            onClick={() => window.location.href = '/'}
          >
            Create New Game
          </button>
        )}
      </div>
    </div>
  );
};

export default GameExport;