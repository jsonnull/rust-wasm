# wasm-rust-utils

A Rust and JavaScript utility suite for writing WebAssembly modules.

```rust
// lib.rs
extern crate wasm_rust_utils;
use wasm_rust_utils::*;

pub use wasm_rust_utils::prelude::*;

#[no_mangle]
pub fn to_uppercase(ptr: JsString) -> JsString {
    let mut s: String = js_string_input(ptr);
    s = s.to_uppercase();
    js_string_output(s)
}
```

```js
// index.js
import { Prelude } from 'wasm-rust-utils'
import loadWasm from './lib.rs'

const prelude = new Prelude()

loadWasm().then(module => {
  prelude.withExports(module.instance.exports)

  const toUppercase = str => {
    const input = prelude.createString(str)
    const output = module.instance.exports.to_uppercase(input)
    return prelude.readString(output)
  }

  console.log('uppercase of `test` is', toUppercase('test'))
})
```

For a better demo with comments, see the [example project](/examples/basic).

**Note: This is in early stages, expect frequent API changes for now.**

# Acknowledgements

* [HelloRust](https://github.com/badboy/hellorust) for showing how string
passing functions are used by JavaScript and Rust 
