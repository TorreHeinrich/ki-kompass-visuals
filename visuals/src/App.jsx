import { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import BeforeAfterView from './components/BeforeAfterView';
import { activeBranches, comingSoonBranches } from './data/branches';
import { colorPalettes } from './components/ColorPalette';
import './App.css';

const API_URL = import.meta.env.PROD
  ? '/.netlify/functions/generate'
  : 'http://localhost:8888/.netlify/functions/generate';

export default function App() {
  const [imageBase64, setImageBase64] = useState(null);
  const [branch, setBranch] = useState(activeBranches[0]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatingLabel, setGeneratingLabel] = useState('');

  const handleImage = useCallback((file, base64) => {
    setImageBase64(base64);
    setResult(null);
    setError(null);
  }, []);

  const handleGenerate = useCallback(async (promptObj, color) => {
    const finalPrompt = promptObj.promptTemplate(color);
    setLoading(true);
    setGeneratingLabel(`${promptObj.label} – ${color.name}`);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imageBase64,
          prompt: finalPrompt,
          branch: branch.id,
          label: promptObj.label,
          color: color.name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fehler bei der Bildgenerierung');
      }

      setResult(data.output);
    } catch (err) {
      setError(err.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
      setGeneratingLabel('');
    }
  }, [imageBase64, branch]);

  if (result) {
    return (
      <div className="app">
        <Header />
        <main className="main-content">
          <BeforeAfterView
            originalImage={imageBase64}
            generatedImage={result}
            isLoading={false}
            error={null}
            onReset={() => { setResult(null); setImageBase64(null); }}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {!imageBase64 ? (
          <ImageUploader onImageReady={handleImage} />
        ) : (
          <div className="transform-panel">
            {/* Image preview at top */}
            <div className="panel-preview">
              <img src={imageBase64} alt="Upload" className="panel-image" />
              <button className="btn-change-image" onClick={() => setImageBase64(null)}>
                📸 Anderes Foto
              </button>
            </div>

            {/* Branch tabs */}
            <div className="branch-tabs">
              {activeBranches.map((b) => (
                <button
                  key={b.id}
                  className={`branch-tab ${branch.id === b.id ? 'active' : ''}`}
                  onClick={() => setBranch(b)}
                  style={{ '--branch-color': b.color }}
                >
                  <span className="tab-icon">{b.icon}</span>
                  <span className="tab-name">{b.name}</span>
                </button>
              ))}
            </div>

            {/* Loading state */}
            {loading && (
              <div className="panel-loading">
                <div className="loading-spinner"></div>
                <p className="loading-text">KI generiert: {generatingLabel}</p>
                <p className="loading-sub">~5-10 Sekunden</p>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="panel-error">
                <span className="error-icon">⚠️</span>
                <p>{error}</p>
                <button className="btn-dismiss" onClick={() => setError(null)}>OK</button>
              </div>
            )}

            {/* Transformation cards – all visible at once */}
            {!loading && (
              <div className="transform-cards">
                {branch.prompts.map((prompt) => {
                  const palette = colorPalettes[prompt.paletteKey] || [];
                  return (
                    <div key={prompt.id} className="transform-card">
                      <h4 className="card-title">{prompt.label}</h4>
                      <div className="card-colors">
                        {palette.map((c) => (
                          <button
                            key={c.hex}
                            className="color-chip"
                            onClick={() => handleGenerate(prompt, c)}
                            title={`${c.name} (${c.label})`}
                          >
                            <span className="chip-swatch" style={{ backgroundColor: c.hex }} />
                            <span className="chip-label">{c.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Coming Soon */}
            <div className="coming-soon-section">
              <h4 className="coming-soon-title">🔜 Weitere Branchen in Kürze</h4>
              <div className="coming-soon-chips">
                {comingSoonBranches.map((b) => (
                  <span key={b.id} className="coming-soon-chip">
                    {b.icon} {b.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="app-footer">
        <p>© 2026 KI-Kompass Bremen • Powered by FLUX AI</p>
      </footer>
    </div>
  );
}