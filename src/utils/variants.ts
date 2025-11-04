export function selectVariant<T, K extends string>(map: Record<K, T>, variant: K, fallback?: K): T {
  if (map[variant]) {
    return map[variant];
  }
  if (fallback && map[fallback]) {
    return map[fallback];
  }
  const firstKey = Object.keys(map)[0] as K;
  return map[firstKey];
}
