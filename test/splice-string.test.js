import spliceString from '../src/.utils/splice-string'

const string = 'quick brown fox'

describe('errors', () => {
    it('should return empty string', () => {
        expect(spliceString()).toBe('')
        expect(spliceString(null)).toBe('')
        expect(spliceString(string)).toBe('')
    })

    it('should return unchanged string', () => {
        expect(spliceString(string, 200)).toBe(string)
        expect(spliceString(string, 5, 5)).toBe(string)
        expect(spliceString(string, 15, 20)).toBe(string)

        const toText = jest.fn(value => 'text')
        expect(spliceString(string, 16, 20, toText)).toBe(string)
        expect(toText.mock.calls.length).toBe(0)
    })
})

describe('start and end', () => {
    it('should replace END with length', () => {
        expect(spliceString(string, 5)).toBe('quick')
    })

    it('should swap START and END', () => {
        expect(spliceString(string, 11, 5)).toBe('quick fox')
        expect(spliceString(string, -4, -10)).toBe('quick fox')
    })

    it('should take START as an offset from the end', () => {
        expect(spliceString(string, -4)).toBe('quick brown')
    })

    it('should take END as an offset from the end', () => {
        expect(spliceString(string, 5, -4)).toBe('quick fox')
    })
})

describe('replacement', () => {
    const toUpperCase = jest.fn(value => value.toUpperCase())
    const toUndefined = jest.fn(value => undefined)

    it('should replace with a string', () => {
        expect(spliceString(string, 6, 11, 'naughty')).toBe('quick naughty fox')
    })

    it('should replace with a function', () => {
        let result = spliceString(string, 6, 11, toUpperCase)
        expect(result).toBe('quick BROWN fox')
        expect(toUpperCase).lastCalledWith('brown')
    })

    it('should handle replacement in place of END', () => {
        let result = spliceString(string, 6, toUpperCase)
        expect(result).toBe('quick BROWN FOX')
        expect(toUpperCase).lastCalledWith('brown fox')
    })

    it('should handle replacement wrong output', () => {
        let result = spliceString(string, 6, toUndefined)
        expect(result).toBe('quick ')
        expect(toUndefined).lastCalledWith('brown fox')
    })
})

describe('insertion', () => {
    it('should insert value at the beginning', () => {
        expect(spliceString(string, 0, 0, 'the ')).toBe('the quick brown fox')
    })

    it('should insert replacement to the empty string', () => {
        expect(spliceString('', 0, 0, 'the')).toBe('the')
    })

    it('should insert function replacement the empty string', () => {
        const toText = jest.fn(value => 'text')
        expect(spliceString('', 0, 0, toText)).toBe('text')
        expect(toText).lastCalledWith('')
    })
})
