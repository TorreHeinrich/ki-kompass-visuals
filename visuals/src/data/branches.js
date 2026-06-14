// Branchen-Daten + Prompt-Vorlagen für KI-Kompass Visuals
// Fokus: Maler & Fensterbauer (MVP)

export const activeBranches = [
  {
    id: 'maler',
    name: 'Maler',
    icon: '🎨',
    description: 'Fassaden & Innenräume streichen',
    color: '#1A3A5C',
    colorPalette: 'fassade',
    prompts: [
      {
        id: 'facade-paint',
        label: 'Fassade streichen',
        paletteKey: 'fassade',
        promptTemplate: (color) =>
          `Same building with freshly painted exterior facade in ${color.name} (${color.label}), professional painter finish, crisp clean lines, even coverage, high-quality exterior paint, natural daylight, photorealistic architectural photography`,
      },
      {
        id: 'interior-paint',
        label: 'Innenraum streichen',
        paletteKey: 'innen',
        promptTemplate: (color) =>
          `Same room with freshly painted walls in a beautiful ${color.name} tone, professional painter finish, smooth even walls, bright and inviting, natural light coming through windows, interior design photography, photorealistic`,
      },
      {
        id: 'accent-wall',
        label: 'Akzentwand',
        paletteKey: 'fassade',
        promptTemplate: (color) =>
          `Same room with one striking accent wall in bold ${color.name} color, the other three walls in complementary neutral off-white, modern interior design, stylish and elegant, natural lighting, professional interior photography, photorealistic`,
      },
    ],
  },
  {
    id: 'fensterbauer',
    name: 'Fensterbauer',
    icon: '🪟',
    description: 'Fenster, Türen & Rahmen',
    color: '#2E8B57',
    colorPalette: 'fenster',
    prompts: [
      {
        id: 'new-windows',
        label: 'Neue Fenster',
        paletteKey: 'fenster',
        promptTemplate: (color) =>
          `Same building with brand new modern energy-efficient windows installed, ${color.name} window frames, clean design, double-glazed, professional architectural photography, natural daylight, photorealistic`,
      },
      {
        id: 'large-windows',
        label: 'Großflächenfenster',
        paletteKey: 'fenster',
        promptTemplate: (color) =>
          `Same building with large floor-to-ceiling modern windows, ${color.name} slim profiles, maximum natural light, contemporary architecture, energy-efficient glazing, photorealistic`,
      },
      {
        id: 'front-door',
        label: 'Haustür erneuern',
        paletteKey: 'fenster',
        promptTemplate: (color) =>
          `Same building with a brand new modern front door in ${color.name} color, stylish design, high security, elegant entrance, professional architectural photography, photorealistic`,
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

export function getBranchById(id) {
  return activeBranches.find((b) => b.id === id);
}

export function getPromptById(branchId, promptId) {
  const branch = getBranchById(branchId);
  if (!branch) return null;
  return branch.prompts.find((p) => p.id === promptId);
}