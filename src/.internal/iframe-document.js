function iframeDocument(iframe) {
    return iframe.contentDocument || iframe.contentWindow.document
}

export default iframeDocument
