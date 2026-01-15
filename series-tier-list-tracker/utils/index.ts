export function cn(...inputs: string[]) {
  return inputs.join(' ');
}

export function getRatingColor(rating: number): string {
  if (rating >= 8) return '#2ed573';
  if (rating >= 6) return '#7bed9f';
  if (rating >= 4) return '#ffa502';
  if (rating >= 2) return '#ff6348';
  return '#ff4757';
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function getPosterUrl(path: string, size: number = 500): string {
  return `https://image.tmdb.org/t/p/w${size}${path}`;
}

export function getBackdropUrl(path: string, size: number = 1280): string {
  return `https://image.tmdb.org/t/p/w${size}${path}`;
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
