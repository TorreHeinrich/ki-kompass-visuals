// Client-seitige Farbkorrektur für KI-Kompass Visuals
// Nach FLUX Canny Pro: korrigiert die generierte Farbe in Richtung Zielfarbe
// Erhält die Struktur (Kanten) des Originalbilds, überschreibt aber die Farbgebung

/**
 * Wendet eine HSL-basierte Farbkorrektur auf das generierte Bild an.
 * @param {string} originalBase64 - Das Originalfoto als data:image-Base64
 * @param {string} generatedUrl - Die URL des generierten Bildes von Replicate
 * @param {object} targetColor - { name, hex } der gewünschten Farbe
 * @returns {Promise<string>} Korrigiertes Bild als data:image-Base64
 */
export async function applyColorCorrection(originalBase64, generatedUrl, targetColor) {
  return new Promise((resolve, reject) => {
    try {
      const originalImg = new Image();
      const generatedImg = new Image();
      let loaded = 0;

      const checkDone = () => {
        loaded++;
        if (loaded < 2) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const w = Math.min(originalImg.naturalWidth, generatedImg.naturalWidth);
        const h = Math.min(originalImg.naturalHeight, generatedImg.naturalHeight);
        canvas.width = w;
        canvas.height = h;

        ctx.drawImage(originalImg, 0, 0, w, h);
        const origData = ctx.getImageData(0, 0, w, h);
        ctx.drawImage(generatedImg, 0, 0, w, h);
        const genData = ctx.getImageData(0, 0, w, h);

        const targetRgb = hexToRgb(targetColor.hex);
        const targetHsl = rgbToHsl(targetRgb.r, targetRgb.g, targetRgb.b);

        const pixels = origData.data;
        const genPixels = genData.data;
        const outData = new ImageData(new Uint8ClampedArray(genPixels), w, h);
        const outPixels = outData.data;

        for (let i = 0; i < pixels.length; i += 4) {
          const origR = pixels[i];
          const origG = pixels[i + 1];
          const origB = pixels[i + 2];
          const genR = genPixels[i];
          const genG = genPixels[i + 1];
          const genB = genPixels[i + 2];

          // Änderungsmaske: Nur Pixel nachfärben, die FLUX bereits verändert hat.
          const diff = colorDistance(origR, origG, origB, genR, genG, genB);

          if (diff > 15) {
            const genHsl = rgbToHsl(genR, genG, genB);
            const mixFactor = Math.min(1, diff / 80);
            const corrected = correctHslForTarget(genHsl, targetHsl, targetColor, mixFactor);
            const { r, g, b } = hslToRgb(corrected.h, corrected.s, corrected.l);

            outPixels[i] = r;
            outPixels[i + 1] = g;
            outPixels[i + 2] = b;
          }
        }

        ctx.putImageData(outData, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.92));
      };

      originalImg.onload = checkDone;
      originalImg.onerror = () => reject(new Error('Originalbild konnte nicht geladen werden'));
      generatedImg.onload = checkDone;
      generatedImg.onerror = () => reject(new Error('Generiertes Bild konnte nicht geladen werden'));

      originalImg.src = originalBase64;
      generatedImg.crossOrigin = 'anonymous';
      generatedImg.src = generatedUrl;
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Reine Korrekturlogik, separat testbar.
 * Root Cause des Rosé-Bugs: Für Rot wurde die zu hohe Luminance des KI-Ergebnisses
 * fast vollständig behalten. Dadurch wurde Signalrot zu Rosé/Pastell.
 */
export function correctHslForTarget(genHsl, targetHsl, targetColor, mixFactor = 1) {
  const redTarget = isRedTarget(targetHsl, targetColor);

  if (redTarget) {
    // Rot-Sonderfall: Ziel-Hue hart setzen, Sättigung hoch halten,
    // Helligkeit deckeln. Sonst wird aus Rot bei hoher Luminance sofort Rosé.
    const redMix = Math.max(0.85, mixFactor);
    return {
      h: targetHsl.h,
      s: clamp(Math.max(targetHsl.s, genHsl.s, 0.82), 0.82, 0.96),
      l: clamp(lerp(genHsl.l, Math.min(targetHsl.l, 0.46), redMix), 0.32, 0.52),
    };
  }

  // Normalfall: Farbton sauber per Kreisinterpolation, Licht/Sättigung moderat ziehen.
  const correctedS = genHsl.s + (targetHsl.s - genHsl.s) * 0.55;
  const correctedL = genHsl.l + (targetHsl.l - genHsl.l) * 0.22;

  return {
    h: lerpHue(genHsl.h, targetHsl.h, mixFactor),
    s: clamp(lerp(genHsl.s, correctedS, mixFactor * 0.75), 0, 1),
    l: clamp(lerp(genHsl.l, correctedL, mixFactor * 0.45), 0, 1),
  };
}

// ===== Hilfsfunktionen =====

function isRedTarget(targetHsl, targetColor) {
  const name = `${targetColor?.name || ''} ${targetColor?.label || ''} ${targetColor?.hex || ''}`.toLowerCase();
  return name.includes('rot') ||
    name.includes('red') ||
    name.includes('signal') ||
    name.includes('verkehr') ||
    targetHsl.h <= 0.04 ||
    targetHsl.h >= 0.96;
}

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
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

function hslToRgb(h, s, l) {
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

function colorDistance(r1, g1, b1, r2, g2, b2) {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

function lerpHue(a, b, t) {
  let diff = b - a;
  if (diff > 0.5) diff -= 1;
  if (diff < -0.5) diff += 1;
  return (a + diff * clamp(t, 0, 1) + 1) % 1;
}

function lerp(a, b, t) {
  return a + (b - a) * clamp(t, 0, 1);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
