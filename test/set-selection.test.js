import setSelection from '../src/set-selection'
import createRange from '../src/.internal/create-range'

const createGlobals = global => {
    const addRange = jest.fn()
    const range = {
        setStart: jest.fn(),
        setEnd: jest.fn()
    }
    global.document.createRange = () => range
    global.getSelection = () => ({
        removeAllRanges: () => {},
        addRange
    })
    return {
        addRange,
        range
    }
}

describe('handle falsy', () => {
    it('should handle undefined nodes', () => {
        expect(() => {
            setSelection()
            setSelection(null)
            setSelection([])
        }).not.toThrow()
    })
})

describe('single node', () => {
    it('should select input', () => {
        document.body.innerHTML =
            '<input type="text" id="input" value="the quick brown fox">'

        let input = document.getElementById('input')
        setSelection(input, 4, 15)

        expect(input.selectionStart).toEqual(4)
        expect(input.selectionEnd).toEqual(15)
    })

    it('should select textarea', () => {
        document.body.innerHTML =
            '<textarea id="textarea">the quick brown fox</textarea>'

        let textarea = document.getElementById('textarea')
        setSelection(textarea, 4, 15)

        expect(textarea.selectionStart).toEqual(4)
        expect(textarea.selectionEnd).toEqual(15)
    })

    it('should select single element', () => {
        const { addRange, range } = createGlobals(global)

        document.body.innerHTML = '<p id="element">the quick brown fox</p>'
        let elem = document.getElementById('element')

        setSelection(element, 4, 15)
        expect(range.setStart).lastCalledWith(elem.firstChild, 4)
        expect(range.setEnd).lastCalledWith(elem.firstChild, 15)
        expect(addRange).lastCalledWith(range)
    })
})

describe('array of nodes', () => {
    it('should select single element from array', () => {
        const { addRange, range } = createGlobals(global)

        document.body.innerHTML = '<p id="element">the quick brown fox</p>'
        let elem = document.getElementById('element')

        setSelection([elem], 4, 15)
        expect(range.setStart).lastCalledWith(elem.firstChild, 4)
        expect(range.setEnd).lastCalledWith(elem.firstChild, 15)
        expect(addRange).lastCalledWith(range)
    })

    it('should select multiple elements from array', () => {
        const { addRange, range } = createGlobals(global)

        document.body.innerHTML =
            '<p id="element-a">the quick brown fox</p>' +
            '<p id="element-b">jumps over the lazy dog</p>'
        let elemA = document.getElementById('element-a'),
            elemB = document.getElementById('element-b')

        setSelection([elemA, elemB], 4, 15)
        expect(range.setStart).lastCalledWith(elemA.firstChild, 4)
        expect(range.setEnd).lastCalledWith(elemB.firstChild, 15)
        expect(addRange).lastCalledWith(range)
    })
})

describe('selection range', () => {
    it('should select text elements from range', () => {
        const { addRange, range } = createGlobals(global)

        document.body.innerHTML =
            '<input type="text" id="input" value="the quick brown fox">'

        let input = document.getElementById('input')

        let rangeObject = createRange({
            startContainer: input,
            endContainer: input,
            startOffset: 4,
            endOffset: 15
        })

        setSelection(rangeObject)
        expect(input.selectionStart).toEqual(4)
        expect(input.selectionEnd).toEqual(15)
    })

    it('should select single node from range', () => {
        const { addRange, range } = createGlobals(global)

        document.body.innerHTML = '<p id="element">the quick brown fox</p>'

        let element = document.getElementById('element'),
            elementNode = element.firstChild

        let rangeObject = createRange({
            startContainer: elementNode,
            endContainer: elementNode,
            startOffset: 4,
            endOffset: 15
        })

        setSelection(rangeObject)
        expect(range.setStart).lastCalledWith(elementNode, 4)
        expect(range.setEnd).lastCalledWith(elementNode, 15)
        expect(addRange).lastCalledWith(range)
    })

    it('should select multiple nodes from range', () => {
        const { addRange, range } = createGlobals(global)

        document.body.innerHTML =
            '<p id="element-a">the quick brown fox</p>' +
            '<p id="element-b">jumps over the lazy dog</p>'

        let rangeObject = createRange({
            startContainer: document.getElementById('element-a'),
            endContainer: document.getElementById('element-b'),
            startOffset: 4,
            endOffset: 15
        })
        let startNode = rangeObject.startContainer.firstChild,
            endNode = rangeObject.endContainer.firstChild

        setSelection(rangeObject)
        expect(range.setStart).lastCalledWith(startNode, 4)
        expect(range.setEnd).lastCalledWith(endNode, 15)
        expect(addRange).lastCalledWith(range)
    })
})
