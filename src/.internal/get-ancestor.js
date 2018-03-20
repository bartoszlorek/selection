function getAncestor(start, end) {
    if (start === end) {
        return start
    }
    let parentStart = start.parentElement
    if (parentStart.contains(end)) {
        return parentStart
    }
    let parentEnd = end.parentElement
    if (parentEnd.contains(start)) {
        return parentEnd
    }
    return getAncestor(
        parentStart,
        parentEnd
    )
}

export default getAncestor
