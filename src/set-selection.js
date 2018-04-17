import nodeWindow from './.internal/node-window'
import nodeDocument from './.internal/node-document'
import getTagName from './.internal/get-tag-name'
import getChildBy from './.utils/get-child-by'
import isNode from './.utils/is-node'
import isRange from './.utils/is-range'

const limit = (value, max) => (value < max ? value : max)

const childWithContent = getChildBy(
    e => e.textContent && e.textContent.trim() !== ''
)
const closestNode = node => {
    return node && (isNode(node) ? node : childWithContent(node))
}

function baseNodeSelection(startNode, endNode, start, end) {
    if (startNode == null) {
        return
    }
    if (endNode == null) {
        endNode = startNode
    }
    start = limit(start, startNode.nodeValue.length)
    end = limit(end, endNode.nodeValue.length)

    let selection = nodeWindow(startNode).getSelection(),
        range = nodeDocument(startNode).createRange()

    range.setStart(startNode, start)
    range.setEnd(endNode, end)
    selection.removeAllRanges()
    selection.addRange(range)
}

function baseElementSelection(elem, start, end) {
    let length = elem.value.length
    elem.setSelectionRange(
        limit(start, length),
        limit(end, length)
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
    return baseNodeSelection(
        closestNode(node),
        closestNode(endNode),
        start,
        end
    )
}

export default setSelection
