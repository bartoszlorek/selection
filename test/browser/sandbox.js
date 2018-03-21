function run() {
    var range = selection.selectionRange()
    console.log(range)

    if (range === null) {
        return
    }
    var container = range.commonAncestorContainer
    //var result = selection.setSelection(container, 4, 50)
    console.log(container)

    return

    if (!range.editable) {
        return
    }

    var content = selection.rangeContent(range)
    console.log(content)

    // get selected text
    var text = content.reduce((value, item) => {
        var { text, startOffset, endOffset } = item
        return value + text.slice(startOffset, endOffset)
    }, '')

    console.log(text)

    // change selected text
    var { setValue } = selection
    content.forEach(item => {
        var { node, text, startOffset, endOffset } = item

        var value =
            text.substring(0, startOffset) +
            text.slice(startOffset, endOffset).toUpperCase() +
            text.substring(endOffset)

        setValue(node, value)
    })
}

setTimeout(run, 2000)
