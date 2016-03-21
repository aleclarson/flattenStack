
parseErrorStack = require "parseErrorStack"

module.exports =
flattenStack = (input, result = []) ->

  unless input instanceof Array
    stack = resolveStack input
    return result unless stack
    return result.concat stack

  input.forEach (frame) ->
    stack = resolveStack frame
    result = result.concat stack if stack
  return result

resolveStack = (value) ->
  return unless value
  return value if value.constructor is Object
  return value if value.constructor is String
  return parseStack value if value instanceof Error
  return flattenStack value if value instanceof Array
  return

parseStack = (error) ->

  stack = parseErrorStack error

  if typeof error.skip is "number"
    stack = stack.slice error.skip if error.skip > 0

  if error.filter instanceof Function
    stack = stack.filter error.filter

  return stack
