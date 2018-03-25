function iframeWindow(iframe) {
    return iframe.contentWindow || iframe.contentDocument.defaultView
}

export default iframeWindow
