use std::ffi::{CString, CStr};
use std::os::raw::{c_char};

pub type JsString = *mut c_char;

pub fn js_string_output<T: Into<Vec<u8>>>(t: T) -> JsString {
    let c_string = CString::new(t).unwrap();
    c_string.into_raw()
}

pub fn js_string_input(ptr: JsString) -> String {
    let s: String;

    unsafe {
        let cstr = CStr::from_ptr(ptr);
        let tmp: &str = cstr.to_str().unwrap();
        s = tmp.to_owned();
    };

    s
}
