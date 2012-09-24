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

chrome.extension.onMessage.addListener(visitCanonical);

function updateVisibility() {
  var canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink == null) return;
  // nb: will be absolute
  canonicalUrl = canonicalLink.href;
  message = {
    type: UPDATE_VISIBILITY,
    visibility: true,
    url: canonicalUrl,
  };
  chrome.extension.sendMessage(undefined, message);
}

updateVisibility();
