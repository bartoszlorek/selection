function isEditable(element) {
    if (element.isContentEditable === undefined) {
        element = element.parentElement
    }
    return element.isContentEditable
}

export default isEditable
