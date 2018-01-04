extern "C" {
    fn js_log(ptr: *const u8, len: u32);
}

pub fn log(msg: &str) {
    unsafe {
        js_log(msg.as_ptr(), msg.len() as u32);
    }
}
