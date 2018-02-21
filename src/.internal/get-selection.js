function getSelection(_window, _document) {
    if (_window.getSelection !== undefined) {
        return _window.getSelection()
    }
    if (_document.selection !== undefined) {
        return _document.selection.createRange()
    }
    return null
}

export default getSelection
