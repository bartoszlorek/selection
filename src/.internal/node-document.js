function nodeDocument(node) {
    return node.ownerDocument || document
}

export default nodeDocument
