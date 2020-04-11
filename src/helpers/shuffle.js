/**
 * Shuffles array in place. ES6 version
 * @param {Array} a An array containing items.
 * @return {Array}
 */                    
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

module.exports = shuffle;