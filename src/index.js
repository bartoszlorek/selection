import setSelection from './set-selection'
import selectionRange from './selection-range'
import rangeContent from './range-content'

import isEditable from './is-editable'
import isEditableContent from './is-editable-content'
import isTextElement from './is-text-element'
import isTextNode from './is-text-node'
import { setValue, getValue } from './node-value'

module.exports = {
    // core methods
    setSelection,
    selectionRange,
    rangeContent,

    // helpers
    isEditable,
    isEditableContent,
    isTextElement,
    isTextNode,
    setValue,
    getValue
}
