// @flow
import Prelude from '../prelude'

export const createBrowserFunctions = (prelude: Prelude) => {
  return {
    js_log: (ptr: number, length: number) => {
      // Read from a Rust-owned string
      const msg = prelude.readString(ptr, length)
      console.log(`%cWASM > ${msg}`, 'color: #ff8000;')
    }
  }
}
