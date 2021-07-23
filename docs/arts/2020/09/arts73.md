# 第七十三周ARTS总结
## Algorithm
- [Unique Binary Search Trees II](https://leetcode.com/problems/unique-binary-search-trees-ii/)
> 0ms | 100.00% Run time  
> 39MB | 95.06% Memory
```java
public List<TreeNode> generateTrees(int n) {
    List<TreeNode> pre = new ArrayList<>();
    List<TreeNode> cur = new ArrayList<>();

    for (int i = 0; i < n; i++) {
        cur.clear();

        if (i == 0) {
            // 找到长度为1的所有树
            TreeNode treeNode = new TreeNode(i + 1);
            cur.add(treeNode);
        } else {
            // 找到长度大于1的所有树
            // 1. 新增的节点是根节点
            // 2. 新增的节点插入到 根节点 和 右树 之间，原右树为新增加点的左树
            // 3. 新增的节点插入到 右树 和 右树的右树 之间
            // 4. ...
            for (int j = 0; j < pre.size(); j++) {
                // 需要往preItem中插入新的节点
                TreeNode preItem = pre.get(j);

                // 新增的节点为根节点
                TreeNode root = new TreeNode(i + 1);
                root.left = preItem;
                cur.add(root);

                // 新增的节点在右边(k代表第k个right)
                int k = 0;
                loop:
                while (true) {
                    TreeNode rootCopy = cloneTree(preItem);
                    TreeNode right = rootCopy;

                    // 找到第k个right，找不到的话就结束遍历
                    for (int m = 0; m < k; m++) {
                        if (right.right != null) {
                            right = right.right;
                        } else {
                            // 找不到第k个right，结束while循环
                            break loop;
                        }
                    }

                    TreeNode insertNode = new TreeNode(i + 1);
                    insertNode.left = right.right;
                    right.right = insertNode;
                    cur.add(rootCopy);

                    k++;
                }
            }

        }

        pre.clear();
        pre.addAll(cur);
    }

    return cur;
}

/**
 * 因为左树不涉及到改变，所以只需要完全复制右树
 *
 * @param treeNode
 * @return
 */
private TreeNode cloneTree(TreeNode treeNode) {
    TreeNode clonedTree = new TreeNode(treeNode.val);
    clonedTree.left = treeNode.left;

    if (treeNode.right != null) {
        clonedTree.right = cloneTree(treeNode.right);
    }

    return clonedTree;
}

public static class TreeNode {
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

----
- [Unique Binary Search Trees](https://leetcode.com/problems/unique-binary-search-trees/)
> 0ms | 100.00% Run time  
> 35.7MB | 66.59% Memory
```java
public int numTrees(int n) {
    // key为树的长度，value为一共有多少种结构
    Map<Integer, Integer> map = new HashMap<>();
    map.put(0, 1);
    map.put(1, 1);
    map.put(2, 2);

    for (int i = 3; i <= n; i++) {
        int sum = 0;

        // 计算根节点是1,2,3...i的时候，一共有多少种方式
        for (int j = 1; j <= i; j++) {
            sum = sum + map.get(j - 1) * map.get(i - j);
        }

        map.put(i, sum);
    }

    return map.get(n);
}
```

## Review
- []()

## Tip
+ 

## Share
暂无内容