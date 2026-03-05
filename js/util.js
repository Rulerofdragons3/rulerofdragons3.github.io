// Random selection
function selectRandomFromArray(arr) {
	return arr[Math.floor(Math.random() * arr.length)]
}

function weightedRandom(items, weights) {
    var w = Array.from(weights);
    var i;

    for (i = 1; i < w.length; i++)
        w[i] += w[i - 1];
    
    var random = Math.random() * w[w.length - 1];
    
    for (i = 0; i < w.length; i++)
        if (w[i] > random)
            break;
    
    return items[i];
}

function randiRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Basic math
function clamp(x, lower, upper) {
    return Math.max(Math.min(upper, x),lower)
}

// Array functions
/*
    Divides n marbles into x bags, with each bag containing at least one marble.
*/
function divideMarbles(marbles, bags) {
  if (bags <= 1 || marbles < bags) throw new Error(
    `marbles must be >= bags and bags > 1\nmarbles: ${marbles}, bags: ${bags}`
);

  // Start with x ones (minimum value per part)
  const result = Array(bags).fill(1);
  let remaining = marbles - bags;

  // Randomly distribute the remaining units
  while (remaining > 0) {
    const idbag = Math.floor(Math.random() * bags);
    result[idbag]++;
    remaining--;
  }

  return result;
}

function shuffleArray(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

export {selectRandomFromArray, weightedRandom, randiRange, divideMarbles, shuffleArray, clamp}