export function generatePastelColor(seed: number): string {
  const baseHue = (seed * 137 + Math.floor(seed / 10)) % 360; // Generamos un matiz base usando el índice
  const saturation = 60; // Saturación baja para colores pastel
  const lightness = 85; // Luminosidad alta para colores pastel

  return `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
}

export function generateForegroundColor(hsl: string): string {
  const segments = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!segments) throw new Error('Invalid HSL color');

  const [hue, saturation, lightness] = segments.slice(1).map(Number);

  const newLightness = lightness > 50 ? lightness - 40 : lightness + 40; // Ajustamos la luminosidad para el texto
  return `hsl(${hue}, ${saturation}%, ${newLightness}%)`;
}

export function generatePastelPalette(index: number, size: number = 5): string[] {
  const palette: string[] = [];
  for (let i = 0; i < size; i++) {
    const color = generatePastelColor(index + i); // Ajustamos el índice para cada color
    palette.push(color);
  }
  return palette;
}
