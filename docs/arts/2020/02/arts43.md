# 第四十三周ARTS总结
## Algorithm
- [Pow(x, n)](https://leetcode.com/problems/powx-n/)
> 0ms | 100.00% Run time  
> 37.1MB | 5.88% Memory
```java
public double myPow(double x, int n) {
    if (x == 0 || x == 1) {
        return x;
    }

    if (n < 0) {
        return pow(1 / x, n);
    } else {
        return pow(x, n);
    }
}

/**
 * 此时n的正负不影响结果
 *
 * @param x
 * @param n
 * @return
 */
private double pow(double x, int n) {
    if (n == 0) {
        return 1;
    }

    // x^n=(x^2)^(n/2)
    return (pow(x * x, n / 2) * (n % 2 == 0 ? 1 : x));
}
```

## Review
- []()

## Tip
+ 

## Share
暂无内容