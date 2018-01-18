// @flow
import { Prelude, browser } from '@rust-wasm/utils'
import loadWasm from './lib.rs'

const prelude = new Prelude()

loadWasm({
  env: {
    // Make the browser module available to rust
    ...browser(prelude)
  }
})
  .then(module => module.instance.exports)
  .then(exports => {
    // Update the prelude with the module's exports
    prelude.withExports(exports)

    // When calling into Rust, we are responsible for allocation and deallocation
    const opposite = str => {
      const input = prelude.CString(str)
      const output = exports.opposite(input.pointer)
      input.free()
      return prelude.returnString(output)
    }

    console.log('the opposite of even is', opposite('even'))

    // Since this fn's implementation re-uses the input pointer, only one
    // deallocation is necessary
    const toUppercase = str => {
      const input = prelude.CString(str)
      const output = exports.to_uppercase(input.pointer)
      input.free()
      return prelude.returnString(output)
    }

    console.log('uppercase of `test` is', toUppercase('test'))
  })
