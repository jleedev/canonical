'use strict';

function sendVisitCanonical(tab) {
  var message = {type: VISIT_CANONICAL};
  chrome.tabs.sendMessage(tab.id, message);
}

chrome.pageAction.onClicked.addListener(sendVisitCanonical);

function updateVisibilityHandler(message, sender) {
  var tab = sender.tab;
  if (message.type != UPDATE_VISIBILITY) return;
  var title = "Canonical URL: " + message.url;
  if (message.visibility) {
    chrome.pageAction.show(tab.id);
    chrome.pageAction.setTitle({tabId: tab.id, title: title});
  } else {
    chrome.pageAction.hide(tab.id);
  }
}

chrome.extension.onMessage.addListener(updateVisibilityHandler);
