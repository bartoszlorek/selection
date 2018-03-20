function getCommonAncestor(start, end) {
    if (start === end) {
        return start
    }
    let parentStart = start.parentElement || start.parentNode
    if (parentStart.contains(end)) {
        return parentStart
    }
    let parentEnd = end.parentElement || end.parentNode
    if (parentEnd.contains(start)) {
        return parentEnd
    }
    return getCommonAncestor(
        parentStart,
        parentEnd
    )
}

export default getCommonAncestor
