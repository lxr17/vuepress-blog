# 第七十二周ARTS总结
## Algorithm
- [Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)
> 0ms | 100.00% Run time  
> 37.3MB | 47.05% Memory
```java
// 递归方式实现
public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> ans = new ArrayList<>();

    if (root == null) {
        return ans;
    }

    if (root.left != null) {
        inorderRecursive(root.left, ans);
    }

    ans.add(root.val);

    if (root.right != null) {
        inorderRecursive(root.right, ans);
    }

    return ans;
}

private void inorderRecursive(TreeNode treeNode, List<Integer> ans) {
    if (treeNode.left != null) {
        inorderRecursive(treeNode.left, ans);
    }

    ans.add(treeNode.val);

    if (treeNode.right != null) {
        inorderRecursive(treeNode.right, ans);
    }
}

// 迭代方式实现
public List<Integer> inorderTraversal2(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        LinkedList<TreeNode> stack = new LinkedList<>();
        stack.push(root);

        while (stack.peek() != null) {
        TreeNode cur = stack.peek();

        // 左树入栈
        if (cur.left != null) {
        stack.push(cur.left);
        cur.left = null;
        continue;
        }

        ans.add(cur.val);
        stack.pop();

        // 右树入栈
        if (cur.right != null) {
        stack.push(cur.right);
        }
        }

        return ans;
}

public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode() {
    }

    TreeNode(int val) {
        this.val = val;
    }

    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
```

## Review
- []()

## Tip
+ 

## Share
暂无内容