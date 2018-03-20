const run = () => {
    const { selectionRange, setSelection } = selection

    let range = selectionRange()
    let container = range.commonAncestorContainer
    let result = setSelection(container, 4, 50)

    debugger
}
