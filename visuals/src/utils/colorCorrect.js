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

        // Canvas für Verarbeitung
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const w = Math.min(originalImg.naturalWidth, generatedImg.naturalWidth);
        const h = Math.min(originalImg.naturalHeight, generatedImg.naturalHeight);
        canvas.width = w;
        canvas.height = h;

        // 1. Lade beide Bilder in Canvas
        ctx.drawImage(originalImg, 0, 0, w, h);
        const origData = ctx.getImageData(0, 0, w, h);
        ctx.drawImage(generatedImg, 0, 0, w, h);
        const genData = ctx.getImageData(0, 0, w, h);

        // 2. Ziel-HSL aus HEX berechnen
        const targetRgb = hexToRgb(targetColor.hex);
        const targetHsl = rgbToHsl(targetRgb.r, targetRgb.g, targetRgb.b);

        // 3. Pixelweise Korrektur
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

          // Prüfe ob dieser Pixel sich verändert hat (Änderungsmaske)
          const diff = colorDistance(origR, origG, origB, genR, genG, genB);

          if (diff > 15) {
            // Pixel wurde von FLUX verändert → Farbe korrigieren
            const genHsl = rgbToHsl(genR, genG, genB);

            // Ziel-Tönung auf den veränderten Pixel anwenden
            // Mix: Hue vom Ziel, Saturation geboosted, Luminance vom generierten erhalten
            const mixFactor = Math.min(1, diff / 80); // Stärker korrigieren bei großen Änderungen

            const correctedH = targetHsl.h;
            const correctedS = genHsl.s + (targetHsl.s - genHsl.s) * 0.5;
            const correctedL = genHsl.l + (targetHsl.l - genHsl.l) * 0.15;

            const { r, g, b } = hslToRgb(
              lerp(genHsl.h, correctedH, mixFactor),
              lerp(genHsl.s, correctedS, mixFactor * 0.7),
              lerp(genHsl.l, correctedL, mixFactor * 0.3)
            );

            outPixels[i] = r;
            outPixels[i + 1] = g;
            outPixels[i + 2] = b;
            // Alpha bleibt gleich
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

// ===== Hilfsfunktionen =====

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
  return Math.sqrt(
    (r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2
  );
}

function lerp(a, b, t) {
  return a + (b - a) * Math.min(1, Math.max(0, t));
}