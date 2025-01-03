export function seededRandomNumberGenerator(seed: number) {
  return function (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
}
