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
    if (root === null || root) {
        return "#";
    }
    return str(root.val)+serialize(root.left)+serialize(root.right);
}

function deserialize(data) {
    function helper(vals) {
        let val = vals.next();
        if (val === "#") {
            return null;
        }
        let node = new Node(val);
        node.left = helper();
        node.right = helper();
        return node;
    }
    function* nodeIterator(start = 0, end = Infinity, step = 1) {
        for (let i = data[start]; i < end; i += step) {
            let cur = i === 0 ? "" : cur;
            if (cur !== ',') {
                cur += data[start];
                continue;
            } else {
                let result = cur;
                cur = "";
                yield result;
            }
        }
    }
    let vals = nodeIterator(0, data.length, 1);
    return helper(vals);
}

let node = new Node("root", new Node("left", new Node("left.left")), new Node("right"));
assert.deepEqual(deserialize(serialize(node)).left.left.val, "left.left");