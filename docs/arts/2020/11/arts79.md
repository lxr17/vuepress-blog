# 第七十九周ARTS总结
## Algorithm
- [Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)
> 14ms | 5.83% Run time  
> 39.3MB | 45.06% Memory
```java
public TreeNode buildTree(int[] preorder, int[] inorder) {
    // 思路：利用递归
    // 1. 前序遍历的第一个节点一定是根节点
    // 2. 根据该节点来分隔中序遍历，从而找到中序遍历的左子树和右子树（因为均无重复元素）
    // 3. 根据左右子树的长度和前序遍历，分别找到左右子树的前序遍历和中序遍历
    // 4. 递归往下找
    if (preorder == null || preorder.length == 0) {
        return null;
    }

    if (preorder.length == 1) {
        return new TreeNode(preorder[0]);
    }

    // 步骤1
    TreeNode root = new TreeNode(preorder[0]);
    int splitIndex = 0;

    // 步骤2
    for (int i = 0; i < inorder.length; i++) {
        if (inorder[i] == preorder[0]) {
            splitIndex = i;
            break;
        }
    }

    // 步骤3
    int[] leftPreorder = new int[splitIndex];
    int[] leftInorder = new int[splitIndex];
    int[] rightPreorder = new int[preorder.length - splitIndex - 1];
    int[] rightInorder = new int[preorder.length - splitIndex - 1];
    for (int i = 0; i < preorder.length; i++) {
        // 前序遍历拆分
        if (i != 0) {
            if (i <= splitIndex) {
                leftPreorder[i - 1] = preorder[i];
            } else {
                rightPreorder[i - 1 - splitIndex] = preorder[i];
            }
        }

        // 中序遍历拆分
        if (i != splitIndex) {
            if (i < splitIndex) {
                leftInorder[i] = inorder[i];
            } else {
                rightInorder[i - splitIndex - 1] = inorder[i];
            }
        }
    }

    // 步骤4
    root.left = buildTree(leftPreorder, leftInorder);
    root.right = buildTree(rightPreorder, rightInorder);

    return root;
}
```

----
> 17ms | 5.32% Run time  
> 39.2MB | 52.41% Memory
```java
public TreeNode buildTree2(int[] preorder, int[] inorder) {
    if (preorder == null || preorder.length == 0) {
        return null;
    }

    TreeNode root = new TreeNode(preorder[0]);

    if (preorder.length == 1) {
        return root;
    }

    // 思路：将方法一递归的思路改成迭代（一层一层的生成节点）
    Queue<TreeHelper> queue = new LinkedList<>();
    TreeHelper helper = new TreeHelper();
    helper.treeNode = root;
    helper.preorder = preorder;
    helper.inorder = inorder;
    queue.add(helper);

    while (!queue.isEmpty()) {
        int splitIndex = 0;
        helper = queue.poll();

        // 找到分割点
        for (int i = 0; i < helper.inorder.length; i++) {
            if (helper.inorder[i] == helper.preorder[0]) {
                splitIndex = i;
                break;
            }
        }

        // 找到左右子树
        int[] leftPreorder = new int[splitIndex];
        int[] leftInorder = new int[splitIndex];
        int[] rightPreorder = new int[helper.preorder.length - splitIndex - 1];
        int[] rightInorder = new int[helper.preorder.length - splitIndex - 1];
        for (int i = 0; i < helper.preorder.length; i++) {
            // 前序遍历拆分
            if (i != 0) {
                if (i <= splitIndex) {
                    leftPreorder[i - 1] = helper.preorder[i];
                } else {
                    rightPreorder[i - 1 - splitIndex] = helper.preorder[i];
                }
            }

            // 中序遍历拆分
            if (i != splitIndex) {
                if (i < splitIndex) {
                    leftInorder[i] = helper.inorder[i];
                } else {
                    rightInorder[i - splitIndex - 1] = helper.inorder[i];
                }
            }
        }

        // 生成左子树根节点
        if (leftPreorder.length > 0) {
            TreeNode leftTreeNode = new TreeNode(leftPreorder[0]);
            helper.treeNode.left = leftTreeNode;

            if (leftPreorder.length > 1) {
                TreeHelper leftHelper = new TreeHelper();
                leftHelper.treeNode = leftTreeNode;
                leftHelper.preorder = leftPreorder;
                leftHelper.inorder = leftInorder;

                queue.add(leftHelper);
            }
        }

        // 生成右子树根节点
        if (rightPreorder.length > 0) {
            TreeNode rightTreeNode = new TreeNode(rightPreorder[0]);
            helper.treeNode.right = rightTreeNode;

            if (rightPreorder.length > 1) {
                TreeHelper rightHelper = new TreeHelper();
                rightHelper.treeNode = rightTreeNode;
                rightHelper.preorder = rightPreorder;
                rightHelper.inorder = rightInorder;

                queue.add(rightHelper);
            }
        }
    }

    return root;
}

public static class TreeHelper {
    /**
     * 当前树
     */
    private TreeNode treeNode;

    /**
     * 当前树的前序遍历
     */
    private int[] preorder;

    /**
     * 当前树的中序遍历
     */
    private int[] inorder;
}
```
## Review
- []()

## Tip
+ 

## Share
暂无内容