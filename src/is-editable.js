function isEditable(element) {
    if (element.isContentEditable === undefined) {
        element = element.parentElement || element.parentNode
    }
    return element.isContentEditable
}

export default isEditable
