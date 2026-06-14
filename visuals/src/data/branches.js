// Branchen-Daten + Prompt-Vorlagen – v4
// - Akzentwand entfernt (zu komplex für MVP)
// - Prompts mit aggressiverer Farbangabe (HEX + Name + Kontext)
// - Nur Fassade + Innenraum für Maler

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
          `Change ONLY the exterior wall color of this building to ${color.name}. The walls become ${color.name}. Keep the roof, windows, doors, and all other elements exactly the same. Only the facade wall color changes to ${color.name}. Professional paint finish. Photorealistic.`,
      },
      {
        id: 'interior-paint',
        label: 'Innenraum streichen',
        paletteKey: 'innen',
        promptTemplate: (color) =>
          `Change ONLY the wall color of this room to ${color.name}. The walls become ${color.name}. Keep the floor, ceiling, furniture, windows, and all other elements exactly the same. Only the wall color changes to ${color.name}. Professional paint finish. Photorealistic.`,
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
          `Change ONLY the window frame color of this building to ${color.name}. The window frames become ${color.name}. Keep the walls, roof, doors, and all other elements exactly the same. Only the window frame color changes to ${color.name}. Photorealistic.`,
      },
      {
        id: 'large-windows',
        label: 'Großflächenfenster',
        paletteKey: 'fenster',
        promptTemplate: (color) =>
          `Change ONLY the window frame color of this building to ${color.name}. Large modern windows with ${color.name} frames. Keep the walls, roof, and all other elements exactly the same. Only the window frames change to ${color.name}. Photorealistic.`,
      },
      {
        id: 'front-door',
        label: 'Haustür erneuern',
        paletteKey: 'fenster',
        promptTemplate: (color) =>
          `Change ONLY the front door color of this building to ${color.name}. The door becomes ${color.name}. Keep the walls, windows, roof, and all other elements exactly the same. Only the front door color changes to ${color.name}. Photorealistic.`,
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