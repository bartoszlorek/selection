import isTextElement from '../.utils/is-text-element'
import isTextNode from '../.utils/is-text-node'
import {
    setNativeValue,
    setNativeNodeValue,
    setNativeTextContent
} from '../.utils/set-native'

function setValue(node, value) {
    if (node == null || value == null) {
        return
    }
    if (isTextElement(node)) {
        return setNativeValue(node, value)
    }
    if (isTextNode(node)) {
        return setNativeNodeValue(node, value)
    }
    return setNativeTextContent(node, value)
}

function getValue(node) {
    if (node == null) {
        return ''
    }
    if (isTextElement(node)) {
        return node.value
    }
    if (isTextNode(node)) {
        return node.nodeValue
    }
    return node.textContent || ''
}

export {
    setValue,
    getValue
}
