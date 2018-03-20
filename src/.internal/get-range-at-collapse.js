// based on https://gist.github.com/jonathantneal/1347070

function getRangeAtCollapse(range, collapsed) {
    let rangeA = range.duplicate(),
        rangeB = range.duplicate(),
        offset,
        parent,
        node,
        i = -1

    // collapse the rangeA to the start or end of selection
    rangeA.collapse(!!collapsed)
    parent = rangeA.parentElement()

    // then move rangeB to the beginning of parent element
    // and measure distance in characters between two ranges
    rangeB.moveToElementText(parent)
    rangeB.setEndPoint('EndToStart', rangeA)
    offset = rangeB.text.replace(/\r\n/gm, '\n').length

    // get the offset between the textnodes
    while (offset > -1 && i + 1 < parent.childNodes.length) {
        offset -= (
            parent.childNodes[++i].nodeValue ||
            parent.childNodes[i].innerHTML
        ).length
    }

    node = parent.childNodes[i] || parent
    return {
        node: node,
        offset: String(
            node.nodeValue ||
            node.innerHTML ||
            node.value ||
            ''
        ).length + offset
    }
}

export default getRangeAtCollapse
