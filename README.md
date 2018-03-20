# selection
```javascript
import { selectionRange, rangeContent } from 'selection.min'

const range = selectionRange()
const content = rangeContent(range)

content.forEach(item => ...)
```

### range `Object`

```javascript
collapsed                  // Boolean indicating whether the range's start and end are the same position
commonAncestorContainer    // the deepest node that contains the start and end nodes
startContainer             // the node within which the range starts
startOffset                // a Number representing where in the startContainer the range starts
endContainer               // the node within which the range ends
endOffset                  // a Number representing where in the endContainer the range ends
```

### content `Array of Objects`

### item `Object`

```javascript
node                       // the node in the range
startOffset                // a Number representing where in the node the range starts
endOffset                  // a Number representing where in the node the range ends
text                       // a String value of the node
```

## Methods 
```javascript
// primary methods
.setSelection(node[, start = 0][, end = 0])
.selectionRange([window][, document])
.rangeContent(range)

// secondary methods
.isEditable(node)
.isTextElement(node)
.isTextNode(node)
.setValue(node, string)
.getValue(node)
```

## Browser compatibility
IE9+, Safari, Chrome, Firefox
