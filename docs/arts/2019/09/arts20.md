# 第二十周ARTS总结
## Algorithm
- [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)
> 185ms | 12.39% Run time  
> 56.7MB | 5.47% Memory
```java
public ListNode mergeKLists(ListNode[] lists) {
    // 记录中途改变的值
    ListNode changedNode = new ListNode(-1);

    // 记录首位指针
    ListNode ans = changedNode;

    while (changedNode != null) {
        changedNode.next = findTheSmallestNode(lists);
        changedNode = changedNode.next;
    }

    return ans.next;
}

/**
 * 找到lists中最小的一个ListNode
 *
 * @param lists
 * @return
 */
private ListNode findTheSmallestNode(ListNode[] lists) {
    ListNode smallest = null;
    int target = -1;

    for (int i = 0; i < lists.length; i++) {
        ListNode temp = lists[i];

        // 获取最小值
        if (temp != null && (smallest == null || temp.val <= smallest.val)) {
            smallest = temp;
            target = i;
        }
    }

    // 将最小值往后移动一个节点
    if (target != -1) {
        lists[target] = lists[target].next;
    }

    return smallest;
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
- [Dealing with Bitmaps in the Right Way](https://proandroiddev.com/image-decoding-bitmaps-android-c039790ee07e)

## Tip
+ so库是C语言编译解释后的包，直接就是机器码，因此和CPU的关系很大
+ 写`MarkDown`的时候要注意自己写的标签，得做特殊处理，防止浏览器将其当做标签处理
  
## Share
暂无内容

<Vssue title="第二十周ARTS总结" />