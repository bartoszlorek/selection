import isEditableContent from './is-editable-content'
import isTextElement from './is-text-element'

function isEditable(node) {
    return isEditableContent(node) || isTextElement(node)
}

export default isEditable
