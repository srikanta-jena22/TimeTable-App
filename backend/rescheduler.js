function rescheduleMissed(minutesMissed) {
  const sessions = [];

  while (minutesMissed > 0) {
    sessions.push(Math.min(10, minutesMissed));
    minutesMissed -= 10;
  }

  return sessions;
}

module.exports = rescheduleMissed;
