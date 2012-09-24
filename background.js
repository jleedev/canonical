var responses = [];

function sendVisitCanonical(tab) {
  if (tab.id in responses) {
    var message = {type: VISIT_CANONICAL};
    responses[tab.id](message);
    delete responses[tab.id];
  }
}

chrome.pageAction.onClicked.addListener(sendVisitCanonical);

function updateVisibilityHandler(message, sender, responseCallback) {
  var tab = sender.tab;
  if (message.type != UPDATE_VISIBILITY) return;
  var title = "Canonical URL: " + message.url;
  if (message.visibility) {
    chrome.pageAction.show(tab.id);
    chrome.pageAction.setTitle({tabId: tab.id, title: title});
    responses[tab.id] = responseCallback;
    return true;
  } else {
    chrome.pageAction.hide(tab.id);
  }
}

chrome.extension.onMessage.addListener(updateVisibilityHandler);
