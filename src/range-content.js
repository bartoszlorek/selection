import { getValue } from './.internal/node-value'
import rangeNodes from './.internal/range-nodes'
import createContentItem from './.internal/create-content-item'

function rangeContent(range) {
    return rangeNodes(range).map((node, index, nodes) => {
        let { startOffset, endOffset } = range

        if (index > 0) {
            startOffset = 0
        }
        if (index < nodes.length - 1) {
            endOffset = getValue(node).length
        }
        return createContentItem({
            node,
            startOffset,
            endOffset
        })
    })
}

export default rangeContent
