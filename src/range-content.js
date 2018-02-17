import rangeNodes from './range-nodes'
import { getNodeValue } from './node-value'

function rangeContent(range) {
    return rangeNodes(range).map((node, index, nodes) => {
        let text = getNodeValue(node),
            startOffset = 0,
            endOffset = text.length

        if (index === 0) {
            startOffset = range.startOffset
        }
        if (index === nodes.length - 1) {
            endOffset = range.endOffset
        }
        return {
            node,
            startOffset,
            endOffset,
            text
        }
    })
}

export default rangeContent
