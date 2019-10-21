# 第二十四周ARTS总结
## Algorithm
- [Divide Two Integers](https://leetcode.com/problems/divide-two-integers/)
> 6ms | 12.55% Run time  
> 35.4MB | 6.06% Memory
```java
public int divide(int dividend, int divisor) {
    char symble;
    if ((dividend < 0 && divisor > 0) || (dividend > 0 && divisor < 0)) {
        symble = '-';
    } else {
        symble = '+';
    }

    // 正数化
    long mDividend = dividend;
    long mDivisor = divisor;
    if (mDividend < 0) {
        mDividend = -mDividend;
    }
    if (mDivisor < 0) {
        mDivisor = -mDivisor;
    }

    // 被除数
    StringBuilder dividendStr = new StringBuilder(Long.toString(mDividend));

    // 商
    StringBuilder ans = new StringBuilder("0");

    // 上一次的余数
    long lastMod = 0;

    while (dividendStr.length() > 0) {
        // 当前的被除数
        long curDividend = Long.parseLong(Long.toString(lastMod) + dividendStr.subSequence(0, 1));

        // 如果当前被除数比除数小
        if (curDividend < mDivisor) {
            lastMod = curDividend;
            dividendStr.delete(0, 1);

            // 不够的情况下要补零
            ans.append(0);
            continue;
        }

        // 计算商与余数
        long sum = 0;
        while (curDividend >= mDivisor) {
            curDividend -= mDivisor;
            sum++;
        }
        ans.append(sum);
        lastMod = curDividend;

        // 移除最近的一位
        dividendStr.delete(0, 1);
    }

    int realAns;
    try {
        realAns = Integer.parseInt(symble + ans.toString());
    } catch (Exception ex) {
        realAns = Integer.MAX_VALUE;
    }

    return realAns;
}
```

## Review
- [Converting your Android Gradle scripts to Kotlin](https://proandroiddev.com/converting-your-android-gradle-scripts-to-kotlin-1172f1069880)

## Tip
+ `WeakReference`是弱引用，当一个对象仅仅被`weak reference`（弱引用）指向, 而没有任何其他`strong reference`（强引用）指向的时候, 如果这时`GC`运行, 那么这个对象就会被回收，不论当前的内存空间是否足够，这个对象都会被回收
  
## Share