function getTagName(elem) {
    if (elem == null) {
        return ''
    }
    if (elem.tagName !== undefined) {
        return elem.tagName.toLowerCase()
    }
    return 'node'
}

export default getTagName
