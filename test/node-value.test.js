import { setValue, getValue } from '../src/.internal/node-value'

document.body.innerHTML =
    '<input value="the quick" />' +
    '<textarea>brown fox</textarea>' +
    '<div>jumps over</div>' +
    '<p>the lazy</p>' +
    '<span>dog</span>'

const input = document.querySelector('input')
const textarea = document.querySelector('textarea')
const div = document.querySelector('div')
const p = document.querySelector('p')
const span = document.querySelector('span')

describe('getValue', () => {
    it('should return empty string', () => {
        expect(getValue()).toBe('')
        expect(getValue(null)).toBe('')
    })

    it('should return value of element/node', () => {
        expect(getValue(input)).toBe('the quick')
        expect(getValue(textarea)).toBe('brown fox')
        expect(getValue(div)).toBe('jumps over')
        expect(getValue(p)).toBe('the lazy')
        expect(getValue(span)).toBe('dog')
    })
})

describe('setValue', () => {
    it('should handle falsy node', () => {
        expect(() => {
            setValue(undefined, 'not')
            setValue(null, 'not')
        }).not.toThrow()
    })

    it('should not change with falsy value', () => {
        setValue(input)
        setValue(textarea, null)
        expect(input.value).toBe('the quick')
        expect(textarea.value).toBe('brown fox')
    })

    it('should change value of elements', () => {
        setValue(input, 'THE QUICK')
        setValue(textarea, 'BROWN FOX')
        setValue(div, 'JUMPS OVER')
        setValue(p, 'THE LAZY')
        setValue(span, 'DOG')

        expect(input.value).toBe('THE QUICK')
        expect(textarea.value).toBe('BROWN FOX')
        expect(div.textContent).toBe('JUMPS OVER')
        expect(p.textContent).toBe('THE LAZY')
        expect(span.textContent).toBe('DOG')
    })

    it('should change value of node', () => {
        setValue(div.firstChild, 'JUMPS OVERR')
        setValue(p.firstChild, 'THE LAZYY')
        setValue(span.firstChild, 'DOGGY')

        expect(div.textContent).toBe('JUMPS OVERR')
        expect(p.textContent).toBe('THE LAZYY')
        expect(span.textContent).toBe('DOGGY')
    })
})
