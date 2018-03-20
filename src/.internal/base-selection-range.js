import getRangeAtCollapse from './get-range-at-collapse'

function baseSelectionRange(win, doc) {
    if (win.getSelection !== undefined) {
        let selection = win.getSelection()
        if (selection.rangeCount > 0) {
            let range = selection.getRangeAt(0)

            return {
                commonAncestorContainer: range.commonAncestorContainer,
                collapsed: range.collapsed,
                startContainer: range.startContainer,
                startOffset: range.startOffset,
                endContainer: range.endContainer,
                endOffset: range.endOffset
            }
        }
    }

    if (doc.selection !== undefined) {
        let range = doc.selection.createRange(),
            rangeStart = getRangeAtCollapse(range, true),
            rangeEnd = getRangeAtCollapse(range, false)

        return {
            commonAncestorContainer: (
                rangeStart.node === rangeEnd.node
                    ? rangeStart.node
                    : range.parentElement()
            ),
            collapsed: (
                rangeStart.node === rangeEnd.node &&
                rangeStart.offset === rangeEnd.offset
            ),
            startContainer: rangeStart.node,
            startOffset: rangeStart.offset,
            endContainer: rangeEnd.node,
            endOffset: rangeEnd.offset
        }
    }

    return null
}

export default baseSelectionRange
