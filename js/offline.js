// We want to check to see if the browser actually supports // the serviceWorker property! Not sure if it does or not?
// Check out http://caniuse.com/#feat=serviceworkers

if ('serviceWorker' in navigator) {
    // We want to register the service worker file with the browser
    navigator.serviceWorker.register('service_worker.js', {
        // Just the file scope; since this is in the main directory, we'll leave it blank. This is kind of a finicky option, FYI.
        scope: ''
    }).then(function(reg) {
        // registration worked, hurray!
        console.log('Registration succeeded. Scope is ' + reg.scope);

        if (reg.installing) {
            console.log('Service worker installing');
        } else if (reg.waiting) {
            console.log('Service worker installed');
        } else if (reg.active) {
            console.log('Service worker active');
        }
    }).catch(function(error) {
        // registration failed. No worries, just make sure HTTPS is enabled and you're calling the SW correctly.
        console.log('Registration failed with ' + error);
    });
}