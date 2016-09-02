module.exports = function(source, next) {
  return source._task = source._task.then(next, next);
};
