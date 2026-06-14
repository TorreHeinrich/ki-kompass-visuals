// Branchen-Daten + Prompt-Vorlagen – v5
// - HEX-Codes direkt im Prompt (z.B. "exactly #DAA520 (Gold)")
// - Stärkere Farbsprache: "MUST become", "exactly this color"
// - Kein "Photorealistic" mehr – schwächt Farbanweisungen
// - Helle/knallige Farben bekommen "vivid"/"saturated/"bright" Zusatz

const buildColorPrompt = (color, target, keepParts) => {
  // Für Rot-/Knallfarben: extra Vivid-Boost
  const vividBoost = isVividColor(color)
    ? ' The color MUST be bright, vivid, and fully saturated — exactly like this color.'
    : '';
  return `Change ONLY the ${target} of this ${keepParts} to exactly this color: ${color.name} (${color.hex}). The ${target.split(' ')[0]} MUST become ${color.hex} — a ${color.name} color.${vividBoost} Keep all other elements exactly the same. Only the ${target} changes to ${color.name}.`;
};

// Bestimmt ob eine Farbe "knallig/leuchtend" ist — diese brauchen extra Vivid-Boost
function isVividColor(color) {
  const vivid = ['rot', 'red', 'blau', 'blue', 'gelb', 'yellow', 'gold', 'orange', 'pink', 'lila', 'purple', 'grün', 'green', 'hell'];
  const lower = (color.name + ' ' + color.label + ' ' + color.hex).toLowerCase();
  // Check if it's a saturated/bright color
  // Parse hex to determine saturation
  const hex = color.hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2 / 255;
  const saturation = max === 0 ? 0 : (max - min) / max;
  // Vivid if saturation > 0.4 AND not too dark (lightness > 0.2)
  return saturation > 0.4 && lightness > 0.2;
}

export const activeBranches = [
  {
    id: 'maler',
    name: 'Maler',
    icon: '🎨',
    description: 'Fassaden & Innenräume',
    color: '#1A3A5C',
    prompts: [
      {
        id: 'facade-paint',
        label: 'Fassade streichen',
        paletteKey: 'fassade',
        promptTemplate: (color) =>
          buildColorPrompt(color, 'exterior wall color', 'this building to'),
      },
      {
        id: 'interior-paint',
        label: 'Innenraum streichen',
        paletteKey: 'innen',
        promptTemplate: (color) =>
          buildColorPrompt(color, 'wall color', 'this room to'),
      },
    ],
  },
  {
    id: 'fensterbauer',
    name: 'Fensterbauer',
    icon: '🪟',
    description: 'Fenster, Türen & Rahmen',
    color: '#2E8B57',
    prompts: [
      {
        id: 'new-windows',
        label: 'Neue Fenster',
        paletteKey: 'fenster',
        promptTemplate: (color) =>
          buildColorPrompt(color, 'window frame color', 'this building to'),
      },
      {
        id: 'large-windows',
        label: 'Großflächenfenster',
        paletteKey: 'fenster',
        promptTemplate: (color) =>
          `Change ONLY the window frame color of this building to exactly this color: ${color.name} (${color.hex}). Large modern windows with frames that MUST be ${color.hex} — a ${color.name} color.${isVividColor(color) ? ' The color MUST be bright, vivid, and fully saturated.' : ''} Keep the walls, roof, and all other elements exactly the same. Only the window frames change to ${color.name}.`,
      },
      {
        id: 'front-door',
        label: 'Haustür erneuern',
        paletteKey: 'fenster',
        promptTemplate: (color) =>
          buildColorPrompt(color, 'front door color', 'this building to'),
      },
    ],
  },
];

export const comingSoonBranches = [
  { id: 'dachdecker', name: 'Dachdecker', icon: '🏠' },
  { id: 'raumausstatter', name: 'Raumausstatter', icon: '🛋️' },
  { id: 'tischler', name: 'Tischler', icon: '🪚' },
  { id: 'architekten', name: 'Architekten', icon: '📐' },
  { id: 'gartenbauer', name: 'Gartenbauer', icon: '🌿' },
  { id: 'solarfirmen', name: 'Solarfirmen', icon: '☀️' },
  { id: 'immobilienmakler', name: 'Immobilienmakler', icon: '🏡' },
];