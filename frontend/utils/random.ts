export function seededRandomNumberGenerator(seed: number) {
  let value = seed;
  return function (min: number, max: number): number {
    value = (value * 9301 + 49297) % 233280;
    const random = value / 233280;
    return Math.floor(min + random * (max - min + 1)) + 1;
  };
}
