const colorPalettes = {
  fassade: [
    { name: 'Reinweiß', hex: '#F5F5F5', label: 'RAL 9010' },
    { name: 'Cremeweiß', hex: '#FDF5E6', label: 'RAL 9001' },
    { name: 'Hellgrau', hex: '#D3D3D3', label: 'RAL 7047' },
    { name: 'Schiefergrau', hex: '#708090', label: 'RAL 7015' },
    { name: 'Anthrazit', hex: '#374151', label: 'RAL 7016' },
    { name: 'Sandbeige', hex: '#D2B48C', label: 'RAL 1001' },
    { name: 'Terrakotta', hex: '#CC6655', label: 'RAL 3012' },
    { name: 'Taubenblau', hex: '#6C7B8B', label: 'RAL 5014' },
    { name: 'Olivgrün', hex: '#556B2F', label: 'RAL 6003' },
    { name: 'Dunkelrot', hex: '#8B0000', label: 'RAL 3005' },
    { name: 'Hellblau', hex: '#87CEEB', label: 'RAL 5024' },
    { name: 'Salbeigrün', hex: '#9CAF88', label: 'RAL 6021' },
  ],
  innen: [
    { name: 'Warmweiß', hex: '#FAF8F5', label: 'Wohnlich' },
    { name: 'Sand', hex: '#E8DCC8', label: 'Natürlich' },
    { name: 'Hellgrau', hex: '#E5E5E5', label: 'Modern' },
    { name: 'Taubengrau', hex: '#B8B8B8', label: 'Elegant' },
    { name: 'Puderrosa', hex: '#E8D5D0', label: 'Sanft' },
    { name: 'Salbeigrün', hex: '#C5CFBA', label: 'Beruhigend' },
    { name: 'Himmelblau', hex: '#C5D5E0', label: 'Frisch' },
    { name: 'Vanille', hex: '#F5E6C8', label: 'Warm' },
  ],
  fenster: [
    { name: 'Weiß', hex: '#F0F0F0', label: 'Klassisch' },
    { name: 'Anthrazit', hex: '#3D3D3D', label: 'Modern' },
    { name: 'Dunkelbraun', hex: '#4A3728', label: 'Rustikal' },
    { name: 'Lichtgrau', hex: '#C4C4C4', label: 'Dezent' },
    { name: 'Schwarz', hex: '#1A1A1A', label: 'Edel' },
    { name: 'Eichenoptik', hex: '#8B7355', label: 'Natürlich' },
    { name: 'Dunkelgrün', hex: '#2F4F2F', label: 'Traditionell' },
    { name: 'Gold-Eiche', hex: '#CDAA7D', label: 'Warm' },
  ],
};

export default function ColorPalette({ paletteKey, selectedColor, onSelectColor, disabled }) {
  const colors = colorPalettes[paletteKey] || [];

  if (colors.length === 0) return null;

  return (
    <div className="color-palette">
      <h4>🎨 Farbe wählen</h4>
      <div className="color-grid">
        {colors.map((c) => (
          <button
            key={c.hex}
            className={`color-swatch ${selectedColor?.hex === c.hex ? 'selected' : ''}`}
            onClick={() => onSelectColor(c)}
            disabled={disabled}
            title={`${c.name} (${c.label})`}
          >
            <span className="swatch-preview" style={{ backgroundColor: c.hex }} />
            <span className="swatch-name">{c.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export { colorPalettes };