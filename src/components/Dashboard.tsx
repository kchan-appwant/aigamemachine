import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Play, Settings, Share } from 'lucide-react';
import { GameProject } from '../types';

interface DashboardProps {
  onCreateProject: () => void;
  currentProject: GameProject | null;
}

const Dashboard: React.FC<DashboardProps> = ({ onCreateProject, currentProject }) => {
  const navigate = useNavigate();

  const handleCreateProject = () => {
    onCreateProject();
    navigate('/wizard');
  };

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '16px', color: '#333' }}>
            Welcome to AI Game Studio
          </h2>
          <p style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
            Create engaging HTML5 games without coding. Our AI-powered platform guides you 
            through every step from concept to deployment.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px',
          marginBottom: '40px'
        }}>
          <div className="card" style={{ textAlign: 'center', padding: '32px' }}>
            <div style={{ 
              background: '#667eea', 
              borderRadius: '50%', 
              width: '64px', 
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <Plus size={32} color="white" />
            </div>
            <h3 style={{ marginBottom: '12px' }}>Create New Game</h3>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              Start from scratch with our guided game creation wizard
            </p>
            <button className="btn btn-primary" onClick={handleCreateProject}>
              Start Creating
            </button>
          </div>

          {currentProject && (
            <div className="card" style={{ textAlign: 'center', padding: '32px' }}>
              <div style={{ 
                background: '#28a745', 
                borderRadius: '50%', 
                width: '64px', 
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <Play size={32} color="white" />
              </div>
              <h3 style={{ marginBottom: '12px' }}>Continue Project</h3>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                {currentProject.name}
              </p>
              <button className="btn btn-primary" onClick={() => navigate('/wizard')}>
                Continue
              </button>
            </div>
          )}
        </div>

        <div style={{ 
          background: '#f8f9fa', 
          borderRadius: '12px', 
          padding: '32px',
          textAlign: 'center'
        }}>
          <h3 style={{ marginBottom: '16px' }}>Features</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '24px',
            marginTop: '24px'
          }}>
            <div>
              <Settings size={24} style={{ marginBottom: '8px', color: '#667eea' }} />
              <h4>AI Asset Generation</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Generate sprites, backgrounds, and audio with AI
              </p>
            </div>
            <div>
              <Play size={24} style={{ marginBottom: '8px', color: '#667eea' }} />
              <h4>Live Preview</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Test your game in real-time as you build
              </p>
            </div>
            <div>
              <Share size={24} style={{ marginBottom: '8px', color: '#667eea' }} />
              <h4>Easy Export</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Deploy to web and messaging platforms
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;