export const determineEndOfSeason = (): Date => {
  const now = new Date()
  const month = now.getMonth()

  if (month >= 6) {
    return new Date(`${now.getFullYear() + 1}-07-01`)
  }

  return new Date(`${now.getFullYear()}-07-01`)
}
