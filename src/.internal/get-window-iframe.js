function getWindowIframe(element) {
    return element.contentWindow || element.contentDocument.defaultView
}

export default getWindowIframe
