use memalloc;
use std::ffi::{CString};
use std::os::raw::{c_char};

#[no_mangle]
pub fn alloc(size: usize) -> *mut u8 {
    unsafe {
        let ptr = memalloc::allocate(size);
        ptr
    }
}

#[no_mangle]
pub fn dealloc(ptr: *mut u8, size: usize) {
    unsafe  {
        memalloc::deallocate(ptr as *mut u8, size);
    }
}

#[no_mangle]
pub fn dealloc_str(ptr: *mut c_char) {
    unsafe {
        let _ = CString::from_raw(ptr);
    }
}
