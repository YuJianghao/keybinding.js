"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.isStandalone=exports.isEdgeWebView=exports.isIPad=exports.isWebkitWebView=exports.isSafari=exports.isChrome=exports.isWebKit=exports.isFirefox=exports.isOpera=exports.isEdge=void 0;const userAgent=navigator.userAgent;exports.isEdge=userAgent.indexOf("Edge/")>=0,exports.isOpera=userAgent.indexOf("Opera")>=0,exports.isFirefox=userAgent.indexOf("Firefox")>=0,exports.isWebKit=userAgent.indexOf("AppleWebKit")>=0,exports.isChrome=userAgent.indexOf("Chrome")>=0,exports.isSafari=!exports.isChrome&&userAgent.indexOf("Safari")>=0,exports.isWebkitWebView=!exports.isChrome&&!exports.isSafari&&exports.isWebKit,exports.isIPad=userAgent.indexOf("iPad")>=0||exports.isSafari&&navigator.maxTouchPoints>0,exports.isEdgeWebView=exports.isEdge&&userAgent.indexOf("WebView/")>=0,exports.isStandalone=window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches;