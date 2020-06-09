# 第五十七周ARTS总结
## Algorithm
- [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
> 0ms | 100.00% Run time  
> 38.3MB | 5.05% Memory
```java
public int climbStairs(int n) {
//  // 这是斐波那契数列
//  if (n == 1) {
//      // 此时只有一种：1
//      return 1;
//  } else if (n == 2) {
//      // 此时有两种：1、1；2
//      return 2;
//  } else {
//      // 走一步的后续情况 + 走两步的后续情况
//      return climbStairs(n - 1) + climbStairs(n - 2);
//  }

    if (n == 1) {
        return 1;
    } else if (n == 2) {
        return 2;
    }

    int first = 1;
    int second = 2;

    // 将递归转换成遍历
    for (int i = 2; i < n; i++) {
        int temp = second;
        second = first + second;
        first = temp;
    }

    return second;
}
```

## Review
- []()

## Tip
+ 

## Share
暂无内容