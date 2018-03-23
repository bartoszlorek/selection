function getChildBy(predicate) {
    if (typeof predicate !== 'function') {
        throw 'getChildBy requires `predicate` as a Function'
    }
    return element => {
        if (element != null) {
            let nodes = element.childNodes
            for (let i = 0; i < nodes.length; i++) {
                if (predicate(nodes[i]) === true) {
                    return nodes[i]
                }
            }
        }
        return null
    }
}

export default getChildBy
