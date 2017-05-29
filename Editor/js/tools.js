/**
 * Created by InvincibleWombat on 17.05.2017.
 */

function leftMousePressed(e) {
    e = e || window.event;
    var button = e.which || e.button;
    return button === 1;
}
