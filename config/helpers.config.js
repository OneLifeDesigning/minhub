module.exports.getType = (arr, type) => {
  return arr.filter(elemt => elemt.type === type)
}
module.exports.getNoType = (arr, type) => {
  return arr.filter(elemt => elemt.type !== type)
}