import trimToTextNodes from './.internal/trim-to-text-nodes'
import getSelection from './.internal/get-selection'

function selectionRange(_window = window, _document = document) {
    let element = _document.activeElement
    if (element == null) {
        return null
    }

    let tagName = element.tagName.toLowerCase()
    if (tagName === 'textarea' || tagName === 'input') {
        try {
            let { selectionStart, selectionEnd } = element
            return {
                commonAncestorContainer: element,
                collapsed: selectionStart === selectionEnd,
                startContainer: element,
                startOffset: selectionStart,
                endContainer: element,
                endOffset: selectionEnd
            }
        } catch (e) {
            return null
        }
    }

    if (tagName === 'iframe' || tagName === 'frame') {
        // prevents accessing a cross-origin frame
        try {
            return selectionRange(
                element.contentWindow || element.contentDocument.defaultView,
                element.contentDocument || element.contentWindow.document
            )
        } catch (e) {
            return null
        }
    }

    let selection = getSelection(_window, _document)
    if (selection && selection.rangeCount > 0) {
        let range = selection.getRangeAt(0)
        if (range.collapsed === false) {
            return trimToTextNodes(range)
        }
        return range
    }

    return null
}

export default selectionRange
