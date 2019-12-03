# 第二十一周ARTS总结
## Algorithm
- [Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs/)
> 0ms | 100.00% Run time  
> 34.2MB | 100.00% Memory
```java
public ListNode swapPairs(ListNode head) {
    ListNode changedNode = new ListNode(-1);
    changedNode.next = head;

    ListNode initNode = changedNode;

    while (changedNode.next != null) {
        ListNode next = changedNode.next;
        ListNode nnext = next.next;

        // 交换相邻两节点
        if (nnext != null) {
            changedNode.next = nnext;

            ListNode temp = nnext.next;
            nnext.next = next;
            next.next = temp;
        }

        changedNode = next;
    }

    return initNode.next;
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
- [Activity and Fragment Layouts with AndroidX](https://www.bignerdranch.com/blog/activity-and-fragment-layouts-with-androidx/)

## Tip
+ 关于处理Bitmap的一些规则
  + Never keep in memory more than you actually need
  + Scaling：利用inSampleSize、inDensity、inTargetDensity来显示图片，而不是复制一份图片做变换
  + Decode a specific region
  + Getting image size
  + ImageDecoder
  
## Share
暂无内容

<Vssue title="第二十一周ARTS总结" />