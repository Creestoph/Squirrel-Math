/**
 * Created by InvincibleWombat on 11.11.2016.
 */


function SetInputEnterEvent(inputId, btnId)
{
    document.getElementById(inputId)
        .addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode == 13) {
                document.getElementById(btnId).click();
            }
        });
}