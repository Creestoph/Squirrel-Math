/**
 * Created by Creestoph on 31.10.2016.
 */
export function validate_float(x) {
    var was_comma = false;
    var ok = true;
    for (var i = 0; i < x.length; i++) {
        if (x[i] == '.' || x[i] == ',') {
            if (was_comma) {
                ok = false;
                break;
            } else was_comma = true;
        } else if (isNaN(parseInt(x[i]))) {
            ok = false;
            break;
        }
    }
    return ok;
}
export function validate_int(x) {
    for (var i = 0; i < x.length; i++) if (isNaN(parseInt(x[i]))) return false;
    return true;
}
