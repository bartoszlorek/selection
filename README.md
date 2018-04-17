# selection
```javascript
import { selectionRange, rangeContent } from 'selection'

const range = selectionRange()
const content = rangeContent(range)

content.forEach(item => ...)
```

### range `Object`

```javascript
editable                   // Boolean indicating whether the common ancestor is an editable element
collapsed                  // Boolean indicating whether the range's start and end are the same position
commonAncestorContainer    // the deepest node that contains the start and end nodes
startContainer             // the node within which the range starts
startOffset                // a Number representing where in the startContainer the range starts
endContainer               // the node within which the range ends
endOffset                  // a Number representing where in the endContainer the range ends
```

### content item `Object`

```javascript
node                       // the node in the range
startOffset                // a Number representing where in the node the range starts
endOffset                  // a Number representing where in the node the range ends
text                       // [getter] a String value of the node
selectedText               // [getter|setter] a substring of the text between offsets
```
**Note:** text elements like an `input` or a `textarea` generate a single content item. However, the `contentEditable` or a non-editable elements can produce more than one item. It keeps the structure of document while editing the text.

## Methods 
```javascript
// from a single Element/Node, Array of them or Range
.setSelection(node [, start = 0][, end = 0])
.setSelection(nodes[, start = 0][, end = 0])
.setSelection(Range)

.selectionRange([document])
.rangeContent(range)
```

## Examples 
```javascript
import { selectionRange, rangeContent } from 'selection'

const range = selectionRange()
const content = rangeContent(range)

// get selected text
let text = content.reduce((value, item) => value + item.selectedText, '')

// change selected text
content.forEach(item => item.selectedText = item.selectedText.toUpperCase())
```

## Browser compatibility
IE9+, Firefox, Chrome, Safari, Opera
