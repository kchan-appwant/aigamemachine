import React, { useState } from 'react';
import { Wand2, Download, RefreshCw } from 'lucide-react';
import { GameProject, GeneratedAsset, AssetType } from '../../types';

interface AssetCreationProps {
  project: GameProject;
  onUpdateProject: (project: GameProject) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const AssetCreation: React.FC<AssetCreationProps> = ({ 
  project, 
  onUpdateProject, 
  onNext, 
  onPrevious 
}) => {
  const [currentAssetIndex, setCurrentAssetIndex] = useState(0);
  const [assetDescription, setAssetDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAssets, setGeneratedAssets] = useState<GeneratedAsset[]>(project.assets);

  const requiredAssets = project.template?.requiredAssets || [];
  const currentAsset = requiredAssets[currentAssetIndex];

  const generateAsset = async () => {
    if (!assetDescription.trim()) return;

    setIsGenerating(true);
    
    // Simulate AI asset generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newAsset: GeneratedAsset = {
      id: Date.now().toString(),
      type: currentAsset.type,
      name: currentAsset.name,
      url: `https://via.placeholder.com/150x150/667eea/ffffff?text=${encodeURIComponent(currentAsset.name)}`,
      description: assetDescription
    };

    const updatedAssets = [...generatedAssets];
    const existingIndex = updatedAssets.findIndex(asset => asset.name === currentAsset.name);
    
    if (existingIndex >= 0) {
      updatedAssets[existingIndex] = newAsset;
    } else {
      updatedAssets.push(newAsset);
    }

    setGeneratedAssets(updatedAssets);
    onUpdateProject({
      ...project,
      assets: updatedAssets
    });

    setIsGenerating(false);
    setAssetDescription('');
  };

  const nextAsset = () => {
    if (currentAssetIndex < requiredAssets.length - 1) {
      setCurrentAssetIndex(currentAssetIndex + 1);
      setAssetDescription('');
    }
  };

  const previousAsset = () => {
    if (currentAssetIndex > 0) {
      setCurrentAssetIndex(currentAssetIndex - 1);
      setAssetDescription('');
    }
  };

  const currentGeneratedAsset = generatedAssets.find(asset => asset.name === currentAsset?.name);
  const allAssetsGenerated = requiredAssets.every(req => 
    generatedAssets.some(asset => asset.name === req.name)
  );

  if (!currentAsset) {
    return <div>No assets required for this template.</div>;
  }

  return (
    <div>
      <h2 style={{ marginBottom: '16px' }}>Generate Game Assets</h2>
      <p style={{ color: '#666', marginBottom: '32px' }}>
        Use AI to generate the assets needed for your game. Describe what you want 
        and our AI will create it for you.
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '32px',
        marginBottom: '32px'
      }}>
        <div>
          <div style={{ 
            background: '#f8f9fa', 
            padding: '16px', 
            borderRadius: '8px',
            marginBottom: '24px'
          }}>
            <h3 style={{ marginBottom: '8px' }}>
              {currentAsset.name} ({currentAssetIndex + 1}/{requiredAssets.length})
            </h3>
            <p style={{ color: '#666', fontSize: '14px' }}>
              {currentAsset.description}
            </p>
          </div>

          <div className="form-group">
            <label>Describe your {currentAsset.name.toLowerCase()}</label>
            <textarea
              value={assetDescription}
              onChange={(e) => setAssetDescription(e.target.value)}
              placeholder={`Describe the ${currentAsset.name.toLowerCase()} you want to generate...`}
              rows={4}
            />
          </div>

          <button 
            className="btn btn-primary"
            onClick={generateAsset}
            disabled={!assetDescription.trim() || isGenerating}
            style={{ width: '100%', marginBottom: '16px' }}
          >
            {isGenerating ? (
              <>
                <div className="spinner" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 size={16} />
                Generate Asset
              </>
            )}
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="btn btn-secondary"
              onClick={previousAsset}
              disabled={currentAssetIndex === 0}
              style={{ flex: 1 }}
            >
              ← Previous
            </button>
            <button 
              className="btn btn-secondary"
              onClick={nextAsset}
              disabled={currentAssetIndex === requiredAssets.length - 1}
              style={{ flex: 1 }}
            >
              Next →
            </button>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '16px' }}>Preview</h3>
          <div style={{ 
            border: '2px dashed #e9ecef',
            borderRadius: '8px',
            padding: '32px',
            textAlign: 'center',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}>
            {currentGeneratedAsset ? (
              <>
                <img 
                  src={currentGeneratedAsset.url} 
                  alt={currentGeneratedAsset.name}
                  style={{ 
                    maxWidth: '150px', 
                    maxHeight: '150px',
                    marginBottom: '16px'
                  }}
                />
                <p style={{ fontSize: '14px', color: '#666' }}>
                  {currentGeneratedAsset.description}
                </p>
                <button className="btn btn-secondary" style={{ marginTop: '8px' }}>
                  <RefreshCw size={14} />
                  Regenerate
                </button>
              </>
            ) : (
              <p style={{ color: '#999' }}>
                Generate an asset to see the preview
              </p>
            )}
          </div>
        </div>
      </div>

      <div style={{ 
        background: '#f8f9fa', 
        padding: '16px', 
        borderRadius: '8px',
        marginBottom: '24px'
      }}>
        <h4 style={{ marginBottom: '12px' }}>Asset Progress</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {requiredAssets.map((asset, index) => {
            const isGenerated = generatedAssets.some(gen => gen.name === asset.name);
            return (
              <span
                key={index}
                style={{
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '12px',
                  background: isGenerated ? '#28a745' : '#e9ecef',
                  color: isGenerated ? 'white' : '#666'
                }}
              >
                {asset.name} {isGenerated ? '✓' : '○'}
              </span>
            );
          })}
        </div>
      </div>

      <div className="wizard-nav">
        <button className="btn btn-secondary" onClick={onPrevious}>
          ← Back
        </button>
        <button 
          className="btn btn-primary"
          onClick={onNext}
          disabled={!allAssetsGenerated}
        >
          Next: Configure Mechanics →
        </button>
      </div>
    </div>
  );
};

export default AssetCreation;