export function ifNotFirstCollapse(i: number) {
  return i !== 0 ? "collapsed" : ""
}

export function ifFirstShow(i: number) {
  return i === 0 ? "show" : ""
}
