module.exports = function isDev(affirmation, negation) {
  return process.env.NODE_ENV === 'development'
    ? affirmation || true
    : negation || false;
};
