import setSelection from '../src/set-selection'

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

describe('set-selection.js', () => {
    it('should handle undefined nodes', () => {
        expect(() => {
            setSelection()
            setSelection(null)
            setSelection([])
        }).not.toThrow()
    })

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

    it('should select single element in range', () => {
        const { addRange, range } = createGlobals(global)

        document.body.innerHTML = '<p id="element">the quick brown fox</p>'
        let elem = document.getElementById('element')

        setSelection([elem], 4, 15)
        expect(range.setStart).lastCalledWith(elem.firstChild, 4)
        expect(range.setEnd).lastCalledWith(elem.firstChild, 15)
        expect(addRange).lastCalledWith(range)
    })

    it('should select range of elements', () => {
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
