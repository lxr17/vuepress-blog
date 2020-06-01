# 第五十二周ARTS总结
## Algorithm
- [Permutation Sequence](https://leetcode.com/problems/permutation-sequence/)
> 1ms | 98.49% Run time  
> 37.1MB | 20.83% Memory
```java
public String getPermutation(int n, int k) {
    // 所有的元数字
    List<Integer> candidate = new ArrayList<>();
    for (int i = 1; i <= n; i++) {
        candidate.add(i);
    }

    // 结果
    StringBuilder builder = new StringBuilder();

    // 从左到右一个数字一个数字的找
    while (candidate.size() > 1) {
        int temp = factorial(n - 1 - builder.length());

        int index = k / temp - ((k % temp) == 0 ? 1 : 0);
        builder.append(candidate.get(index));
        candidate.remove(index);

        k = k - temp * index;
    }

    builder.append(candidate.get(0));

    return builder.toString();
}

/**
 * 计算n!
 */
private int factorial(int n) {
    int ans = 1;
    for (int i = 2; i <= n; i++) {
        ans = ans * i;
    }

    return ans;
}
```
----

- [Rotate List](https://leetcode.com/problems/rotate-list/)
> 0ms | 100.00% Run time  
> 39.2MB | 41.38% Memory
```java
public ListNode rotateRight(ListNode head, int k) {
    // 当前节点
    ListNode current = head;
    // ListNode长度
    int length = 0;

    // 非空判断
    if (current != null) {
        length++;
    } else {
        return null;
    }

    // 将链表变成一个圈
    while (current.next != null) {
        current = current.next;
        length++;
    }
    current.next = head;
    current = head;

    // 优化k
    k = k % length;

    // 开始转圈（顺时针转k == 逆时针转length-k），找到关键节点的前一个
    for (int i = 0; i < length - k - 1; i++) {
        current = current.next;
    }

    ListNode ans = current.next;
    current.next = null;

    return ans;
}
```

## Review
- []()

## Tip
+ 

## Share
暂无内容