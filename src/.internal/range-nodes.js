import { nextNode } from './node-sibling'
import isTextNode from '../.utils/is-text-node'

function rangeNodes(range) {
    if (range == null) {
        return []
    }
    let nodes = [],
        node = range.startContainer,
        endNode = range.endContainer

    nodes.push(node)
    if (node === endNode) {
        return nodes
    }

    while (node && node !== endNode) {
        node = nextNode(node)
        if (isTextNode(node)) {
            nodes.push(node)
        }
    }
    return nodes
}

export default rangeNodes
