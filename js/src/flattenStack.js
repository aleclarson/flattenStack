var flattenStack, parseErrorStack, parseStack, resolveStack;

parseErrorStack = require("parseErrorStack");

module.exports = flattenStack = function(input, result) {
  var stack;
  if (result == null) {
    result = [];
  }
  if (!(input instanceof Array)) {
    stack = resolveStack(input);
    if (!stack) {
      return result;
    }
    return result.concat(stack);
  }
  input.forEach(function(frame) {
    stack = resolveStack(frame);
    if (stack) {
      return result = result.concat(stack);
    }
  });
  return result;
};

resolveStack = function(value) {
  if (!value) {
    return;
  }
  if (value.constructor === Object) {
    return value;
  }
  if (value.constructor === String) {
    return value;
  }
  if (value instanceof Error) {
    return parseStack(value);
  }
  if (value instanceof Array) {
    return flattenStack(value);
  }
};

parseStack = function(error) {
  var stack;
  stack = parseErrorStack(error);
  if (typeof error.skip === "number") {
    if (error.skip > 0) {
      stack = stack.slice(error.skip);
    }
  }
  if (error.filter instanceof Function) {
    stack = stack.filter(error.filter);
  }
  return stack;
};

//# sourceMappingURL=../../map/src/flattenStack.map
