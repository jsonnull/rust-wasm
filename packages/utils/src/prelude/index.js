// @flow
import 'fast-text-encoding'
import CString from './CString'
import wrap from './wrap'

class Prelude {
  memory: Uint8Array
  alloc: Function
  dealloc: Function
  dealloc_str: Function

  withExports(exports: Object) {
    this.memory = exports.memory
    this.alloc = exports.alloc
    this.dealloc = exports.dealloc
    this.dealloc_str = exports.dealloc_str
  }

  // Allocates a new string
  CString(str: string) {
    return new CString(this, str)
  }

  readString(ptr: number, length: number) {
    const buf = new Uint8Array(this.memory.buffer, ptr, length)
    return new TextDecoder('utf-8').decode(buf)
  }

  // Reads a string of specified length from the pointer
  returnString(ptr: number) {
    const memory = new Uint8Array(this.memory.buffer)

    let length = 0
    while (memory[ptr + length] !== 0) {
      length += 1
    }

    const str = this.readString(ptr, length)

    this.dealloc_str(ptr)
    return str
  }

  wrap(...args: any) {
    return wrap(this, args)
  }
}

export default Prelude
