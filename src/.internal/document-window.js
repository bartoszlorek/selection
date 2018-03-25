function documentWindow(doc) {
    return doc.defaultView || doc.parentWindow
}

export default documentWindow
