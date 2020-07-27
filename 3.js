/**
This problem was asked by Uber.

Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.

For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. If our input was [3, 2, 1], the expected output would be [2, 3, 6].

Follow-up: what if you can't use division?
 */

 
//This problem would be easy with division: an optimal solution could just find the product of all numbers in the array and then divide by each of the numbers.

//Without division, another approach would be to first see that the ith element simply needs the product of numbers before i and the product of numbers after i.
// Then we could multiply those two numbers to get our desired product.

//In order to find the product of numbers before i, we can generate a list of prefix products.
// Specifically, the ith element in the list would be a product of all numbers including i. Similarly, we would generate the list of suffix products.

function products(nums) {
    // Generate prefix products
    let prefix_products = [];
    for (let num of nums) {
        if (prefix_products.length) {
            prefix_products.push(prefix_products[prefix_products.length-1] * num);
        } else {
            prefix_products.push(num);
        }
    }

    // Generate suffix products
    let suffix_products = [];
    let reversed = nums.reverse();
    for (let num of reversed) {
        if (suffix_products.length) {
            suffix_products.push(suffix_products[suffix_products.length-1] * num);
        } else {
            suffix_products.push(num);
        }
    }
    suffix_products = suffix_products.reverse();

    // Generate result
    let result = [];
    for (let i = 0; i < nums.length; i++) {
        if (i === 0) {
            result.push(suffix_products[i + 1]);
        } else if (i === nums.length - 1) {
            result.push(prefix_products[i - 1]);
        } else {
            result.push(prefix_products[i - 1] * suffix_products[i + 1]);
        }
    }
    return result;
}

console.log(products([1, 2, 3, 4, 5]));