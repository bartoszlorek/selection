import getWindow from './.internal/get-window'
import getDocument from './.internal/get-document'
import getTagName from './.internal/get-tag-name'

function setSelection(node, start = 0, end = -1) {
    if (node == null) {
        return false
    }
    if (end < start) {
        end = start
    }

    let tagName = getTagName(node)
    if (tagName === 'textarea' || tagName === 'input') {
        node.setSelectionRange(start, end)
        return true
    }

    if (tagName === 'node') {
        let selection = getWindow(node).getSelection(),
            range = getDocument(node).createRange(),
            length = node.nodeValue.length

        if (end > length) {
            end = length
            if (start > length) {
                start = length
            }
        }
        range.setStart(node, start)
        range.setEnd(node, end)
        selection.removeAllRanges()
        selection.addRange(range)
        return true
    }

    return setSelection(node.firstChild, start, end)
}

export default setSelection
