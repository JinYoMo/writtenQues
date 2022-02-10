/**
 * 二叉树的前序遍历
 * 给你二叉树的根节点 root ，返回它节点值的 前序 遍历。
 */
/**
 * 示例1
 * 输入：root = [1,null,2,3]
   输出：[1,2,3]
 */
/**
 * 示例2
 * 输入：root = []
   输出：[]
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 方法一：迭代法
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 var preorderTraversal = function(root) {
    const res = []
    const stk = []
    while (root || stk.length) {
       while(root) {
         // 右子节点入栈
         stk.push(root.right)
         // 记录根节点
         res.push(root.val)
         // 下一步处理左子节点
         root = root.left
       }
       // 左子树处理完毕，将 stk 出栈，处理右子树
       root = stk.pop()
    }
    return res
 };
 /**
 * 方法一：递归法
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 var preorderTraversal = function(root) {
    const res = []
    // 设置函数用于进行递归遍历
    const preorder = (root) => {
      // 当前节点为空时，无需进行递归
      if (!root) {
         return
      }
      // 记录根节点值
      res.push(root.val)
      // 前序遍历左子树
      preorder(root.left)
      // 前序遍历右子树
      preorder(root.right)
    }
    preorder(root)
    return res
 };