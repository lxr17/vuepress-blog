# 第六十三周ARTS总结
## Algorithm
- [Remove Duplicates from Sorted List II](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/)
> 0ms | 100.00% Run time  
> 39.4MB | 43.64% Memory
```java
public ListNode deleteDuplicates(ListNode head) {
    // 作一个非空判断
    if (head == null) {
        return null;
    }

    // 新链表的头的前一个节点
    ListNode newHead = new ListNode();

    // 新链表的当前节点
    ListNode currNew = newHead;

    // 旧链表的当前节点
    ListNode curr = head;

    // 上一个节点的值
    int lastVal = curr.val;

    while (curr.next != null) {
        // 如果当前节点的值和下一个节点的值不相同，并且和上一个节点的值也不相同（第一个节点除外），则加入新链表
        if (curr.val != curr.next.val && (curr == head || curr.val != lastVal)) {
            currNew.next = curr;
            currNew = currNew.next;
        }

        lastVal = curr.val;
        curr = curr.next;
    }

    // 判断最后一个节点的情况
    if (curr == head || curr.val != lastVal) {
        currNew.next = curr;
        currNew = currNew.next;
    }

    // 去掉多余的节点（很重要）
    currNew.next = null;

    return newHead.next;
}
```
----

- [Remove Duplicates from Sorted List](https://leetcode.com/problems/remove-duplicates-from-sorted-list/)
> 0ms | 100.00% Run time  
> 39.3MB | 50.77% Memory
```java
public ListNode deleteDuplicates(ListNode head) {
    if (head == null) {
        return null;
    }

    // 新链表当前节点
    ListNode currNew = head;

    // 当前节点
    ListNode curr = head;

    while (curr.next != null) {
        if (curr.val != curr.next.val) {
            currNew.next = curr.next;
            currNew = currNew.next;
        }

        curr = curr.next;
    }

    // 清空多余节点
    currNew.next = null;

    return head;
}
```

## Review
- [A New Future for Java](https://medium.com/better-programming/a-new-future-for-java-b10a6789f962)

## Tip
+ 进程的不同状态：
    + 创建状态
    + 就绪状态
    + 运行状态
    + 阻塞状态
    + 结束状态
    + 挂起状态
+ 方法栈主要用来存放参数、返回地址、局部变量等
+ 多态和动态绑定的的意义：**创建对象的代码和操作对象的代码往往不在同一个地方**，操作对象的代码往往只知道对象的某种父类，也往往只需要知道他是某种类型的父类就可以了
+ 所有的子类都必须在构造方法中通过某种方式调用父类的构造方法，否则会编译错误

## Share
暂无内容