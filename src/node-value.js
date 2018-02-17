import isTextNode from './is-text-node'
import isTextElement from './is-text-element'

function setNodeValue(node, value) {
    if (typeof value !== 'string') {
        return
    }
    if (isTextNode(node)) {
        node.nodeValue = value
    }
    if (isTextElement(node)) {
        node.value = value
    }
    node.textContent = value
}

function getNodeValue(node) {
    if (isTextNode(node)) {
        return node.nodeValue
    }
    if (isTextElement(node)) {
        return node.value
    }
    return node.textContent
}

export { setNodeValue, getNodeValue }
