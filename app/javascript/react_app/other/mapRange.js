// Use linear interpolation
function mapRange(value, fromMin, fromMax, toMin, toMax) {
  // Calculate the ratio of the value's position in the original range
  const ratio = (value - fromMin) / (fromMax - fromMin)

  // Map the ratio to the new range
  const mappedValue = ratio * (toMax - toMin) + toMin

  return mappedValue
}

// eslint-disable-next-line
export { mapRange }
