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
+ 如果某个`View`的`fitsSystemWindows`设为`true`，那么该`View`的`padding`属性将由系统设置，用户在布局文件中设置的`padding`会被忽略。系统会为该`View`设置一个`paddingTop`，值为`statusbar`的高度
+ 可通过`setOnApplyWindowInsetsListener`来对`fitsSystemWindows`个性化
+ **SNAPSHOT**的用途：假如**A模块**依赖了**SNAPSHOT**的B模块，则每次编译的时候都会去找最新的版本

## Share
暂无内容