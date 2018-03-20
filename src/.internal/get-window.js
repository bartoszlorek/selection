import getDocument from './get-document'

function getWindow(element) {
    if (element == null) {
        return null
    }
    let doc = getDocument(element)
    return (
        doc.defaultView ||
        doc.parentWindow
    )
}

export default getWindow
