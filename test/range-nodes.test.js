import rangeNodes from '../src/.internal/range-nodes'

document.body.innerHTML =
    '<p id="first">the quick brown</p>' +
    '<p id="second">fox jumps over</p>' +
    '<p id="third">the lazy dog</p>'

const first = document.getElementById('first')
const second = document.getElementById('second')
const third = document.getElementById('third')

describe('handle falsy', () => {
    it('should return an empty array', () => {
        expect(rangeNodes()).toEqual([])
        expect(rangeNodes(null)).toEqual([])
    })
})

describe('nodes in selection range', () => {
    it('should handle short range', () => {
        const range = {
            startContainer: first.firstChild,
            endContainer: second.firstChild
        }
        expect(rangeNodes(range)).toEqual([
            first.firstChild,
            second.firstChild
        ])
    })

    it('should handle long range', () => {
        const range = {
            startContainer: first.firstChild,
            endContainer: third.firstChild
        }
        expect(rangeNodes(range)).toEqual([
            first.firstChild,
            second.firstChild,
            third.firstChild
        ])
    })
})
