// @flow

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
  createString(str: string) {
    const utf8Encoder = new TextEncoder()
    let string_buffer = utf8Encoder.encode(str)
    let len = string_buffer.length
    let ptr = this.alloc(len + 1)

    let memory = new Uint8Array(this.memory.buffer)
    for (let i = 0; i < len; i++) {
      memory[ptr + i] = string_buffer[i]
    }

    memory[ptr + len] = 0

    return ptr
  }

  // Reads and then frees a null-terminated string
  freeString(ptr: number) {
    const _this = this

    let orig_ptr = ptr
    const collectCString = function*() {
      let memory = new Uint8Array(_this.memory.buffer)
      while (memory[ptr] !== 0) {
        if (memory[ptr] === undefined) {
          throw new Error('Tried to read undef mem')
        }
        yield memory[ptr]
        ptr += 1
      }
    }

    const buffer_as_u8 = new Uint8Array(collectCString())
    const utf8Decoder = new TextDecoder('utf-8')
    const buffer_as_utf8 = utf8Decoder.decode(buffer_as_u8)
    this.dealloc_str(orig_ptr)
    return buffer_as_utf8
  }

  // Reads a string of specified length from the pointer
  readString(ptr: number, length: number) {
    const buf = new Uint8Array(this.memory.buffer, ptr, length)
    return new TextDecoder('utf8').decode(buf)
  }
}

/*
export function getStr(module, ptr, len) {
  const getData = function*(ptr, len) {
    let memory = new Uint8Array(module.memory.buffer)
    for (let index = 0; index < len; index++) {
      if (memory[ptr] === undefined) {
        throw new Error(`Tried to read undef mem at ${ptr}`)
      }
      yield memory[ptr + index]
    }
  }

  const buffer_as_u8 = new Uint8Array(getData(ptr / 8, len / 8))
  const utf8Decoder = new TextDecoder('UTF-8')
  const buffer_as_utf8 = utf8Decoder.decode(buffer_as_u8)
  return buffer_as_utf8
}
*/

export default Prelude
