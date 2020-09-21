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
+ 

## Share
暂无内容