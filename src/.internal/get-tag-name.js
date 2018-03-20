function getTagName(element) {
    return (element.tagName && element.tagName.toLowerCase()) || 'node'
}

export default getTagName
