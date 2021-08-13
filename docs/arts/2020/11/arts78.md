# 第七十八周ARTS总结
## Algorithm
- [Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)
> 0ms | 100.00% Run time  
> 39.2MB | 34.28% Memory
```java
public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
    List<List<Integer>> ans = new ArrayList<>();

    if (root == null) {
        return ans;
    }

    // 当前层
    List<TreeNode> curLevel = new ArrayList<>();

    // 下一层
    List<TreeNode> nextLevel = new ArrayList<>();

    // 是否从左往右
    boolean leftToRight = true;

    curLevel.add(root);

    while (true) {
        if (curLevel.size() == 0) {
            break;
        }

        List<Integer> level = new ArrayList<>();

        if (leftToRight) {
            for (int i = curLevel.size() - 1; i >= 0; i--) {
                TreeNode cur = curLevel.get(i);
                level.add(cur.val);

                if (cur.left != null) {
                    nextLevel.add(cur.left);
                }

                if (cur.right != null) {
                    nextLevel.add(cur.right);
                }
            }
        } else {
            for (int i = curLevel.size() - 1; i >= 0; i--) {
                TreeNode cur = curLevel.get(i);
                level.add(cur.val);

                if (cur.right != null) {
                    nextLevel.add(cur.right);
                }

                if (cur.left != null) {
                    nextLevel.add(cur.left);
                }
            }
        }

        ans.add(level);

        leftToRight = !leftToRight;
        curLevel.clear();
        curLevel.addAll(nextLevel);
        nextLevel.clear();
    }

    return ans;
}
```

----
- [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
> 2ms | 14.55% Run time  
> 38.8MB | 78.78% Memory
```java
public int maxDepth(TreeNode root) {
    int depth = 0;

    if (root == null) {
        return depth;
    }

    List<TreeNode> curLevel = new ArrayList<>();
    List<TreeNode> nextLevel = new ArrayList<>();

    curLevel.add(root);

    while (curLevel.size() != 0) {
        depth++;

        for (TreeNode treeNode : curLevel) {
            if (treeNode.left != null) {
                nextLevel.add(treeNode.left);
            }

            if (treeNode.right != null) {
                nextLevel.add(treeNode.right);
            }
        }

        curLevel.clear();
        curLevel.addAll(nextLevel);
        nextLevel.clear();
    }

    return depth;
}
```

## Review
- []()

## Tip
+ 

## Share
暂无内容