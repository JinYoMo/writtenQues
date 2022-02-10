/**
 * 环路检测
 * 给定一个链表，如果它是有环链表，实现一个算法返回环路的开头节点。若环不存在，请返回 null。
   如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 
   如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。
 */
/**
 * 示例
 * 输入：head = [3,2,0,-4], pos = 1
   输出：tail connects to node index 1
   解释：链表中有一个环，其尾部连接到第二个节点。
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var detectCycle = function(head) {
    if (head === null || head.next === null) {
      return null
    }
    // 声明快慢指针
    let fast = head
    let slow = head
    while (fast) {
      // 慢指针每次移动一位
      slow = slow.next
      // 如果满足条件，说明 fast 为尾部节点，不存在环
      if (fast.next === null) {
        return null
      }
      // 快指针每次移动两位
      fast = fast.next.next
      // 检测是否有环
      if (fast === slow) {
        // slow 和 fast 相遇，说明存在环 找到环的起点位置
        let ptr = head
        while (ptr !== slow) {
          ptr = ptr.next
          slow = slow.next
        }
        // ptr 和 slow 的交点就是环的起始节点
        return ptr
      }
    }
    // while 结束，说明 fast 为null，说明链表没有环
    return null
 };