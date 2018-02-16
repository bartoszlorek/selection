function isEditable(node) {
    while (node) {
        if (node.isContentEditable) {
            return true
        }
        node = node.parentElement
    }
    return false
}

export default isEditable
