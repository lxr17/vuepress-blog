# 第八十三周ARTS总结
## Algorithm
- [Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/)
> 1ms | 53.98% Run time  
> 38.6MB | 97.47% Memory
```java
public boolean isBalanced(TreeNode root) {
    return isBalancedHelper(root)[0] == 1;
}

/**
 * 判断树是否为平衡树，并找出树的最大深度
 *
 * @param root
 * @return int[0]表示该树是否为平衡树，int[1]表示该树的最大深度
 */
private int[] isBalancedHelper(TreeNode root) {
    if (root == null) {
        return new int[]{1, 0};
    }

    int isBalanced;
    int depth = 1;

    int[] left = isBalancedHelper(root.left);
    int[] right = isBalancedHelper(root.right);

    if (left[0] == 1 && right[0] == 1 && Math.abs(left[1] - right[1]) <= 1) {
        isBalanced = 1;
    } else {
        isBalanced = 0;
    }

    depth += Math.max(left[1], right[1]);

    return new int[]{isBalanced, depth};
}
```

## Review
- []()

## Tip
+ 

## Share
暂无内容