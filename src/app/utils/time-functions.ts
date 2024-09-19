export function stringToDateString(stringDateTime: string) {
  return stringToDate(stringDateTime).toISOString().substring(0, 10);
}

export function stringToDate(stringDateTime: string) {
  const date: Date = new Date(stringDateTime);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
}

export function addDateTime(date: Date, hour: number = 0, minute: number = 0, second: number = 0) {
  date.setHours(
    date.getHours() + hour,
    date.getMinutes() + minute,
    date.getSeconds() + second
  );
  return date;
}


export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
