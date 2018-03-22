import getCommonAncestor from './get-common-ancestor'
import isEditable from '../.utils/is-editable'

function createRange(spec) {
    if (spec == null) {
        return null
    }
    let {
        collapsed,
        commonAncestorContainer,
        startContainer,
        startOffset,
        endContainer,
        endOffset
    } = spec

    if (collapsed === undefined) {
        collapsed = startContainer === endContainer
            && startOffset === endOffset
    }

    if (commonAncestorContainer === undefined) {
        commonAncestorContainer = getCommonAncestor(
            startContainer,
            endContainer
        )
    }

    return {
        editable: isEditable(commonAncestorContainer),
        collapsed,
        commonAncestorContainer,
        startContainer,
        startOffset,
        endContainer,
        endOffset
    }
}

export default createRange
