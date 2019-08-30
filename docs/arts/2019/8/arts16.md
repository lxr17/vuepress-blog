# 第十六周ARTS总结
## Algorithm
- [Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)
> 1ms | 10.52% Run time  
> 35.9MB | 100.00% Memory
```java
public ListNode removeNthFromEnd(ListNode head, int n) {
    List<ListNode> listNodes = new ArrayList<>();

    // 将ListNode转为List集合
    listNodes.add(head);
    while (listNodes.get(listNodes.size() - 1).next != null) {
        listNodes.add(listNodes.get(listNodes.size() - 1).next);
    }

    if (listNodes.size() - n - 1 >= 0) {
        ListNode previousNode = listNodes.get(listNodes.size() - n - 1);
        previousNode.next = previousNode.next.next;
    } else {
        head = head.next;
    }

    return head;
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
- [Android Interview Questions Cheat Sheet — Part I](https://android.jlelse.eu/android-interview-questions-cheat-sheet-96ea01c88def)

## Tip
+ 通过`activity-alias`可以为某个`Activity`设置一个快捷入口

## Share