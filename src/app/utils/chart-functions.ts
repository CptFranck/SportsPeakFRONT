export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function defaultChartValue(reps: number[], weights: number[], dates: Date[]) {
  let nbRep: number;
  let weight: number = 0;
  let progRep: number = 0;
  let progWeight: number = 0;
  for (let i: number = 1; i < 51; i++) {
    if (i % 10 === 0) {
      progRep += 1
      progWeight += 5
    }
    if (i % 5 === 0) {
      weight = 25;
      nbRep = randomIntFromInterval(5, 10)
    } else if (i % 4 === 0) {
      weight = 20;
      nbRep = randomIntFromInterval(6, 10)
    } else if (i % 3 === 0) {
      weight = 15;
      nbRep = randomIntFromInterval(7, 10)
    } else if (i % 2 === 0) {
      weight = 10;
      nbRep = randomIntFromInterval(8, 10)
    } else {
      weight = 5;
      nbRep = 10
    }
    reps.push(nbRep + progRep)
    weights.push(weight + progWeight)
    let now: Date = new Date()
    now.setDate(now.getDate() + i)
    dates.push(now)
  }
}
