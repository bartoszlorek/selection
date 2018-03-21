import baseSelectionRange from './.internal/base-selection-range'
import trimToTextNodes from './.internal/trim-to-text-nodes'
import getWindowIframe from './.internal/get-window-iframe'
import getDocumentIframe from './.internal/get-document-iframe'
import getTagName from './.internal/get-tag-name'
import createRange from './.internal/create-range'

function selectionRange(win = window, doc = document) {
    let element = doc.activeElement
    if (element == null) {
        return null
    }

    let tagName = getTagName(element)
    if (tagName === 'textarea' || tagName === 'input') {
        try {
            let { selectionStart, selectionEnd } = element
            return createRange({
                startContainer: element,
                startOffset: selectionStart,
                endContainer: element,
                endOffset: selectionEnd
            })
        } catch (e) {
            return null
        }
    }

    if (tagName === 'iframe' || tagName === 'frame') {
        // Same-origin policy
        try {
            return selectionRange(
                getWindowIframe(element),
                getDocumentIframe(element)
            )
        } catch (e) {
            return null
        }
    }

    let range = baseSelectionRange(win, doc)
    if (range !== null) {
        if (range.collapsed === false) {
            range = trimToTextNodes(range)
        }
        return range
    }

    return null
}

export default selectionRange
