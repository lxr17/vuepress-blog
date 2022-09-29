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
- [How to prevent hackers from reverse engineering your Android apps](https://medium.com/proandroiddev/how-to-prevent-hackers-from-reverse-engineering-your-android-apps-2981661ab1c2)

## Tip
+ 使用`WakeLock`加上**前台服务**能够有效地防止APP被杀死
+ 系统自带控件`AdapterViewFlipper`可以实现广告轮播效果
+ **dp值**可以理解为物理距离
+ 可以通过实现`RecyclerView#setItemAnimator`方法，并设置`canReuseUpdatedViewHolder`返回值为`true`来解决`notifyItemChanged`会导致布局跳动的问题（本质原因是**RecyclerView**为了做动画对同一个**item**的更改会创建两个**ViewHolder**）
+ 可通过`Magnifier`实现放大镜效果

## Share
暂无内容