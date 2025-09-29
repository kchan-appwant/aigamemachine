import React from 'react';
import { Gamepad2, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header style={{ 
      background: 'rgba(255, 255, 255, 0.1)', 
      backdropFilter: 'blur(10px)',
      padding: '16px 0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              background: 'white', 
              borderRadius: '12px', 
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Gamepad2 size={24} color="#667eea" />
            </div>
            <div>
              <h1 style={{ 
                color: 'white', 
                fontSize: '24px', 
                fontWeight: '700',
                margin: 0
              }}>
                AI Game Studio
              </h1>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                fontSize: '14px',
                margin: 0
              }}>
                Create games with AI assistance
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="rgba(255, 255, 255, 0.8)" />
            <span style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              fontSize: '14px' 
            }}>
              Powered by AI
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;