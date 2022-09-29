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
- [6 Design Patterns Every Android Developer Must Know](https://medium.com/@ahmadkazimi/6-design-patterns-every-android-developer-must-know-53d912b5864b)

## Tip
+ `RecycleView`可使用`overScrollMode`属性来去掉自带的过度滑动阴影
+ `ProgressBar`可自定义样式可使用**scale**来让进度条的左右都是圆角
+ 可以使用`<Space>`代替`margin`，因为前者不会执行任何绘制操作，而后者会重新绘制
+ 设置`TextView#setFilters`可以控制输入内容的长度或者监听输入内容做一些操作
+ `runCatching`非常适合用来处理一些可能会报错的表达式

## Share
暂无内容