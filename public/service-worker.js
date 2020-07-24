/* ServiceWorker | Last features: 04/04/20
======================================================================= */

'use strict';

const serviceWorker = (state) => {
    if ('serviceWorker' in navigator & state == true) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js').then(function(registration) {
                // Registration was successful
                // console.log('ServiceWorker registration successful with scope: ', registration.scope)
            }, function(err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err)
            })
        })
    }
}

module.exports = serviceWorker
