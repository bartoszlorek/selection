import { nextNode, prevNode } from './node-sibling'
import isTextNode from '../.utils/is-text-node'
import createRange from './create-range'

function rangeTrim(range) {
    let {
        startContainer,
        startOffset,
        endContainer,
        endOffset
    } = range

    if (!isTextNode(startContainer)) {
        startContainer = nextNode(startContainer, 3)
        startOffset = 0
    }
    if (!isTextNode(endContainer)) {
        endContainer = prevNode(endContainer, 3) || startContainer
        endOffset = endContainer.nodeValue.length
    }

    return createRange({
        startContainer,
        startOffset,
        endContainer,
        endOffset
    })
}

export default rangeTrim
