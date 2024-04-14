export function removeOneItem<T>(arr: T[], item: T) {
  const index = arr.indexOf(item)
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
}

export function pushItem<T>(arr: T[], item: T) {
  arr.push(item)
  return arr
}
