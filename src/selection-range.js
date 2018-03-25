import documentWindow from './.internal/document-window'
import iframeWindow from './.internal/iframe-window'
import iframeDocument from './.internal/iframe-document'
import getTagName from './.internal/get-tag-name'

import baseSelectionRange from './.internal/base-selection-range'
import createRange from './.internal/create-range'
import rangeTrim from './.internal/range-trim'

function constructor(win, doc) {
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
            return constructor(
                iframeWindow(element),
                iframeDocument(element)
            )
        } catch (e) {
            return null
        }
    }

    let range = baseSelectionRange(win, doc)
    if (range === null) {
        return null
    }

    if (range.collapsed === false) {
        range = rangeTrim(range)
    }
    return range
}

function selectionRange(doc = document) {
    return constructor(documentWindow(doc), doc)
}

export default selectionRange
