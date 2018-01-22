// @flow
interface Prelude {
  readString(number, number): String
}

const logFunction = (prelude: Prelude) => (...args: Array<number>) => {
  const strings = []
  for (let i = 0; i < args.length; i += 2) {
    const str = prelude.readString(args[i], args[i + 1])
    strings.push(str)
  }

  console.log(...strings)
}

const utilsFactory = (prelude: Prelude) => {
  const logger = logFunction(prelude)
  return {
    js_log_1: logger,
    js_log_2: logger,
    js_log_3: logger,
    js_log_4: logger,
    js_log_5: logger,
    js_log_6: logger,
    js_log_7: logger,
    js_log_8: logger
  }
}

export default utilsFactory
