# 第七十六周ARTS总结
## Algorithm
- [Same Tree](https://leetcode.com/problems/same-tree/)
> 0ms | 100.00% Run time  
> 36.5MB | 49.90% Memory
```java
public boolean isSameTree(TreeNode p, TreeNode q) {
    if (p == null || q == null) {
        if (p != null || q != null) {
            return false;
        } else {
            return true;
        }
    }

    // 思路：深度遍历
    Stack<TreeNode> pStack = new Stack<>();
    Stack<TreeNode> qStack = new Stack<>();

    pStack.push(p);
    qStack.push(q);

    // 左树不断入栈
    while (pStack.peek().left != null || qStack.peek().left != null) {
        if (pStack.peek().left == null || qStack.peek().left == null) {
            return false;
        }

        pStack.push(pStack.peek().left);
        qStack.push(qStack.peek().left);
    }

    while (true) {
        if (pStack.empty() && qStack.empty()) {
            return true;
        }

        if (pStack.peek().val != qStack.peek().val) {
            return false;
        }

        TreeNode pTemp = pStack.pop();
        TreeNode qTemp = qStack.pop();

        if (pTemp.right != null || qTemp.right != null) {
            if (pTemp.right == null || qTemp.right == null) {
                return false;
            }

            pStack.push(pTemp.right);
            qStack.push(qTemp.right);

            // 左树不断入栈
            while (pStack.peek().left != null || qStack.peek().left != null) {
                if (pStack.peek().left == null || qStack.peek().left == null) {
                    return false;
                }

                pStack.push(pStack.peek().left);
                qStack.push(qStack.peek().left);
            }
        }
    }
}
```

----
> 0ms | 100.00% Run time  
> 36.3MB | 65.23% Memory
```java
public boolean isSameTree2(TreeNode p, TreeNode q) {
    if (p == null || q == null) {
        if (p != null || q != null) {
            return false;
        } else {
            return true;
        }
    }

    // 思路：广度遍历
    Queue<TreeNode> pQueue = new LinkedList<>();
    Queue<TreeNode> qQueue = new LinkedList<>();

    pQueue.add(p);
    qQueue.add(q);

    while (true) {
        if (pQueue.isEmpty() || qQueue.isEmpty()) {
            if (!pQueue.isEmpty() || !qQueue.isEmpty()) {
                return false;
            } else {
                return true;
            }
        }

        TreeNode pTemp = pQueue.poll();
        TreeNode qTemp = qQueue.poll();

        if (pTemp.val != qTemp.val) {
            return false;
        }

        if (pTemp.left != null || qTemp.left != null) {
            if (pTemp.left == null || qTemp.left == null) {
                return false;
            } else {
                pQueue.add(pTemp.left);
                qQueue.add(qTemp.left);
            }
        }

        if (pTemp.right != null || qTemp.right != null) {
            if (pTemp.right == null || qTemp.right == null) {
                return false;
            } else {
                pQueue.add(pTemp.right);
                qQueue.add(qTemp.right);
            }
        }
    }
}
```

## Review
- []()

## Tip
+ 

## Share
暂无内容