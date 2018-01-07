// @flow
import Prelude from './index'
import CString from './CString'
import types, { isValidType } from '../types'

const wrap = (prelude: Prelude, params: Array<any>) => {
  if (params.length <= 1) {
    throw new Error('Expected `wrap` to be called with at least 2 args')
  }

  if (params.length > 3) {
    throw new Error('Expected `wrap` to be called with up to 3 args')
  }

  // Grab input types
  const inputTypes = []
  const input = params[0]
  if (input.constructor === Array && input.length > 0) {
    inputTypes.push(...input)
  } else if (isValidType(input)) {
    inputTypes.push(input)
  } else {
    throw new Error('Invalid types given for `input` arg')
  }

  // Grab output type
  const outputType = params.length === 3 ? params[1] : null
  if (outputType !== null && !isValidType(outputType)) {
    throw new Error('Invalid type given for `output` arg')
  }

  // Grab fn
  const fn = params.length === 3 ? params[2] : params[1]
  if (typeof fn !== 'function') {
    throw new Error('Expected a function as the last argument to `wrap`')
  }

  // Create a wrapper function
  return (...args: any) => {
    const finalArgs = []

    const pointers = []

    // Perform input allocations
    inputTypes.forEach((type, position) => {
      // The value provided to the wrapped function
      const argument = args[position]

      // Determine if an allocation needs to be made
      if (type == types.string) {
        const str = prelude.CString(argument)
        pointers.push(str)
        finalArgs.push(str.pointer)
        return
      }

      // If we reached this point, just pass the original value
      finalArgs.push(argument)
    })

    // Call fn
    let result = fn.apply(null, finalArgs)

    // Perform input deallocations
    pointers.forEach(arg => {
      if (arg instanceof CString) {
        arg.free()
      }
    })

    // Perform output deallocation, if applicable
    if (outputType === types.string) {
      result = prelude.returnString(result)
    }

    return result
  }
}

export default wrap
