# 第六十五周ARTS总结
## Algorithm
- [Partition List](https://leetcode.com/problems/partition-list/)
> 0ms | 100.00% Run time  
> 39.2MB | 53.73% Memory
```java
public ListNode partition(ListNode head, int x) {
    // 小于x的节点头
    ListNode smallHead = new ListNode();

    // 小于x的节点尾
    ListNode curSmall = smallHead;

    // 大于等于x的节点头
    ListNode notSmallHead = new ListNode();

    // 大于等于x的节点尾
    ListNode curNotSmall = notSmallHead;

    while (head != null) {
        if (head.val < x) {
            curSmall.next = head;
            curSmall = curSmall.next;
        } else {
            curNotSmall.next = head;
            curNotSmall = curNotSmall.next;
        }

        head = head.next;
    }

    curSmall.next = notSmallHead.next;
    curNotSmall.next = null;

    return smallHead.next;
}

public static class ListNode {
    int val;
    ListNode next;

    ListNode() {
    }

    ListNode(int val) {
        this.val = val;
    }

    ListNode(int val, ListNode next) {
        this.val = val;
        this.next = next;
    }
}
```

## Review
- [What's Up With Floating Point?](https://timroderick.com/floating-point-introduction/)

## Tip
+ 上采样（即放大图片）：
    + 邻插值算法
    + 双线性差值法
    + 双三次差值法
+ 被挂起的进程暂时不参与**CPU**的调度，直到被激活
+ 在重写`View#onSaveInstanceState`一定要注意其返回值情况，必须为`AbsSavedState`对象
+ **三次握手**：
    1. **A**向**B**表示想跟**B**进行连接
    2. **B**收到消息，告诉**A**准备好和你连接了
    3. **A**收到消息，告诉**B**我收到你准备连接的信号了，此时开始连接
+ **四次挥手**：
    1. **A**向**B**表示想跟**B**断开连接
    2. **B**收到消息，但是**B**消息没发送完，只能告诉**A**我知道了
    3. **B**发送完消息，告诉**A**可以断开连接了
    4. **A**收到消息，告诉**B**断开连接，此时断开连接
+ 挥手的第三次是为了什么：**如果只有两次，只能保证B能收到A的信息，不能保证A能收到B的信息，需要双方都确认才行**

## Share
暂无内容