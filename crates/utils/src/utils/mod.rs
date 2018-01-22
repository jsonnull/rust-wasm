// Generate external declarations accepting pairs of pointer/length arguments
macro_rules! js_log_fn {
    ($n:ident, $($as:tt, $bs:tt),*) => {
        extern "C" {
            fn $n($($as: *const u8, $bs: u32),*);
        }
    }
}

macro_rules! log_fn {
    ($n:ident, $jsn:ident, $($ts:tt),*) => {
        pub fn $n($($ts: &str),*) {
            unsafe {
                $jsn($($ts.as_ptr(), $ts.len() as u32),*);
            }
        }
    }
}

// Generate the definitions
js_log_fn!(js_log_1, ptr_a, len_a);
js_log_fn!(js_log_2, ptr_a, len_a, ptr_b, len_b);
js_log_fn!(js_log_3, ptr_a, len_a, ptr_b, len_b, ptr_c, len_c);
js_log_fn!(js_log_4, ptr_a, len_a, ptr_b, len_b, ptr_c, len_c, ptr_d, len_d);
js_log_fn!(js_log_5, ptr_a, len_a, ptr_b, len_b, ptr_c, len_c, ptr_d, len_d, ptr_e, len_e);
js_log_fn!(js_log_6, ptr_a, len_a, ptr_b, len_b, ptr_c, len_c, ptr_d, len_d, ptr_e, len_e, ptr_f, len_f);
js_log_fn!(js_log_7, ptr_a, len_a, ptr_b, len_b, ptr_c, len_c, ptr_d, len_d, ptr_e, len_e, ptr_f, len_f, ptr_g, len_g);
js_log_fn!(js_log_8, ptr_a, len_a, ptr_b, len_b, ptr_c, len_c, ptr_d, len_d, ptr_e, len_e, ptr_f, len_f, ptr_g, len_g, ptr_h, len_h);

log_fn!(log_1, js_log_1, a);
log_fn!(log_2, js_log_2, a, b);
log_fn!(log_3, js_log_3, a, b, c);
log_fn!(log_4, js_log_4, a, b, c, d);
log_fn!(log_5, js_log_5, a, b, c, d, e);
log_fn!(log_6, js_log_6, a, b, c, d, e, f);
log_fn!(log_7, js_log_7, a, b, c, d, e, f, g);
log_fn!(log_8, js_log_8, a, b, c, d, e, f, g, h);

#[macro_export]
macro_rules! log_dispatch {
    ($a:expr) => {
        log_1($a);
    };
    ($a:expr, $b:expr) => {
        log_2($a, $b);
    };
    ($a:expr, $b:expr, $c:expr) => {
        log_3($a, $b, $c);
    };
    ($a:expr, $b:expr, $c:expr, $d:expr) => {
        log_4($a, $b, $c, $d);
    };
}

#[macro_export]
macro_rules! console_log {
    ($($ts:expr),*) => {
        log_dispatch!($(&format!("{}", $ts)),*);
    };
}
