/**
 *  第350题：两个数组的交集
    给定两个数组，编写一个函数来计算它们的交集。

    示例 1:
    输入: nums1 = [1,2,2,1], nums2 = [2,2]
    输出: [2,2]

    示例 2:
    输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
    输出: [4,9]

    说明：
    输出结果中每个元素出现的次数，应与元素在两个数组中出现的次数一致。
    我们可以不考虑输出结果的顺序。

    进阶:
    如果给定的数组已经排好序呢？将如何优化你的算法呢？

    思路：设定两个为0的指针，比较两个指针的元素是否相等。如果指针的元素相等，我们将两个指针一
    起向后移动，并且将相等的元素放入空白数组
 */

// 首先拿到这道题，我们基本马上可以想到，此题可以看成是一道传统的映射题（map映射），为
// 什么可以这样看呢，因为我们需找出两个数组的交集元素，同时应与两个数组中出现的次数一
// 致。这样就导致了我们需要知道每个值出现的次数，所以映射关系就成了<元素,出现次数>。剩下
// 的就是顺利成章的解题。

function intersect(nums1, nums2) {
    let m0 = 
}