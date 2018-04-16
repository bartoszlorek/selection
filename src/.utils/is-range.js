function isRange(range) {
    return !!(range && range.commonAncestorContainer)
}

export default isRange
