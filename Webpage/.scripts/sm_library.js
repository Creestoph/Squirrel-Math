/**
 * Created by InvincibleWombat on 28.11.2016.
 */

divide = function (x,y) {
    var i = 0;
    while (parseInt(i*y) < parseInt(x)) i++;
    return i-1;
}
