function run() {
    var range = selection.selectionRange()
    var container = range.commonAncestorContainer
    var result = selection.setSelection(container, 4, 50)

    console.log(range)
}

setTimeout(run, 2000)
