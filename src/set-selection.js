import nodeWindow from './.internal/node-window'
import nodeDocument from './.internal/node-document'
import getTagName from './.internal/get-tag-name'
import getChildBy from './.utils/get-child-by'
import isNode from './.utils/is-node'
import isRange from './.utils/is-range'

const childWithContent = getChildBy(
    e => e.textContent && e.textContent.trim() !== ''
)

function baseNodeSelection(startNode, endNode, start, end) {
    if (startNode == null) {
        return
    }
    if (endNode == null) {
        endNode = startNode
    }
    let selection = nodeWindow(startNode).getSelection(),
        range = nodeDocument(startNode).createRange(),
        startLength = startNode.nodeValue.length,
        endLength = endNode.nodeValue.length

    if (start > startLength) {
        start = startLength
    }
    if (end > endLength) {
        end = endLength
    }
    range.setStart(startNode, start)
    range.setEnd(endNode, end)
    selection.removeAllRanges()
    selection.addRange(range)
}

function baseElementSelection(elem, start, end) {
    let length = elem.value.length
    elem.setSelectionRange(
        start < length ? start : length,
        end < length ? end : length
    )
}

function setSelection(node, start, end) {
    let endNode = null

    if (Array.isArray(node)) {
        endNode = node[node.length - 1]
        node = node[0]
    }
    if (node == null) {
        return
    }
    if (start == null || start < 0) {
        start = 0
    }
    if (end == null || end < start) {
        end = start
    }

    let tagName = getTagName(node)
    if (tagName === 'textarea' || tagName === 'input') {
        return baseElementSelection(node, start, end)
    }

    if (isRange(node)) {
        start = node.startOffset
        end = node.endOffset
        endNode = node.endContainer
        node = node.startContainer
    }
    if (!isNode(node)) {
        node = childWithContent(node)
    }
    if (endNode != null && !isNode(endNode)) {
        endNode = childWithContent(endNode)
    }
    return baseNodeSelection(node, endNode, start, end)
}

export default setSelection
