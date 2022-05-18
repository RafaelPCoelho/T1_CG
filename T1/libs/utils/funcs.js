export const pushObject = (object, value) => {
  var keys = Object.keys(object);
  var next = keys[keys.length - 1] + 1;

  object[next] = value;
  return next;
};
