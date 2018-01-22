// Generate external declarations accepting pairs of pointer/length arguments
macro_rules! js_log_fn {
    ($n:ident, $($as:tt, $bs:tt),*) => {
        extern "C" {
            pub fn $n($($as: *const u8, $bs: u32),*);
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
