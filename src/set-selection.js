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
            range = nodeDocument(node).createRange(),
            length = node.nodeValue.length

        range.setStart(node, Math.min(start, length))
        range.setEnd(node, Math.min(end, length))
        selection.removeAllRanges()
        selection.addRange(range)
        return true
    }

    return setSelection(
        childWithContent(node),
        start,
        end
    )
}

export default setSelection
