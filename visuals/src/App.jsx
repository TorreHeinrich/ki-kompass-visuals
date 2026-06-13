import { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import BranchSelector from './components/BranchSelector';
import PromptSelector from './components/PromptSelector';
import BeforeAfterView from './components/BeforeAfterView';
import './App.css';

const API_URL = import.meta.env.PROD
  ? '/.netlify/functions/generate'
  : 'http://localhost:8888/.netlify/functions/generate';

export default function App() {
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [branch, setBranch] = useState(null);
  const [prompt, setPrompt] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImage = useCallback((file, base64) => {
    setImage(file);
    setImageBase64(base64);
    setResult(null);
    setError(null);
    setPrompt(null);
  }, []);

  const handleBranchSelect = useCallback((b) => {
    setBranch(b);
    setPrompt(null);
    setResult(null);
    setError(null);
  }, []);

  const handlePromptSelect = useCallback(async (p) => {
    setPrompt(p);
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imageBase64,
          prompt: p.prompt,
          branch: branch.id,
          label: p.label,
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
    }
  }, [imageBase64, branch]);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="steps-container">
          {!result && !loading && (
            <>
              <ImageUploader onImageReady={handleImage} />

              {image && (
                <BranchSelector
                  selectedBranch={branch}
                  onSelectBranch={handleBranchSelect}
                />
              )}

              {branch && (
                <PromptSelector
                  prompts={branch.prompts}
                  selectedPrompt={prompt}
                  onSelectPrompt={handlePromptSelect}
                  disabled={loading}
                />
              )}
            </>
          )}

          <BeforeAfterView
            originalImage={imageBase64}
            generatedImage={result}
            isLoading={loading}
            error={error}
          />
        </div>
      </main>
      <footer className="app-footer">
        <p>© 2026 KI-Kompass Bremen • Powered by FLUX AI • Alle Rechte vorbehalten</p>
      </footer>
    </div>
  );
}
