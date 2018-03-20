import setSelection from './set-selection'
import selectionRange from './selection-range'
import rangeContent from './range-content'

import isEditable from './is-editable'
import isTextElement from './is-text-element'
import isTextNode from './is-text-node'
import { setValue, getValue } from './node-value'

module.exports = {
    // primary methods
    setSelection,
    selectionRange,
    rangeContent,

    // secondary methods
    isEditable,
    isTextElement,
    isTextNode,
    setValue,
    getValue
}
