extern crate rust_wasm_prelude;
extern crate rust_wasm_utils;
use rust_wasm_prelude::*;
use rust_wasm_utils as utils;

// Required: make prelude functions available to JS
pub use rust_wasm_prelude::exports::*;

#[no_mangle]
pub fn to_uppercase(ptr: JsString) -> JsString {
    // Can call functions made available from JS
    utils::log("called uppercase fn");

    let input: String = js_string_input(ptr);

    let output = input.to_uppercase();

    js_string_output(output)
}

#[no_mangle]
pub fn opposite(ptr: JsString) -> JsString {
    utils::log("called opposite fn");

    let input: String = js_string_input(ptr);

    let output = match input.as_str() {
        "even" => "odd",
        "odd" => "even",
        _ => "please input `even` or `odd`"
    };

    js_string_output(output)
}
