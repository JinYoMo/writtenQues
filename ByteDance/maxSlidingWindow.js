/**
 * 滑动窗口的最大值
 * 给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
 */
/** 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
    输出: [3,3,5,5,6,7] 
    解释: 

    滑动窗口的位置                  最大值
    ---------------               -----
    [1  3  -1] -3  5  3  6  7      3
    1 [3  -1  -3] 5  3  6  7       3
    1  3 [-1  -3  5] 3  6  7       5
    1  3  -1 [-3  5  3] 6  7       5
    1  3  -1  -3 [5  3  6] 7       6
    1  3  -1  -3  5 [3  6  7]      7
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
 var maxSlidingWindow = function(nums, k) {
    if (k <= 1) {
      return nums
    }
    let result = []
    let dequeue = []
    dequeue.push(nums[0])  // [1]
    let i = 1
    for (; i < k; i++) {
      while(dequeue.length && nums[i] > dequeue[dequeue.length - 1]) {
         dequeue.pop()
      }
      dequeue.push(nums[i])  // [3, -1]
    }
    result.push(dequeue[0])  // [3]
    let len = nums.length
    for (; i < len; i++) {
      while(dequeue.length && nums[i] > dequeue[dequeue.length - 1]) {
         dequeue.pop()
      }
      dequeue.push(nums[i])  // [3, -1, -3]  [5]  [5, 3]  [6] [7]
      if(dequeue[0] === nums[i-k]) {
         dequeue.shift()
      }
      result.push(dequeue[0]) // [3, 3]  [3, 3, 5]  [3, 3, 5, 5]  [3, 3, 5, 5, 6]  [3, 3, 5, 5, 6, 7]
    }
    return result
 };