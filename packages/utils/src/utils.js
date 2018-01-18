// @flow
import Prelude from '@rust-wasm/prelude'

const utilsFactory = (prelude: Prelude) => {
  return {
    js_log: (ptr: number, length: number) => {
      // Read from a Rust-owned string
      const msg = prelude.readString(ptr, length)
      console.log(`%cWASM > ${msg}`, 'color: #ff8000;')
    }
  }
}

export default utilsFactory
