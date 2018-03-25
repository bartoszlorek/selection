function run() {
    var range = selection.selectionRange()
    console.log(range)

    if (range === null || !range.editable) {
        return
    }
    var content = selection.rangeContent(range)
    console.log(content)

    // get selected text
    var text = content.reduce(function(value, item) {
        return value + item.selectedText
    }, '')
    console.log(text)

    // change selected text
    content.forEach(function(item) {
        item.selectedText = item.selectedText.toUpperCase()
    })

    // reselection
    var container = range.commonAncestorContainer
    selection.setSelection(container,
        range.startOffset,
        range.endOffset
    )
}

setTimeout(run, 2000)
