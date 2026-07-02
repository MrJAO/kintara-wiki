export interface HuntingItem {
  id: string;
  type: string;
  name: string;
  dropRate: number;
  attemptType: "kill" | "cast" | "spin" | "feed";
  minAttemptsPerMinute: number;
  maxAttemptsPerMinute: number;
  locations: string[];
}

export interface ChanceResult {
  minChances: number;
  maxChances: number;
  minProbability: number;
  maxProbability: number;
}

export function calculateChances(
  item: HuntingItem,
  hours: number,
  minutes: number
): ChanceResult {
  const totalMinutes = Math.max(0, hours) * 60 + Math.max(0, minutes);

  const minChances = totalMinutes * item.minAttemptsPerMinute;
  const maxChances = totalMinutes * item.maxAttemptsPerMinute;

  const probabilityOf = (chances: number) =>
    1 - Math.pow(1 - item.dropRate, chances);

  return {
    minChances,
    maxChances,
    minProbability: probabilityOf(minChances) * 100,
    maxProbability: probabilityOf(maxChances) * 100,
  };
}

export function formatChances(value: number): string {
  return value.toLocaleString(undefined, { maximumFractionDigits: 1 });
}

export function formatProbability(value: number): string {
  if (value < 0.01 && value > 0) return "<0.01%";
  return `${value.toFixed(2)}%`;
}
