extern crate wasm_rust_utils;
use wasm_rust_utils::*;

// Required: make prelude functions available to JS
pub use wasm_rust_utils::prelude::*;

#[no_mangle]
pub fn to_uppercase(ptr: JsString) -> JsString {
    // Can call functions made available from JS
    browser::log("called uppercase fn");

    let mut s: String = js_string_input(ptr);

    s = s.to_uppercase();

    js_string_output(s)
}

#[no_mangle]
pub fn opposite(ptr: JsString) -> JsString {
    browser::log("called opposite fn");

    let input: String = js_string_input(ptr);

    let output = match input.as_str() {
        "even" => "odd",
        "odd" => "even",
        _ => "please input `even` or `odd`"
    };

    js_string_output(output)
}
