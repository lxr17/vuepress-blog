# 第七十五周ARTS总结
## Algorithm
- [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)
> 2ms | 10.48% Run time  
> 38.5MB | 79.66% Memory
```java
public boolean isValidBST(TreeNode root) {
    // 思路：利用中序遍历来检查是否按照正确的顺序
    // stack 用来存储遍历过程中树的节点
    Stack<TreeNode> stack = new Stack<>();
    stack.push(root);

    // 注：这里不能用 int ，用 int 会导致 [Integer.MIN_VALUE] 通过不了
    Integer pre = null;

    while (true) {
        if (stack.empty()) {
            return true;
        }

        TreeNode cur = stack.peek();

        if (cur.left != null) {
            stack.push(cur.left);
            cur.left = null;
            continue;
        }

        // 比较当前节点
        if (pre != null && cur.val <= pre) {
            return false;
        } else {
            pre = cur.val;
        }

        stack.pop();
        if (cur.right != null) {
            stack.push(cur.right);
        }
    }
}
```

----
- [Recover Binary Search Tree](https://leetcode.com/problems/recover-binary-search-tree/)
> 3ms | 35.89% Run time  
> 39.3MB | 71.04% Memory
```java
public void recoverTree(TreeNode root) {
    // 思路：一个正常中序遍历的树是正序的：1 2 3 4 5 6 7 8
    // 而交换其中任意两个，会导致 1 2 6 4 5 3 7 8
    // 有两个节点的位置破坏了其正序
    // 如果交换相邻的两个，则 1 2 4 3 5 6 7 8
    // 只有一个节点的位置破坏了其正序
    // 因此重点在于找到破坏其顺序的节点
    TreeNode first = null;
    TreeNode second = null;

    // 遍历过程中的前一个节点
    TreeNode pre = null;

    Stack<TreeNode> stack = new Stack<>();
    stack.push(root);

    // 左树不断入栈
    while (stack.peek().left != null) {
        stack.push(stack.peek().left);
    }

    while (true) {
        if (stack.empty()) {
            break;
        }

        TreeNode cur = stack.peek();

        // 找到了
        if (pre != null && cur.val <= pre.val) {
            if (first == null) {
                first = pre;
                second = cur;
            } else {
                second = cur;
                break;
            }
        }

        // 继续遍历
        pre = cur;
        stack.pop();
        if (cur.right != null) {
            stack.push(cur.right);

            // 左树不断入栈
            while (stack.peek().left != null) {
                stack.push(stack.peek().left);
            }
        }
    }

    if (first != null && second != null) {
        int temp = first.val;
        first.val = second.val;
        second.val = temp;
    }
}
```

## Review
- []()

## Tip
+ 

## Share
暂无内容