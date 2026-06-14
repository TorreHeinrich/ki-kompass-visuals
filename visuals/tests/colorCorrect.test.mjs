import assert from 'node:assert/strict';
import { correctHslForTarget } from '../src/utils/colorCorrect.js';

function approxRgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h, s, l };
}

const roseFromFlux = approxRgbToHsl(242, 165, 178); // helles Rosé/Pink
const trafficRed = approxRgbToHsl(204, 6, 5);       // RAL 3020 Signal-/Verkehrsrot
const corrected = correctHslForTarget(roseFromFlux, trafficRed, { name: 'Signalrot', hex: '#CC0605' }, 1);

assert.equal(corrected.h, trafficRed.h, 'Rot-Korrektur muss exakt den Ziel-Hue verwenden');
assert.ok(corrected.s >= 0.82, `Rot muss satt bleiben, bekam saturation=${corrected.s}`);
assert.ok(corrected.l <= 0.52, `Rosé entsteht durch zu hohe Helligkeit; bekam luminance=${corrected.l}`);
assert.ok(corrected.l >= 0.32, `Rot darf nicht absaufen; bekam luminance=${corrected.l}`);

console.log('✓ colorCorrect: Rosé wird zu sattem Rot korrigiert');
