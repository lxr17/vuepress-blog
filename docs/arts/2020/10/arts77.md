# 第七十七周ARTS总结
## Algorithm
- [Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)
> 0ms | 100.00% Run time  
> 38.2MB | 29.97% Memory
```java
public boolean isSymmetric(TreeNode root) {
    if (root == null || (root.left == null && root.right == null)) {
        return true;
    }

    // 其中一支树为空
    if (root.left == null || root.right == null) {
        return false;
    }

    // 思路：对左右树分别进行广度遍历
    Queue<TreeNode> leftTrees = new LinkedList<>();
    Queue<TreeNode> rightTrees = new LinkedList<>();

    leftTrees.add(root.left);
    rightTrees.add(root.right);

    while (true) {
        TreeNode left = leftTrees.poll();
        TreeNode right = rightTrees.poll();

        if (left == null && right == null) {
            return true;
        }

        // 由于 leftTrees 和 rightTrees 的 size 一致，故此时 left 和 right 均非空
        if (left.val != right.val) {
            return false;
        }

        // 左树的左子树入队，右树的右子树入队
        if (left.left != null || right.right != null) {
            if (left.left == null || right.right == null) {
                return false;
            }

            // 此时 left.left 和 right.right 均非空
            leftTrees.add(left.left);
            rightTrees.add(right.right);
        }

        // 左树的右子树入队，右树的左子树入队
        if (left.right != null || right.left != null) {
            if (left.right == null || right.left == null) {
                return false;
            }

            // 此时 left.right 和 right.left 均非空
            leftTrees.add(left.right);
            rightTrees.add(right.left);
        }
    }
}
```

----
- [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)
> 0ms | 100.00% Run time  
> 39.1MB | 67.17% Memory
```java
public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> ans = new ArrayList<>();
    if (root == null) {
        return ans;
    }

    // 思路：其实就是一道广度遍历题
    // 注意：注意分层，ans 的每一个 item 都是一层里的所有数
    Queue<TreeNode> trees = new LinkedList<>();
    trees.add(root);

    int curCount = 1;
    int nextCount;

    while (!trees.isEmpty()) {
        List<Integer> curLevel = new ArrayList<>();
        nextCount = 0;

        // 遍历当前层
        while (curCount > 0) {
            TreeNode curTree = trees.poll();

            if (curTree.left != null) {
                trees.add(curTree.left);
                nextCount++;
            }

            if (curTree.right != null) {
                trees.add(curTree.right);
                nextCount++;
            }

            curLevel.add(curTree.val);

            curCount--;
        }

        ans.add(curLevel);
        curCount = nextCount;
    }

    return ans;
}
```

## Review
- []()

## Tip
+ 

## Share
暂无内容