function isNode(node) {
    return !!(node && typeof node.nodeValue === 'string')
}

export default isNode
