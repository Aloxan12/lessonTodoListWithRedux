export function pluralizePoints(number: number) {
  const forms = ["точка", "точки", "точек"];
  const n = Math.abs(number) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) {
    return `${number} ${forms[2]}`;
  }
  if (n1 > 1 && n1 < 5) {
    return `${number} ${forms[1]}`;
  }
  if (n1 === 1) {
    return `${number} ${forms[0]}`;
  }
  return `${number} ${forms[2]}`;
}
