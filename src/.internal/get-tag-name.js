function getTagName(elem) {
    return (elem && elem.tagName && elem.tagName.toLowerCase()) || ''
}

export default getTagName
