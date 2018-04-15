import nodeWindow from './.internal/node-window'
import nodeDocument from './.internal/node-document'
import getTagName from './.internal/get-tag-name'
import getChildBy from './.utils/get-child-by'

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
    start = Math.min(start, startNode.nodeValue.length)
    end = Math.min(end, endNode.nodeValue.length)

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
        Math.min(start, length),
        Math.min(end, length)
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

    if (tagName === 'node') {
        return baseNodeSelection(node, endNode, start, end)
    }

    baseNodeSelection(
        childWithContent(node),
        childWithContent(endNode),
        start,
        end
    )
}

export default setSelection
