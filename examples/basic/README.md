# How to run this example

* Requires `rust` and `yarn`

* Make Rust nightly the default and install WebAssembly target
```bash
rustup update
rustup override set nightly
rustup component add wasm32-unknown-unknown --toolchain nightly
```

* Install wasm-gc, which is called during the build process
```bash
cargo install --git https://github.com/alexcrichton/wasm-gc
```

* Install node modules
```bash
yarn
```

* Build with `webpack`
```bash
yarn build
```

* Serve the files
```bash
yarn start
```

* Your demo is now available at `http://localhost:8080`
