import { nextNode, prevNode } from '../node-sibling'
import isTextNode from '../is-text-node'
import getAncestor from './get-ancestor'

function trimToTextNodes(range) {
    let { startContainer, startOffset, endContainer, endOffset } = range

    if (!isTextNode(startContainer)) {
        startContainer = nextNode(startContainer, 3)
        startOffset = 0
    }
    if (!isTextNode(endContainer)) {
        endContainer = prevNode(endContainer, 3) || startContainer
        endOffset = endContainer.nodeValue.length
    }
    
    return {
        commonAncestorContainer: getAncestor(
            startContainer,
            endContainer
        ),
        collapsed: startContainer === endContainer
                && startOffset === endOffset,
        startContainer,
        startOffset,
        endContainer,
        endOffset
    }
}

export default trimToTextNodes
