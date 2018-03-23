function run() {
    var range = selection.selectionRange()
    console.log(range)

    if (range === null) {
        return
    }
    var container = range.commonAncestorContainer
    var result = selection.setSelection(container, 5, 10)
    //console.log(container)

    if (!range.editable) {
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
}

setTimeout(run, 2000)
