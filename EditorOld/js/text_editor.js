/**
 * Created by InvincibleWombat on 08.05.2017.
 */
// define a handler
function doc_keyUp(e) {

    // this would test for whichever key is 40 and the ctrl key at the same time
    if (e.ctrlKey && e.keyCode === 66) {
        // call your function to do the thing
        document.execCommand( 'bold',false,null);
    }
    if (e.ctrlKey && e.keyCode === 73) {
        // call your function to do the thing
        document.execCommand( 'italic',false,null);
    }
    if (e.ctrlKey && e.keyCode === 84) {
        // call your function to do the thing
        document.execCommand( 'strikeThrough',false,null);
    }
    if (e.ctrlKey && e.keyCode === 85) {
        // call your function to do the thing
        document.execCommand( 'underline',false,null);
    }
}
// register the handler
document.addEventListener('click', doc_keyUp, false);