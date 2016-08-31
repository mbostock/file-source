module.exports = function(source) {
  var task = source._head;
  if (task) {
    if (!(source._head = task.next)) source._tail = null;
    process.nextTick(task.callback);
  }
};
