'use strict'

window.onload = function() {
    document.querySelectorAll('select').forEach(item => {
        item.addEventListener('change', (e) => {
            sendFilter();
        });
    });
};
function sendFilter() {
    document.querySelector('#submit').click();
}
