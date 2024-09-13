export function stringToDateString(stringDateTime: string) {
  const date: Date = new Date(stringDateTime);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().substring(0, 10);
}
