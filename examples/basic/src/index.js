// @flow
import { Prelude, browser, types } from 'wasm-rust-utils'
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

    const opposite = prelude.wrap(types.string, types.string, exports.opposite)

    const toUppercase = prelude.wrap(
      types.string,
      types.string,
      exports.to_uppercase
    )

    console.log('the opposite of even is', opposite('even'))

    console.log('uppercase of `test` is', toUppercase('test'))
  })
