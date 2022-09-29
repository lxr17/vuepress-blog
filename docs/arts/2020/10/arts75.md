# 第七十五周ARTS总结
## Algorithm
- [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)
> 2ms | 10.48% Run time  
> 38.5MB | 79.66% Memory
```java
public boolean isValidBST(TreeNode root) {
    // 思路：利用中序遍历来检查是否按照正确的顺序
    // stack 用来存储遍历过程中树的节点
    Stack<TreeNode> stack = new Stack<>();
    stack.push(root);

    // 注：这里不能用 int ，用 int 会导致 [Integer.MIN_VALUE] 通过不了
    Integer pre = null;

    while (true) {
        if (stack.empty()) {
            return true;
        }

        TreeNode cur = stack.peek();

        if (cur.left != null) {
            stack.push(cur.left);
            cur.left = null;
            continue;
        }

        // 比较当前节点
        if (pre != null && cur.val <= pre) {
            return false;
        } else {
            pre = cur.val;
        }

        stack.pop();
        if (cur.right != null) {
            stack.push(cur.right);
        }
    }
}
```

----
- [Recover Binary Search Tree](https://leetcode.com/problems/recover-binary-search-tree/)
> 3ms | 35.89% Run time  
> 39.3MB | 71.04% Memory
```java
public void recoverTree(TreeNode root) {
    // 思路：一个正常中序遍历的树是正序的：1 2 3 4 5 6 7 8
    // 而交换其中任意两个，会导致 1 2 6 4 5 3 7 8
    // 有两个节点的位置破坏了其正序
    // 如果交换相邻的两个，则 1 2 4 3 5 6 7 8
    // 只有一个节点的位置破坏了其正序
    // 因此重点在于找到破坏其顺序的节点
    TreeNode first = null;
    TreeNode second = null;

    // 遍历过程中的前一个节点
    TreeNode pre = null;

    Stack<TreeNode> stack = new Stack<>();
    stack.push(root);

    // 左树不断入栈
    while (stack.peek().left != null) {
        stack.push(stack.peek().left);
    }

    while (true) {
        if (stack.empty()) {
            break;
        }

        TreeNode cur = stack.peek();

        // 找到了
        if (pre != null && cur.val <= pre.val) {
            if (first == null) {
                first = pre;
                second = cur;
            } else {
                second = cur;
                break;
            }
        }

        // 继续遍历
        pre = cur;
        stack.pop();
        if (cur.right != null) {
            stack.push(cur.right);

            // 左树不断入栈
            while (stack.peek().left != null) {
                stack.push(stack.peek().left);
            }
        }
    }

    if (first != null && second != null) {
        int temp = first.val;
        first.val = second.val;
        second.val = temp;
    }
}
```

## Review
- [Android 13 and Text Rendering Algorithms](https://proandroiddev.com/android-13-and-text-rendering-algorithms-f622386025b)

## Tip
+ **Fragment**的状态
  + **INITIALIZED**
  + **CREATED**
  + **STARTED**
  + **RESUMED**
  + **DESTROYED**
+ **Activity**、**Window**、**DecorView**之间的关系
  1. **Activity**持有了**PhoneWindow**
  2. **PhoneWindow**创建了**DecorView**
  3. **PhoneWindow**根据不同的主题，找到对应的布局，并把布局**add**进**DecorView**
  4. **PhoneWindow**找到**DecorView**中**id**叫**content**的控件，并把我们写的布局**add**进去
+ **APK**打包流程
  + 利用**aapt**工具，将**资源文件**编译成**编译后的资源文件**和**R文件**
  + 利用**aidl**工具，将**aidl文件**编译成**Java接口文件**
  + 利用**javac**工具，将**R文件**、**Java接口文件**、**Java代码**编译成**class文件**
  + 利用**dex**工具，将生成的**class文件**以及三方依赖中的**class文件**编译成**dex文件**
  + 利用**apkbuilder**工具，将**编译后的资源文件**、**dex文件**、**其他资源文件（so，asset等）**打包成**APK文件**
  + 利用**jarsigner**工具，读取签名文件，将**APK文件**进行签名，生成一个**签名后的APK文件**
  + 利用**zipalign**工具，对**已签名的APK文件**进行体积优化
+ 可使用**walle**进行多渠道打包
+ **Android 8**系统的透明**Activity**不允许设置锁定横竖屏

## Share
暂无内容