use std::ffi::{CString};
use std::os::raw::{c_char};

pub type JsString = *mut c_char;

pub fn js_string_output<T: Into<Vec<u8>>>(t: T) -> JsString {
    let c_string = CString::new(t).unwrap();
    c_string.into_raw()
}

pub fn js_string_input(ptr: JsString) -> String {
    let s: String;

    unsafe {
        s = CString::from_raw(ptr).into_string().unwrap();
    };

    s
}
