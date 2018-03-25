import documentWindow from './document-window'
import nodeDocument from './node-document'

function nodeWindow(node) {
    return documentWindow(nodeDocument(node))
}

export default nodeWindow
