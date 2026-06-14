import { useState, useRef } from 'react';

export default function BeforeAfterView({ originalImage, generatedImage, onReset }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    setSliderPos(Math.max(0, Math.min(100, (x / rect.width) * 100)));
  };

  const handleMouseDown = () => {
    const up = () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', up);
  };

  return (
    <div className="before-after">
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
          <div className="slider-arrows">◀ ▶</div>
        </div>
        <div className="label label-before">VORHER</div>
        <div className="label label-after">NACHHER</div>
      </div>
      <div className="action-row">
        <a href={generatedImage} download="ki-kompass-visuals-after.jpg" className="btn-download">
          ⬇ Ergebnis herunterladen
        </a>
        <button className="btn-new" onClick={onReset}>
          🔄 Neues Bild erstellen
        </button>
      </div>
    </div>
  );
}