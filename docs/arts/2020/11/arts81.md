# 第八十一周ARTS总结
## Algorithm
- [Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/)
> 0ms | 100.00% Run time  
> 38.5MB | 90.74% Memory
```java
public TreeNode sortedArrayToBST(int[] nums) {
    // 思路：递归
    return sortedArrayToBST(nums, 0, nums.length - 1);
}

/**
 * 生成[startIndex, endIndex]的子树
 *
 * @param nums
 * @param startIndex
 * @param endIndex
 * @return
 */
private TreeNode sortedArrayToBST(int[] nums, int startIndex, int endIndex) {
    int middleIndex = (startIndex + endIndex) / 2;

    TreeNode curTree = new TreeNode(nums[middleIndex]);

    if (startIndex < middleIndex) {
        curTree.left = sortedArrayToBST(nums, startIndex, middleIndex - 1);
    }

    if (endIndex > middleIndex) {
        curTree.right = sortedArrayToBST(nums, middleIndex + 1, endIndex);
    }

    return curTree;
}
```

----
> 1ms | 5.92% Run time  
> 39MB | 27.20% Memory
```java
public TreeNode sortedArrayToBST2(int[] nums) {
    // 思路：迭代
    Queue<TreeHelper> level = new LinkedList<>();

    int middleIndex = (nums.length - 1) / 2;
    TreeNode root = new TreeNode(nums[middleIndex]);

    TreeHelper rootHelper = new TreeHelper();
    rootHelper.curTree = root;
    rootHelper.startIndex = 0;
    rootHelper.endIndex = nums.length - 1;
    level.add(rootHelper);

    while (!level.isEmpty()) {
        TreeHelper helper = level.poll();

        if (helper.startIndex == helper.endIndex) {
            continue;
        }

        middleIndex = (helper.startIndex + helper.endIndex) / 2;

        if (helper.startIndex < middleIndex) {
            TreeHelper leftHelper = new TreeHelper();

            int leftMiddle = (helper.startIndex + middleIndex - 1) / 2;
            TreeNode leftTree = new TreeNode(nums[leftMiddle]);

            leftHelper.startIndex = helper.startIndex;
            leftHelper.endIndex = middleIndex - 1;
            leftHelper.curTree = leftTree;

            helper.curTree.left = leftTree;
            level.add(leftHelper);
        }

        if (helper.endIndex > middleIndex) {
            TreeHelper rightHelper = new TreeHelper();

            int rightMiddle = (helper.endIndex + middleIndex + 1) / 2;
            TreeNode rightTree = new TreeNode(nums[rightMiddle]);

            rightHelper.startIndex = middleIndex + 1;
            rightHelper.endIndex = helper.endIndex;
            rightHelper.curTree = rightTree;

            helper.curTree.right = rightTree;
            level.add(rightHelper);
        }
    }

    return rootHelper.curTree;
}

public static class TreeHelper {
    private TreeNode curTree;
    private int startIndex;
    private int endIndex;
}
```

## Review
- []()

## Tip
+ 

## Share
暂无内容