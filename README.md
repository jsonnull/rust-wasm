# wasm-rust-utils

A Rust and JavaScript utility suite for writing WebAssembly modules.

**Note: This is in early stages, expect frequent API changes for now.**

**lib.rs**

```rust
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

**index.js**

```js
import { Prelude, types } from 'wasm-rust-utils'
import loadWasm from './lib.rs'

const prelude = new Prelude()

loadWasm()
  .then(module => module.instance.exports)
  .then(exports => {
    prelude.withExports(exports)

    const toUppercase = prelude.wrap(
      types.string,
      types.string,
      exports.to_uppercase
    )

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
