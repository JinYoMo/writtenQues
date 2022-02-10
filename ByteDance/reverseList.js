/**
 * 反转链表
 * 定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。
 */
/**
 * 示例
 * 输入: 1->2->3->4->5->NULL
   输出: 5->4->3->2->1->NULL
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 方法一： 迭代法
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
   let prev = null
   let cur = head
   while (cur) {
     // 先保存当前节点的下一个节点
     const next = cur.next
     cur.next = prev
     prev = cur
     cur = next
   }
   return prev
};
/**
 * 方法二： 递归法
 */
var reverseList = function(head) {
   if(head === null || head.next === null) {
       return head
   }
   const newHead = reverseList(head.next)
   // 能够第一次执行这里的节点为 倒数第二个 节点
   head.next.next = head
   // head 的 next 需要在下一次递归执行时设置，当前设置为 null 不影响
   // 可以让最后一次的 next 设置为 null
   head.next = null
   return newHead
};