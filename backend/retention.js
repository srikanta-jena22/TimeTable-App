function getStrength(difficulty) {
  if (difficulty === "easy") return 48;
  if (difficulty === "medium") return 24;
  return 12; // hard
}

function calculateRetention(hoursPassed, strength) {
  return Math.exp(-hoursPassed / strength) * 100;
}

module.exports = {
  getStrength,
  calculateRetention,
};
