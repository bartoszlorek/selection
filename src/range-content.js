import { getValue } from './.internal/node-value'
import rangeNodes from './.internal/range-nodes'
import createContentItem from './.internal/create-content-item'

function rangeContent(range) {
    return rangeNodes(range).map((node, index, nodes) => {
        let text = getValue(node),
            startOffset = 0,
            endOffset = text.length

        if (index === 0) {
            startOffset = range.startOffset
        }
        if (index === nodes.length - 1) {
            endOffset = range.endOffset
        }
        return createContentItem({
            node,
            startOffset,
            endOffset
        })
    })
}

export default rangeContent
