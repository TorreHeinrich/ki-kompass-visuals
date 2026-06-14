// Branchen-Daten + Prompt-Vorlagen – v3 mit verbesserten Farb-Prompts

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
          `The entire exterior facade of this building is painted in ${color.name} (${color.label}). The walls are completely and uniformly ${color.name}. Professional painter finish, smooth even coat, crisp architectural details. The building facade is ${color.name} colored. Natural daylight. Photorealistic architectural photography.`,
      },
      {
        id: 'interior-paint',
        label: 'Innenraum streichen',
        paletteKey: 'innen',
        promptTemplate: (color) =>
          `The walls of this room are painted entirely in ${color.name} (${color.label}). Every wall is ${color.name}. Smooth even paint coverage, professional interior painter finish. The room has ${color.name} walls. Bright natural light. Interior design photography, photorealistic.`,
      },
      {
        id: 'accent-wall',
        label: 'Akzentwand',
        paletteKey: 'fassade',
        promptTemplate: (color) =>
          `Room with one accent wall painted ${color.name} (${color.label}), the other three walls are white. The ${color.name} wall is the focal point. Bold striking ${color.name} accent wall design. Modern interior. Natural light. Professional interior photography, photorealistic.`,
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
          `Same building with new modern windows. The window frames are exactly ${color.name} color. ${color.name} colored window frames throughout the building. Clean modern design. Double-glazed. Professional architectural photography, natural daylight, photorealistic.`,
      },
      {
        id: 'large-windows',
        label: 'Großflächenfenster',
        paletteKey: 'fenster',
        promptTemplate: (color) =>
          `Same building with large floor-to-ceiling windows. The slim window frames are ${color.name}. ${color.name} colored modern window profiles. Maximum natural light. Contemporary architecture. Photorealistic.`,
      },
      {
        id: 'front-door',
        label: 'Haustür erneuern',
        paletteKey: 'fenster',
        promptTemplate: (color) =>
          `Same building with a new modern front door. The door is ${color.name} color. ${color.name} colored elegant entrance door. Stylish design with clean lines. Professional architectural photography, photorealistic.`,
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