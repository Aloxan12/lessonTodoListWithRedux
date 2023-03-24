export function formatRooms(num: number) {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = ["комната", "комнаты", "комнат"];
  const index =
    num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5];
  return `${num} ${titles[index]}`;
}
