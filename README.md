# rust-wasm

[![Build Status](https://travis-ci.org/jsonnull/rust-wasm.svg?branch=master)](https://travis-ci.org/jsonnull/rust-wasm)

A Rust and JavaScript utility suite for writing WebAssembly modules.

* Write functions with near-automatic string handling and memory management
* Ergonomic memory management API if you want to avoid unnecessary allocations
* No additional build-time tools required—use Cargo and your JavaScript bundler

**Note:** This is in early stages, expect frequent API changes for now.

---

**lib.rs**

```rust
extern crate rust_wasm_prelude;
use rust_wasm_prelude::*;

pub use rust_wasm_prelude::exports::*;

#[no_mangle]
pub fn to_uppercase(ptr: JsString) -> JsString {
    let mut s: String = js_string_input(ptr);
    s = s.to_uppercase();
    js_string_output(s)
}
```

**index.js**

```js
import { Prelude, types } from '@rust-wasm/prelude'
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
rust-wasm-prelude = "0.3.0"
rust-wasm-utils = "0.3.0"
```

Install JavaScript dependency with yarn/npm
```bash
yarn add @rust-wasm/prelude @rust-wasm/utils
```

## Examples

* [Basic](/examples/basic): A buildable demo project showing the API essentials
* [Memory Management](/examples/memory): The same as `basic`, but shows how to manage memory manually on the JS side

## Acknowledgements

* [HelloRust](https://github.com/badboy/hellorust) for showing how string
passing functions are used by JavaScript and Rust 
