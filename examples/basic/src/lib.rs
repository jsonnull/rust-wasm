extern crate rust_wasm_prelude;
#[macro_use]
extern crate rust_wasm_utils;
use rust_wasm_prelude::*;
use rust_wasm_utils::*;

// Required: make prelude functions available to JS
pub use rust_wasm_prelude::exports::*;

#[no_mangle]
pub fn to_uppercase(ptr: JsString) -> JsString {
    // Can call functions made available from JS
    console_log!("%cWASM >", "color:#ff8000;", "called uppercase fn");

    let input: String = js_string_input(ptr);

    let output = input.to_uppercase();

    js_string_output(output)
}

#[no_mangle]
pub fn opposite(ptr: JsString) -> JsString {
    console_log!("%cWASM >", "color:#ff8000;", "called opposite fn");

    let input: String = js_string_input(ptr);

    let output = match input.as_str() {
        "even" => "odd",
        "odd" => "even",
        _ => "please input `even` or `odd`"
    };

    js_string_output(output)
}
