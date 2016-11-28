/**
 * Created by InvincibleWombat on 28.11.2016.
 */

divide = function (x,y) {
    if (parseInt(x) == 0) return 0;
    var i = 0;
    while (parseInt(i*y) < parseInt(x)) i++;
    return i-1;
}
