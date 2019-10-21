# 第二十二周ARTS总结
## Algorithm
- [Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/)
> 0ms | 100.00% Run time  
> 39MB | 22.42% Memory
```java
public ListNode reverseKGroup(ListNode head, int k) {
    ListNode[] ans = null;
    ListNode result = null;
    ListNode last = null;

    // 单独处理k等于1的情况
    if (k == 1) {
        return head;
    }

    int size = size(head);

    while (head != null && size >= k) {
        // 反转前k个
        ans = reverseK(head, k);

        if (result == null) {
            result = ans[0];
        } else {
            last.next = ans[0];
        }

        last = ans[2];
        head = ans[1];
        size = size - k;
    }

    if (k > 0 && last != null) {
        last.next = head;
    }

    // 解决head长度小于k的情况
    if (result == null) {
        result = head;
    }

    return result;
}

/**
 * 只反转最开始的k个节点
 * <p>
 * 返回的数组中第一个为反转之后的ListNode;
 * 第二个为下一个节点的ListNode;
 * 第三个为最后一个节点的ListNode;
 *
 * @param head
 * @param k
 * @return
 */
private ListNode[] reverseK(ListNode head, int k) {
    ListNode[] ans = new ListNode[3];

    // 遍历中途一直指向当前节点
    ListNode changedNode = head.next;

    // 反转之后的ListNode
    ans[0] = head;
    ans[0].next = null;

    // 最后一个节点的ListNode
    ans[2] = head;

    // 暂存next节点
    ListNode temp;

    // 逐步增加rest的长度
    while (changedNode != null && k > 1) {
        // 暂存下一节点
        temp = changedNode.next;

        // 增长rest节点
        changedNode.next = ans[0];
        ans[0] = changedNode;

        // 指向下一节点
        changedNode = temp;

        k--;

        // 下一节点的ListNode
        if (k == 1) {
            ans[1] = changedNode;
        }
    }

    return ans;
}

/**
 * 计算ListNode的长度
 *
 * @param listNode
 * @return
 */
private int size(ListNode listNode) {
    int size = 0;

    while (listNode != null) {
        size++;
        listNode = listNode.next;
    }

    return size;
}

static class ListNode {
    int val;
    ListNode next;

    ListNode(int x) {
        val = x;
    }
}
```
**注1：要注意`k=1`的情况**  
**注2：要注意`k=size`的情况**

----
- [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)
> 1ms | 96.94% Run time  
> 38.4MB | 99.47% Memory
```java
public int removeDuplicates(int[] nums) {
    int s = 0;

    if (nums == null || nums.length == 0) {
        return 0;
    }

    // 用long的目的是防止减一之后为long了
    long last = nums[0] - 1;
    for (int i : nums) {
        if (i != last) {
            nums[s] = i;
            last = i;
            s++;
        }

    }

    return s;
}
```

----
- [Remove Element](https://leetcode.com/problems/remove-element/)
> 0ms | 100.00% Run time  
> 35.2MB | 100.00% Memory
```java
public int removeElement(int[] nums, int val) {
    int s = 0;

    for (int i : nums) {
        if (i != val) {
            nums[s] = i;
            s++;
        }
    }

    return s;
}
```
## Review
- [Getting Started: Augmented Reality Using Android ARCore](https://medium.com/dvt-engineering/getting-started-augmented-reality-using-android-arcore-9c2f4c3d6528)

## Tip
+ 用LocalDate和LocalTime来处理有关时间的问题，而不是普通的Date
  
## Share