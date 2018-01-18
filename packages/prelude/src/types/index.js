// @flow

const types = {
  number: 'number',
  string: 'string'
}

export const isValidType = (input: any) => {
  for (const prop in types) {
    if (types.hasOwnProperty(prop)) {
      if (prop === input) {
        return true
      }
    }
  }
  return false
}

export default types
