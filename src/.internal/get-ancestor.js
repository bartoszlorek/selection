function getAncestor(start, end) {
    if (start === end) {
        return start
    }
    return getAncestor(
        start.parentElement || document.body,
        end.parentElement || document.body
    )
}

export default getAncestor
