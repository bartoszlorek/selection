import { getValue, setValue } from './node-value'
import spliceString from '../.utils/splice-string'

const proto = {
    get text() {
        return getValue(this.node)
    },
    get selectedText() {
        return this.text.substring(
            this.startOffset,
            this.endOffset
        )
    },
    set selectedText(value) {
        value = String(value)
        setValue(this.node, spliceString(
            this.text,
            this.startOffset,
            this.endOffset,
            value
        ))
        this.endOffset = this.startOffset
            + value.length
    }
}

function createContentItem(spec) {
    if (spec == null) {
        return null
    }
    let {
        node,
        startOffset,
        endOffset
    } = spec

    let item = Object.create(proto)

    item.node = node
    item.startOffset = startOffset
    item.endOffset = endOffset
    return item
}

export default createContentItem
