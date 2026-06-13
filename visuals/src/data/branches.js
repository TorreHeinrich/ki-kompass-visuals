export const branches = [
  {
    id: "dachdecker",
    name: "Dachdecker",
    icon: "🏠",
    description: "Neue Dächer, Dachfenster, Solar-Integration",
    color: "#C41E3A",
    prompts: [
      { id: "new-roof", label: "Neues Dach", prompt: "Same building with a brand new modern roof, high quality roofing materials, professional architectural photography, natural lighting, photorealistic" },
      { id: "solar-roof", label: "Dach + Solar", prompt: "Same building with a new roof and sleek black solar panels integrated, modern sustainable architecture, professional real estate photography, sunny day, photorealistic" },
      { id: "roof-windows", label: "Dachfenster einbauen", prompt: "Same building with new large roof windows installed on the roof, bright natural light, modern renovation, professional architecture photography, photorealistic" },
    ],
  },
  {
    id: "maler",
    name: "Maler",
    icon: "🎨",
    description: "Fassaden, Innenräume, Farbberatung",
    color: "#1A3A5C",
    prompts: [
      { id: "facade-paint", label: "Fassade streichen", prompt: "Same building with freshly painted exterior facade in a modern elegant color scheme, professional painter finish, crisp clean lines, photorealistic architectural photography" },
      { id: "interior-paint", label: "Innenraum streichen", prompt: "Same room with freshly painted walls in a modern warm color palette, professional painter finish, bright and inviting, interior design photography, photorealistic" },
      { id: "accent-wall", label: "Akzentwand", prompt: "Same room with one striking accent wall in a bold designer color, the other walls in complementary neutral tones, modern interior design, photorealistic" },
    ],
  },
  {
    id: "fensterbauer",
    name: "Fensterbauer",
    icon: "🪟",
    description: "Fenster, Türen, Wintergärten",
    color: "#2E8B57",
    prompts: [
      { id: "new-windows", label: "Neue Fenster", prompt: "Same building with brand new modern energy-efficient windows installed, clean white frames, professional architectural photography, photorealistic" },
      { id: "large-windows", label: "Großflächenfenster", prompt: "Same building with large floor-to-ceiling modern windows installed, lots of natural light, contemporary architecture, photorealistic" },
      { id: "winter-garden", label: "Wintergarten anbauen", prompt: "Same building with a beautiful glass winter garden conservatory added to the side, lush green plants visible through glass, modern architecture, sunny day, photorealistic" },
    ],
  },
  {
    id: "raumausstatter",
    name: "Raumausstatter",
    icon: "🛋️",
    description: "Bodenbeläge, Tapeten, Vorhänge",
    color: "#B8860B",
    prompts: [
      { id: "new-floor", label: "Neuer Boden", prompt: "Same room with beautiful new hardwood parquet flooring installed, warm natural wood tones, professional interior photography, photorealistic" },
      { id: "wallpaper", label: "Design-Tapete", prompt: "Same room with stylish designer wallpaper on the walls, modern pattern, elegant interior design, professional photography, photorealistic" },
      { id: "curtains", label: "Neue Vorhänge", prompt: "Same room with elegant floor-to-ceiling curtains in luxurious fabric, soft natural light filtering through, interior design magazine quality, photorealistic" },
    ],
  },
  {
    id: "tischler",
    name: "Tischler",
    icon: "🪚",
    description: "Möbel, Treppen, Innenausbau",
    color: "#8B4513",
    prompts: [
      { id: "custom-furniture", label: "Maßmöbel", prompt: "Same room with beautiful custom-built wooden furniture added, artisan carpentry, warm wood tones, professional interior photography, photorealistic" },
      { id: "wooden-stairs", label: "Holztreppe", prompt: "Same space with a beautiful custom wooden staircase installed, artisan craftsmanship, elegant design, professional architectural photography, photorealistic" },
      { id: "built-in", label: "Einbauschrank", prompt: "Same room with a floor-to-ceiling custom built-in wardrobe in fine wood, seamless integration, premium carpentry, interior design photography, photorealistic" },
    ],
  },
  {
    id: "architekten",
    name: "Architekten",
    icon: "📐",
    description: "Anbauten, Umbauten, Visualisierung",
    color: "#2F4F4F",
    prompts: [
      { id: "modern-extension", label: "Moderner Anbau", prompt: "Same building with a stunning modern glass and steel extension added, contemporary architecture, award-winning design, professional architectural photography, photorealistic" },
      { id: "facade-redesign", label: "Fassaden-Neugestaltung", prompt: "Same building with a completely redesigned modern facade, contemporary architecture, innovative materials, professional architectural visualization, photorealistic" },
      { id: "loft-conversion", label: "Dachgeschossausbau", prompt: "Same building with the attic converted into a stunning modern loft space visible through new large dormer windows, architectural photography, photorealistic" },
    ],
  },
  {
    id: "gartenbauer",
    name: "Gartenbauer",
    icon: "🌿",
    description: "Gärten, Terrassen, Außenanlagen",
    color: "#228B22",
    prompts: [
      { id: "garden-design", label: "Gartengestaltung", prompt: "Same property with a beautifully landscaped garden, professional garden design, lush green plants, flowering shrubs, natural stone pathways, photorealistic, sunny day" },
      { id: "terrace", label: "Neue Terrasse", prompt: "Same property with a beautiful new wooden terrace deck added, modern outdoor furniture, ambient lighting, professional landscape photography, golden hour, photorealistic" },
      { id: "pond", label: "Gartenteich", prompt: "Same garden with a beautiful natural pond with aquatic plants and a small wooden bridge, professional garden photography, serene atmosphere, photorealistic" },
    ],
  },
  {
    id: "solarfirmen",
    name: "Solarfirmen",
    icon: "☀️",
    description: "Photovoltaik, Solarthermie, Energiespeicher",
    color: "#FF8C00",
    prompts: [
      { id: "solar-panels", label: "Photovoltaik-Anlage", prompt: "Same building with sleek black solar panels perfectly installed on the roof, modern sustainable energy, professional photography, sunny blue sky, photorealistic" },
      { id: "full-solar", label: "Komplettlösung", prompt: "Same building with an extensive solar panel system on the roof plus a modern wallbox EV charger visible, complete sustainable energy solution, professional photography, photorealistic" },
      { id: "solar-carport", label: "Solar-Carport", prompt: "Same property with a modern solar carport structure added, solar panels on top, electric car parked underneath, sustainable architecture, professional photography, photorealistic" },
    ],
  },
  {
    id: "immobilienmakler",
    name: "Immobilienmakler",
    icon: "🏡",
    description: "Home Staging, Exposés, Virtual Tours",
    color: "#4A0E4E",
    prompts: [
      { id: "home-staging", label: "Home Staging", prompt: "Same room professionally staged for real estate photography, modern furniture, warm inviting atmosphere, premium real estate photography, bright natural lighting, photorealistic" },
      { id: "exterior-staging", label: "Außen-Staging", prompt: "Same building exterior professionally staged for real estate listing, manicured garden, beautiful curb appeal, premium real estate photography, golden hour lighting, photorealistic" },
      { id: "virtual-staging", label: "Virtuelles Staging", prompt: "Same empty room virtually staged with modern high-end furniture and decor, real estate marketing quality, bright and spacious feel, professional interior photography, photorealistic" },
    ],
  },
];

export function getBranchById(id) {
  return branches.find((b) => b.id === id);
}

export function getPromptById(branchId, promptId) {
  const branch = getBranchById(branchId);
  if (!branch) return null;
  return branch.prompts.find((p) => p.id === promptId);
}
