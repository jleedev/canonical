'use strict';

var canonicalUrl;

function visitCanonical(message, sender) {
  if (message.type != VISIT_CANONICAL) return;
  // Try it seamlessly, but that fails if the origin's going to change
  try {
    history.replaceState(undefined, '', canonicalUrl)
  }
  catch(e) {
    location.replace(canonicalUrl);
  }
  updateVisibility();
}

chrome.runtime.onMessage.addListener(visitCanonical);

function shouldBeVisible() {
  var canonicalLink = document.querySelector('link[rel~=canonical]');
  if (canonicalLink == null) return false;
  // nb: will be absolute
  canonicalUrl = canonicalLink.href;
  if (canonicalUrl == location.href) return false;
  return true;
}

function updateVisibility() {
  if (shouldBeVisible()) {
    var message = {
      type: UPDATE_VISIBILITY,
      visibility: true,
      url: canonicalUrl,
    };
    chrome.runtime.sendMessage('', message);
  }
}

updateVisibility();
