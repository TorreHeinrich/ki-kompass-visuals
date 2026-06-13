import { useState, useRef } from 'react';

export default function BeforeAfterView({ originalImage, generatedImage, isLoading, error }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  const handleMouseDown = () => {
    const handleUp = () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
  };

  if (isLoading) {
    return (
      <div className="before-after loading-state">
        <div className="loading-spinner"></div>
        <p className="loading-text">KI generiert Ihr Ergebnis...</p>
        <p className="loading-sub">Das dauert etwa 5-10 Sekunden</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="before-after error-state">
        <div className="error-icon">⚠️</div>
        <p className="error-text">{error}</p>
      </div>
    );
  }

  if (!generatedImage) return null;

  return (
    <div className="before-after">
      <h3>3. Ergebnis: Vorher / Nachher</h3>
      <div
        ref={containerRef}
        className="comparison-container"
        onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
        onTouchMove={handleMove}
      >
        <img src={generatedImage} alt="Nachher" className="after-image" />
        <div className="before-clip" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
          <img src={originalImage} alt="Vorher" className="before-image" />
        </div>
        <div
          className="slider-handle"
          style={{ left: `${sliderPos}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMove}
        >
          <div className="slider-line"></div>
          <div className="slider-arrows">◀ ▶</div>
        </div>
        <div className="label label-before">VORHER</div>
        <div className="label label-after">NACHHER</div>
      </div>
      <div className="action-row">
        <a href={generatedImage} download="ki-kompass-visuals-after.jpg" className="btn-download">
          ⬇ Ergebnis herunterladen
        </a>
        <button className="btn-new" onClick={() => window.location.reload()}>
          🔄 Neues Bild erstellen
        </button>
      </div>
    </div>
  );
}
