'use strict';

function isTextElement(node) {
    return !!(node && typeof node.value === 'string');
}

function isTextNode(node) {
    return !!(node && node.nodeType === 3);
}

function getPrototypeBy(predicate) {
    if (predicate == null) {
        predicate = function predicate(object) {
            return Object.getPrototypeOf(object) === null;
        };
    }
    return function (object) {
        while (object !== null) {
            object = Object.getPrototypeOf(object);
            if (predicate(object) === true) {
                return object;
            }
        }
        return null;
    };
}

var setNative = function setNative(property) {
    var getDescriptor = function getDescriptor(element) {
        return Object.getOwnPropertyDescriptor(element, property);
    };
    var protoWithDescriptor = getPrototypeBy(function (element) {
        return getDescriptor(element) !== undefined;
    });

    return function (element, value) {
        var prototype = protoWithDescriptor(element);
        if (prototype == null) {
            return;
        }
        var setter = getDescriptor(prototype).set;
        setter.call(element, value);
    };
};

var setNativeValue = setNative('value');
var setNativeNodeValue = setNative('nodeValue');
var setNativeTextContent = setNative('textContent');

function setValue(node, value) {
    if (node == null || value == null) {
        return;
    }
    if (isTextElement(node)) {
        return setNativeValue(node, value);
    }
    if (isTextNode(node)) {
        return setNativeNodeValue(node, value);
    }
    return setNativeTextContent(node, value);
}

function getValue(node) {
    if (node == null) {
        return '';
    }
    if (isTextElement(node)) {
        return node.value;
    }
    if (isTextNode(node)) {
        return node.nodeValue;
    }
    return node.textContent || '';
}

var nextNode = checkNodeType(getNode('nextSibling'));
var prevNode = checkNodeType(getNode('previousSibling'));

function getNode(direction) {
    return function (node) {
        if (!node) {
            return null;
        }
        if (node.hasChildNodes()) {
            return node.firstChild;
        } else {
            while (node && !node[direction]) {
                node = node.parentNode;
            }
            if (node !== null) {
                node = node[direction];
            }
            return node;
        }
    };
}

function checkNodeType(func) {
    return function (node, type) {
        node = func(node);

        if (typeof type === 'number') {
            while (node && node.nodeType !== type) {
                node = func(node);
            }
        }
        return node;
    };
}

function rangeNodes(range) {
    if (range == null) {
        return [];
    }
    var nodes = [],
        node = range.startContainer,
        endNode = range.endContainer;

    nodes.push(node);
    if (node === endNode) {
        return nodes;
    }

    while (node && node !== endNode) {
        node = nextNode(node);
        if (isTextNode(node)) {
            nodes.push(node);
        }
    }
    return nodes;
}

function spliceString(string, start, end, replacement) {
    var length = string == null ? -1 : string.length;
    if (length < 0) {
        return '';
    }
    if (replacement === undefined && typeof end === 'function') {
        replacement = end;
        end = length;
    }
    start = start == null ? 0 : start;
    end = end === undefined ? length : end;

    if (start < 0) {
        start = -start > length ? 0 : length + start;
    }
    end = end > length ? length : end;
    if (end < 0) {
        end += length;
    }
    if (start > end && start < length) {
        end = [start, start = end][0];
    }
    if (start > length) {
        return string;
    }

    if (typeof replacement === 'function') {
        var value = !length ? '' : string.substring(start, end);
        replacement = replacement(value);
    }
    return string.substring(0, start) + (replacement != null ? replacement : '') + string.substring(end);
}

var proto = {
    get text() {
        return getValue(this.node);
    },
    get selectedText() {
        return this.text.substring(this.startOffset, this.endOffset);
    },
    set selectedText(value) {
        value = String(value);
        setValue(this.node, spliceString(this.text, this.startOffset, this.endOffset, value));
        this.endOffset = this.startOffset + value.length;
    }
};

function createContentItem(spec) {
    if (spec == null) {
        return null;
    }
    var node = spec.node,
        startOffset = spec.startOffset,
        endOffset = spec.endOffset;


    var item = Object.create(proto);

    item.node = node;
    item.startOffset = startOffset;
    item.endOffset = endOffset;
    return item;
}

function rangeContent(range) {
    return rangeNodes(range).map(function (node, index, nodes) {
        var startOffset = range.startOffset,
            endOffset = range.endOffset;


        if (index > 0) {
            startOffset = 0;
        }
        if (index < nodes.length - 1) {
            endOffset = getValue(node).length;
        }
        return createContentItem({
            node: node,
            startOffset: startOffset,
            endOffset: endOffset
        });
    });
}

function documentWindow(doc) {
    return doc.defaultView || doc.parentWindow;
}

function iframeWindow(iframe) {
    return iframe.contentWindow || iframe.contentDocument.defaultView;
}

function iframeDocument(iframe) {
    return iframe.contentDocument || iframe.contentWindow.document;
}

function getTagName(elem) {
    return elem && elem.tagName && elem.tagName.toLowerCase() || '';
}

// based on https://gist.github.com/jonathantneal/1347070

function getRangeAtCollapse(range, collapsed) {
    var rangeA = range.duplicate(),
        rangeB = range.duplicate(),
        offset = void 0,
        parent = void 0,
        node = void 0,
        i = -1;

    // collapse the rangeA to the start or end of selection
    rangeA.collapse(!!collapsed);
    parent = rangeA.parentElement();

    // then move rangeB to the beginning of parent element
    // and measure distance in characters between two ranges
    rangeB.moveToElementText(parent);
    rangeB.setEndPoint('EndToStart', rangeA);
    offset = rangeB.text.replace(/\r\n/gm, '\n').length;

    // get the offset between the textnodes
    while (offset > -1 && i + 1 < parent.childNodes.length) {
        offset -= (parent.childNodes[++i].nodeValue || parent.childNodes[i].innerHTML).length;
    }

    node = parent.childNodes[i] || parent;
    return {
        node: node,
        offset: String(node.nodeValue || node.innerHTML || node.value || '').length + offset
    };
}

function getCommonAncestor(start, end) {
    if (start === end) {
        return start;
    }
    var parentStart = start.parentElement || start.parentNode;
    if (parentStart.contains(end)) {
        return parentStart;
    }
    var parentEnd = end.parentElement || end.parentNode;
    if (parentEnd.contains(start)) {
        return parentEnd;
    }
    return getCommonAncestor(parentStart, parentEnd);
}

function isEditableContent(node) {
    if (node == null) {
        return false;
    }
    if (node.isContentEditable === undefined) {
        node = node.parentElement || node.parentNode;
    }
    return node.isContentEditable;
}

function isEditable(node) {
    return isEditableContent(node) || isTextElement(node);
}

function createRange(spec) {
    if (spec == null) {
        return null;
    }
    var collapsed = spec.collapsed,
        commonAncestorContainer = spec.commonAncestorContainer,
        startContainer = spec.startContainer,
        startOffset = spec.startOffset,
        endContainer = spec.endContainer,
        endOffset = spec.endOffset;


    if (collapsed === undefined) {
        collapsed = startContainer === endContainer && startOffset === endOffset;
    }

    if (commonAncestorContainer === undefined) {
        commonAncestorContainer = getCommonAncestor(startContainer, endContainer);
    }

    return {
        editable: isEditable(commonAncestorContainer),
        collapsed: collapsed,
        commonAncestorContainer: commonAncestorContainer,
        startContainer: startContainer,
        startOffset: startOffset,
        endContainer: endContainer,
        endOffset: endOffset
    };
}

function baseSelectionRange(win, doc) {
    if (win.getSelection !== undefined) {
        var selection = win.getSelection();
        if (selection.rangeCount > 0) {
            return createRange(selection.getRangeAt(0));
        }
    }

    if (doc.selection !== undefined) {
        var range = doc.selection.createRange(),
            rangeStart = getRangeAtCollapse(range, true),
            rangeEnd = getRangeAtCollapse(range, false);

        return createRange({
            commonAncestorContainer: rangeStart.node === rangeEnd.node ? rangeStart.node : range.parentElement(),
            startContainer: rangeStart.node,
            startOffset: rangeStart.offset,
            endContainer: rangeEnd.node,
            endOffset: rangeEnd.offset
        });
    }

    return null;
}

function rangeTrim(range) {
    var startContainer = range.startContainer,
        startOffset = range.startOffset,
        endContainer = range.endContainer,
        endOffset = range.endOffset;


    if (!isTextNode(startContainer)) {
        startContainer = nextNode(startContainer, 3);
        startOffset = 0;
    }
    if (!isTextNode(endContainer)) {
        endContainer = prevNode(endContainer, 3) || startContainer;
        endOffset = endContainer.nodeValue.length;
    }

    return createRange({
        startContainer: startContainer,
        startOffset: startOffset,
        endContainer: endContainer,
        endOffset: endOffset
    });
}

function constructor(win, doc) {
    var element = doc.activeElement;
    if (element == null) {
        return null;
    }

    var tagName = getTagName(element);
    if (tagName === 'textarea' || tagName === 'input') {
        try {
            var selectionStart = element.selectionStart,
                selectionEnd = element.selectionEnd;

            return createRange({
                startContainer: element,
                startOffset: selectionStart,
                endContainer: element,
                endOffset: selectionEnd
            });
        } catch (e) {
            return null;
        }
    }

    if (tagName === 'iframe' || tagName === 'frame') {
        // Same-origin policy
        try {
            return constructor(iframeWindow(element), iframeDocument(element));
        } catch (e) {
            return null;
        }
    }

    var range = baseSelectionRange(win, doc);
    if (range === null) {
        return null;
    }

    if (range.collapsed === false) {
        range = rangeTrim(range);
    }
    return range;
}

function selectionRange() {
    var doc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    return constructor(documentWindow(doc), doc);
}

function nodeDocument(node) {
    return node.ownerDocument || document;
}

function nodeWindow(node) {
    return documentWindow(nodeDocument(node));
}

function getChildBy(predicate) {
    if (typeof predicate !== 'function') {
        throw 'getChildBy requires `predicate` as a Function';
    }
    return function (element) {
        if (element != null) {
            var nodes = element.childNodes;
            for (var i = 0; i < nodes.length; i++) {
                if (predicate(nodes[i]) === true) {
                    return nodes[i];
                }
            }
        }
        return null;
    };
}

function isNode(node) {
    return !!(node && typeof node.nodeValue === 'string');
}

function isRange(range) {
    return !!(range && range.commonAncestorContainer);
}

var limit = function limit(value, max) {
    return value < max ? value : max;
};

var childWithContent = getChildBy(function (e) {
    return e.textContent && e.textContent.trim() !== '';
});
var closestNode = function closestNode(node) {
    return node && (isNode(node) ? node : childWithContent(node));
};

function baseNodeSelection(startNode, endNode, start, end) {
    if (startNode == null) {
        return;
    }
    if (endNode == null) {
        endNode = startNode;
    }
    start = limit(start, startNode.nodeValue.length);
    end = limit(end, endNode.nodeValue.length);

    var selection = nodeWindow(startNode).getSelection(),
        range = nodeDocument(startNode).createRange();

    range.setStart(startNode, start);
    range.setEnd(endNode, end);
    selection.removeAllRanges();
    selection.addRange(range);
}

function baseElementSelection(elem, start, end) {
    var length = elem.value.length;
    elem.setSelectionRange(limit(start, length), limit(end, length));
}

function setSelection(node, start, end) {
    var endNode = null;

    if (Array.isArray(node)) {
        endNode = node[node.length - 1];
        node = node[0];
    }
    if (node == null) {
        return;
    }
    if (start == null || start < 0) {
        start = 0;
    }
    if (end == null || end < start) {
        end = start;
    }

    if (isRange(node)) {
        start = node.startOffset;
        end = node.endOffset;
        endNode = node.endContainer;
        node = node.startContainer;
    }

    var tagName = getTagName(node);
    if (tagName === 'textarea' || tagName === 'input') {
        return baseElementSelection(node, start, end);
    }

    return baseNodeSelection(closestNode(node), closestNode(endNode), start, end);
}

var api = {
    rangeContent: rangeContent,
    selectionRange: selectionRange,
    setSelection: setSelection
};

module.exports = api;
