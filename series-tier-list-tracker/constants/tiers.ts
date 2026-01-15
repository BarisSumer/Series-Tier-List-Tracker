export const TIERS = ['S', 'A', 'B', 'C', 'D', 'F'] as const;

export const TIER_COLORS = {
  S: '#ff4757',
  A: '#ffa502',
  B: '#2ed573',
  C: '#1e90ff',
  D: '#9b59b6',
  F: '#7f8c8d'
} as const;

export const TIER_BACKGROUNDS = {
  S: 'bg-tier-S',
  A: 'bg-tier-A',
  B: 'bg-tier-B',
  C: 'bg-tier-C',
  D: 'bg-tier-D',
  F: 'bg-tier-F'
} as const;
