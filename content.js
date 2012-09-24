function visitCanonical(response, canonicalUrl) {
  if (response.type != VISIT_CANONICAL) return;
  // Try it seamlessly, but that fails if the origin's going to change
  try {
    history.replaceState(undefined, '', canonicalUrl)
  }
  catch(e) {
    location.replace(canonicalUrl);
  }
  updateVisibility();
}

function updateVisibility() {
  var canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink == null) return;
  // nb: will be absolute
  var canonicalUrl = canonicalLink.href;
  message = {
    type: UPDATE_VISIBILITY,
    visibility: true,
    url: canonicalUrl,
  };
  var responseCallback = function(response) {
    return visitCanonical(response, canonicalUrl);
  }
  chrome.extension.sendMessage(undefined, message, responseCallback);
}

updateVisibility();
