#[macro_export]
macro_rules! console_log {
    (@args $name:ident $($a:expr),*) => {
        $name($($a.as_ptr(), $a.len() as u32),*)
    };
    (@expr $a:expr) => {
        console_log!(@args js_log_1 $a);
    };
    (@expr $a:expr, $b:expr) => {
        console_log!(@args js_log_2 $a, $b);
    };
    (@expr $a:expr, $b:expr, $c:expr) => {
        console_log!(@args js_log_3 $a, $b, $c);
    };
    (@expr $a:expr, $b:expr, $c:expr, $d:expr) => {
        console_log!(@args js_log_4 $a, $b, $c, $d);
    };
    (@expr $a:expr, $b:expr, $c:expr, $d:expr, $e:expr) => {
        console_log!(@args js_log_5 $a, $b, $c, $d, $e);
    };
    (@expr $a:expr, $b:expr, $c:expr, $d:expr, $e:expr, $f:expr) => {
        console_log!(@args js_log_6 $a, $b, $c, $d, $e, $f);
    };
    (@expr $a:expr, $b:expr, $c:expr, $d:expr, $e:expr, $f:expr, $g:expr) => {
        console_log!(@args js_log_7 $a, $b, $c, $d, $e, $f, $g);
    };
    (@expr $a:expr, $b:expr, $c:expr, $d:expr, $e:expr, $f:expr, $g:expr, $h:expr) => {
        console_log!(@args js_log_8 $a, $b, $c, $d, $e, $f, $g, $h);
    };
    ($($ts:expr),*) => {
        unsafe {
            console_log!(@expr $(&format!("{}", $ts)),*);
        }
    };
}
