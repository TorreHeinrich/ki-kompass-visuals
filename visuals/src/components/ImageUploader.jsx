import { useState } from 'react';

export default function ImageUploader({ onImageReady }) {
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      onImageReady(file, e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="image-uploader">
      <div
        className={`upload-zone ${dragOver ? 'drag-over' : ''} ${preview ? 'has-image' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
        onClick={() => document.getElementById('file-input').click()}
      >
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Upload preview" className="preview-image" />
            <div className="preview-overlay">
              <span className="change-text">📸 Klicken zum Ändern</span>
            </div>
          </div>
        ) : (
          <div className="upload-placeholder">
            <div className="upload-icon">📸</div>
            <h3>Foto hier hochladen</h3>
            <p>Drag & Drop oder Klicken</p>
            <p className="upload-hint">JPG, PNG, WEBP – max. 10 MB</p>
          </div>
        )}
        <input
          id="file-input"
          type="file"
          accept="image/*"
          className="file-input-hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>
    </div>
  );
}
