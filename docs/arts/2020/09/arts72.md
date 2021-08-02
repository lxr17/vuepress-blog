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
+ **SNAPSHOT**的用途：假如**A模块**依赖了**SNAPSHOT**的**B模块**，则每次编译的时候都会去找最新的版本
+ 算法思想
    + 递归算法
        + 优缺点
            + 优点：实现简单易上手
            + 缺点：递归太深，容易发生栈溢出
        + 适用场景
            + 数据的定义是按递归定义的（菲波那切数列）
            + 问题解法按递归算法实现（回溯）
            + 数据的结构形式是按递归定义的（树的遍历，图的搜索）
    + 分治算法
        + 适用场景
            + 原始问题可以分成多个相似的子问题
            + 子问题可以很简单的求解
            + 原始问题的解是子问题的合并
            + 各个子问题是相互独立的
    + 贪心算法
        + 适用场景
            + 原问题复杂度过高
            + 求全局最优解的数学模型难以建立或计算量过大
            + 没有太大必要一定要求出全局最优解，“比较优”就可以
    + 回溯算法
        + 适用场景：用于解决广度的搜索问题，即从一组可能的解中选择一个满足要求的解
        + 经典案例
            + 深度优先搜索
            + 0-1背包问题
            + 正则表达式匹配
            + 八皇后
            + 数独
            + 全排列
    + **动态规划**
        + 经典案例
            + 爬楼梯问题
            + 背包问题
            + 硬币找零
            + 图的全源最短路径问题
            + 最长公共子序列
    + 枚举算法
+ 卡顿监控
    + `Looper.getMainLooper().setMessageLogging(printer)`
    + **Gradle Plugin** + **ASM**

## Share
暂无内容