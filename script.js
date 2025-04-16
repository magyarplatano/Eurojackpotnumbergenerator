const mainHistory = {};
const bonusHistory = {};

function getRandomNumbers(count, max) {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * max) + 1);
  }
  return [...numbers].sort((a, b) => a - b);
}

function updateHistory(history, numbers) {
  numbers.forEach(num => {
    history[num] = (history[num] || 0) + 1;
  });
}

function formatHistory(history) {
  return Object.entries(history)
    .sort((a, b) => b[1] - a[1])
    .map(([num, count]) => `${num}: ${count}`)
    .join('\n');
}

function generateNumbers() {
  const mainNumbers = getRandomNumbers(5, 50);
  const bonusNumbers = getRandomNumbers(2, 12);

  document.getElementById("mainNumbers").innerText = "Main Numbers: " + mainNumbers.join(", ");
  document.getElementById("bonusNumbers").innerText = "Bonus Numbers: " + bonusNumbers.join(", ");

  updateHistory(mainHistory, mainNumbers);
  updateHistory(bonusHistory, bonusNumbers);

  document.getElementById("mainHistory").innerText = formatHistory(mainHistory);
  document.getElementById("bonusHistory").innerText = formatHistory(bonusHistory);
}
