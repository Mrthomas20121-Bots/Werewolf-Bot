function randomHexColor(len=6) {
  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  let result = ''
  for (let i = 0; i < len; i++) {
    result = `${result}${arr[randomInt(0, 14)]}`
  }
  return result
}
function randomInt(min,max)
{
    return Math.floor(Math.random()*(max-min)+min);
}

module.exports = {
  randomHexColor,
  randomInt
};