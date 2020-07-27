/**
This problem was asked by Google.

Given the root to a binary tree, implement serialize(root), which serializes the tree into a string, and deserialize(s),
which deserializes the string back into the tree.

For example, given the following Node class

class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
The following test should pass:

node = Node('root', Node('left', Node('left.left')), Node('right'))
assert deserialize(serialize(node)).left.left.val == 'left.left'
 */

// We can approach this problem by first figuring out what we would like the serialized tree to look like.
// Ideally, it would contain the minimum information required to encode all the necessary information about the binary tree.
// One possible encoding might be to borrow S-expressions from Lisp.
// The tree Node(1, Node(2), Node(3)) would then look like '(1 (2 () ()) (3 () ()))', where the empty brackets denote nulls.

// To minimize data over the hypothetical wire, we could go a step further and prune out some unnecessary brackets.
// We could also replace the 2-character '()' with '#'.
// We can then infer leaf nodes by their form 'val # #' and thus get the structure of the tree that way. Then our tree would look like 1 2 # # 3 # #.
const assert = require('assert');

class Node {
    constructor(val, left=null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

}

function serialize(root) {
    if (!root) {
        return "#";
    }
    return String(root.val)+','+serialize(root.left)+','+serialize(root.right);
}

function deserialize(data) {
    function helper(values) {
        const val = values.next().value;
        if (val === "#") {
            return null;
        }
        const node = new Node(val);
        node.left = helper(values);
        node.right = helper(values);
        return node;
    }
    function* nodeIterator(start = 0, end = Infinity, step = 1) {
        let values = [];
        let cur = "";
        for (let i = start; i < end; i += step) {
            if (data[i] !== ',') {
                cur += data[i];
                if (i === end - 1) {
                    values.push(cur);
                }
            } else {
                values.push(cur);
                cur = "";
            }
        }
        for (let v of values) {
            yield v;
        }
    }
    const values = nodeIterator(0, data.length, 1);
    return helper(values);
}

let node = new Node("root", new Node("left", new Node("left.left")), new Node("right"));
assert.deepEqual(deserialize(serialize(node)).left.left.val, "left.left");