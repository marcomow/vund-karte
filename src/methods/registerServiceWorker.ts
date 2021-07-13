export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../sw.js', { scope: '.' }).then(reg => {
        })
            .catch(e => console.error('Error during service worker registration:', e));
    } else {
        console.warn('Service Worker is not supported');
    }
}
