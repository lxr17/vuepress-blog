# 第十八周ARTS总结
## Algorithm
- [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)
> 0ms | 100.00% Run time  
> 39.9MB | 15.83% Memory
```java
public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    // 记录中途改变的值
    ListNode changedNode = new ListNode(-1);

    // 记录首位指针
    ListNode ans = changedNode;

    while (l1 != null || l2 != null) {
        // l1==null时下一个值应为l2
        if (l1 == null) {
            changedNode.next = l2;
            l2 = l2.next;
            changedNode = changedNode.next;
            continue;
        }

        // l2==null时下一个值应为l1
        if (l2 == null) {
            changedNode.next = l1;
            l1 = l1.next;
            changedNode = changedNode.next;
            continue;
        }

        // l1 <= l2时下一个值应为l1
        if (l1.val <= l2.val) {
            changedNode.next = l1;
            l1 = l1.next;
            changedNode = changedNode.next;
        } else {
            // l1 > l2时下一个值应为l1
            changedNode.next = l2;
            l2 = l2.next;
            changedNode = changedNode.next;
        }
    }

    return ans.next;
}

static class ListNode {
    int val;
    ListNode next;

    ListNode(int x) {
        val = x;
    }
}
```

## Review
- [You thought you knew Android](https://medium.com/@anoopss/you-thought-you-knew-android-e46a556d0773)

## Tip
+ `rsa`加`aes`的加密方案是当前比较流行的加密方案
+ `Paint`的一些方法
  + `setAntiAlias`    抗锯齿
  + `setDither`    防抖动
  + `setFilterBitmap`    对位图进行滤波处理
  
## Share
暂无内容

<Vssue title="第十八周ARTS总结" />