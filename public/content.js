const webAppUrl = 'http://44.212.39.53:3000/';
const iframe = document.createElement('iframe');
iframe.src = webAppUrl;
iframe.style.width = '100%';
iframe.style.height = '700px';
iframe.style.border = 'none';
iframe.style.marginBottom = '10px';
iframe.style.backgroundColor = '#fff';
window.addEventListener('load', () => {
    const recommendationSection = document.querySelector('#secondary');
    if (recommendationSection) {
        recommendationSection.prepend(iframe);
    }
    iframe.addEventListener('load', () => {
        if (chrome.runtime?.sendMessage) {
            chrome.runtime.sendMessage({ action: 'getUrl' }, (response) => {
                if (response && response.url) {
                    iframe.contentWindow.postMessage({ type: 'videoUrl', url: response.url }, '*');
                }
            });
        }
        sendVideoUrlToIframe();
    });
    let lastUrl = location.href;
    const observer = new MutationObserver(() => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            sendVideoUrlToIframe(); 
        }
    });
    observer.observe(document, { subtree: true, childList: true })
});

function sendVideoUrlToIframe() {
    if (chrome.runtime?.sendMessage) {
        chrome.runtime.sendMessage({ action: 'getUrl' }, (response) => {
            if (response && response.url) {
                iframe.contentWindow.postMessage({ type: 'videoUrl', url: response.url }, '*');
            }
        });
    }
}
window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'videoUrl') {
        console.log("Received video URL:", event.data.url);
    } else {
        console.log("Received irrelevant message:", event.data);
    }
});