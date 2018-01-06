// @flow
import Prelude from './index'

class CString {
  pointer: number
  length: number
  prelude: Prelude

  constructor(prelude: Prelude, str: string) {
    const utf8Encoder = new TextEncoder()
    let string_buffer = utf8Encoder.encode(str)

    this.length = string_buffer.length
    this.pointer = prelude.alloc(this.length + 1)
    this.prelude = prelude

    let memory = new Uint8Array(prelude.memory.buffer)
    for (let i = 0; i < this.length; i++) {
      memory[this.pointer + i] = string_buffer[i]
    }

    memory[this.pointer + this.length] = 0
  }

  // Reads and then frees a null-terminated string
  free() {
    const buf = new Uint8Array(
      this.prelude.memory.buffer,
      this.pointer,
      this.length
    )

    const str = new TextDecoder('utf8').decode(buf)

    this.prelude.dealloc(this.pointer, this.length + 1)
    return str
  }
}

export default CString
