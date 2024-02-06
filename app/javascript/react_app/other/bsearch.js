const binarySearch = (arr, target) => {
  let low = 0
  let high = arr.length - 1

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)

    if (arr[mid] === target) {
      return mid // Number found
    }
    if (arr[mid] < target) {
      low = mid + 1
    } else {
      high = mid - 1
    }
  }

  return low - 1 // return the index to the left
}

// eslint-disable-next-line
export { binarySearch }
