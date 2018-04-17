import rangeContent from '../src/range-content'

document.body.innerHTML =
    '<p id="first">the quick brown</p>' +
    '<p id="second">fox jumps over</p>' +
    '<p id="third">the lazy dog</p>'

const first = document.getElementById('first')
const second = document.getElementById('second')
const third = document.getElementById('third')

describe('handle falsy', () => {
    it('should return an empty array', () => {
        expect(rangeContent()).toEqual([])
        expect(rangeContent(null)).toEqual([])
    })
})

describe('content in selection range', () => {
    const content = rangeContent({
        startContainer: first.firstChild,
        endContainer: third.firstChild,
        startOffset: 4,
        endOffset: 8
    })

    it('should return array with 3 items', () => {
        expect(content).toEqual([
            { node: first.firstChild, startOffset: 4, endOffset: 15 },
            { node: second.firstChild, startOffset: 0, endOffset: 14 },
            { node: third.firstChild, startOffset: 0, endOffset: 8 }
        ])
    })

    it('should GET text of nodes in selection', () => {
        expect(content[0].text).toBe('the quick brown')
        expect(content[1].text).toBe('fox jumps over')
        expect(content[2].text).toBe('the lazy dog')
    })

    it('should GET selected text value', () => {
        expect(content[0].selectedText).toBe('quick brown')
        expect(content[1].selectedText).toBe('fox jumps over')
        expect(content[2].selectedText).toBe('the lazy')
    })

    it('should SET selected text value', () => {
        content[0].selectedText = 'QUICK BROWN'
        content[1].selectedText = 'FOX JUMPS OVER'
        content[2].selectedText = 'THE LAZY'

        expect(first.textContent).toBe('the QUICK BROWN')
        expect(second.textContent).toBe('FOX JUMPS OVER')
        expect(third.textContent).toBe('THE LAZY dog')
    })
})
