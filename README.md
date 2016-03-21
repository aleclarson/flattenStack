
# flattenStack v1.0.0 [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Supports `Error`, `Array`, `String`, and `Object` values.

Spits out an array of objects like this:

```coffee
stackFrame = {
  file:       String
  methodName: String
  lineNumber: Number
  column:     Number
}
```

### Example

```coffee
flattenStack = require "flattenStack"

stack = flattenStack [
  Error()
  "A label telling you where the stack frames below are from."
  [
    Error()
    [
      { file: "fake stack frame", methodName: "unknown", lineNumber: 10, column: 12 }
    ]
  ]
]
```

You can set specific keys of an `Error` to customize the stack:

- `filter: Function` - Call `stack.filter(error.filter)` on the `Error`'s parsed stack.

- `skip: Number` - Call `stack.slice(0, error.skip)` on the `Error`'s parsed stack. This is used before `error.filter`.
