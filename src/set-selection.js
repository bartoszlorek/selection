import nodeWindow from './.internal/node-window'
import nodeDocument from './.internal/node-document'
import getTagName from './.internal/get-tag-name'
import getChildBy from './.utils/get-child-by'

const childWithContent = getChildBy(
    e => e.textContent && e.textContent.trim() !== ''
)

function setSelection(node, start, end) {
    if (node == null) {
        return false
    }
    if (start == null || start < 0) {
        start = 0
    }
    if (end == null || end < start) {
        end = start
    }

    let endNode = node
    if (Array.isArray(node)) {
        endNode = node[node.length - 1]
        node = node[0]
        if (node == null || endNode == null) {
            return false
        }
    }

    let tagName = getTagName(node)
    if (tagName === 'textarea' || tagName === 'input') {
        let length = node.value.length
        node.setSelectionRange(
            Math.min(start, length),
            Math.min(end, length)
        )
        return true
    }

    if (tagName === 'node') {
        let selection = nodeWindow(node).getSelection(),
            range = nodeDocument(node).createRange()

        range.setStart(node, Math.min(start, node.nodeValue.length))
        range.setEnd(endNode, Math.min(end, endNode.nodeValue.length))
        selection.removeAllRanges()
        selection.addRange(range)
        return true
    }

    node = childWithContent(node)
    endNode = endNode !== node ? childWithContent(endNode) : node
    return setSelection([node, endNode], start, end)
}

export default setSelection
