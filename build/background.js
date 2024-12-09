chrome.runtime.onInstalled.addListener(() => {
  console.log("Story Creator installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "login") {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      sendResponse({ token });
    });
    return true;
  }
  if (request.action === 'getUrl') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab && tab.url) {
        sendResponse({ url: tab.url });
      } else {
        sendResponse({ url: null });
      }
    });
    return true;
  }
});
