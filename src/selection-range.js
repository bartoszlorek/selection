import { nextNode, prevNode } from './node-sibling'
import isTextNode from './is-text-node'

function selectionRange(_window = window, _document = document) {
    let selection = _window.getSelection(),
        element = _document.activeElement

    if (!element) {
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
        return selectionRange(
            element.contentWindow,
            element.contentDocument
        )
    }

    if (selection.rangeCount > 0) {
        let range = selection.getRangeAt(0)
        if (range.startOffset === range.endOffset) {
            return range
        }
        return trimToTextNodes(range)
    }
    return null
}

function trimToTextNodes(range) {
    let { startContainer, startOffset, endContainer, endOffset } = range

    if (!isTextNode(startContainer)) {
        startContainer = nextNode(startContainer, 3)
        startOffset = 0
    }
    if (!isTextNode(endContainer)) {
        endContainer = prevNode(endContainer, 3) || startContainer
        endOffset = endContainer.nodeValue.length
    }

    let collapsed = startContainer === endContainer && startOffset === endOffset

    return {
        commonAncestorContainer: getAncestor(
            startContainer,
            endContainer
        ),
        collapsed,
        startContainer,
        startOffset,
        endContainer,
        endOffset
    }
}

function getAncestor(start, end) {
    if (start === end) {
        return start
    }
    return getAncestor(
        start.parentElement || document.body,
        end.parentElement || document.body
    )
}

export default selectionRange
