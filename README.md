# wasm-rust-utils

A Rust and JavaScript utility suite for writing WebAssembly modules.

**Note: This is in early stages, expect frequent API changes for now.**

**lib.rs**

```rust
extern crate wasm_rust_utils;

pub use wasm_rust_utils::prelude::*;

#[no_mangle]
pub fn to_uppercase(ptr: JsString) -> JsString {
    let mut s: String = js_string_input(ptr);
    s = s.to_uppercase();
    js_string_output(s)
}
```

**index.js**

```js
import { Prelude } from 'wasm-rust-utils'
import loadWasm from './lib.rs'

const prelude = new Prelude()

loadWasm().then(module => {
  prelude.withExports(module.instance.exports)

  const toUppercase = str => {
    const input = prelude.CString(str)
    const output = module.instance.exports.to_uppercase(input.pointer)
    input.free()
    return prelude.returnString(output)
  }

  console.log('uppercase of `test` is', toUppercase('test'))
})
```

## Installation

Add Rust dependency to your `Cargo.toml`

```toml
wasm-rust-utils = "0.1.0"
```

Install JavaScript dependency with yarn/npm
```bash
yarn add wasm-rust-utils
```

## Examples

* [Basic](/examples/basic): A buildable demo project showing the API essentials

## Acknowledgements

* [HelloRust](https://github.com/badboy/hellorust) for showing how string
passing functions are used by JavaScript and Rust 
