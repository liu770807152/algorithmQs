/**
 关于generator 
 */
function* gen(x){
    var y = yield x + 2;
    return y;
}
  
var g = gen(1);
console.log(g.next()) // { value: 3, done: false }
/* 2被赋给上一条yield语句的左值，即y */
console.log(g.next(2)) // { value: 2, done: true }

let obj = {}
function* gen() {
    yield 4
    yield 5
    yield 6
}
obj[Symbol.iterator] = gen
for(let value of obj) {
console.log(value)
}
// 4
// 5
// 6
console.log([...obj])    // [4, 5, 6]