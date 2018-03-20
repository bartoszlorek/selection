function getDocumentIframe(element) {
    return element.contentDocument || element.contentWindow.document
}

export default getDocumentIframe
