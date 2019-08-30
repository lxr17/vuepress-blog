# 第五周ARTS总结
## Algorithm
- [Reverse Integer](https://leetcode.com/problems/reverse-integer/)
> 2ms | 71.16% Run time  
> 32.9MB | 100.00% Memory
```java
public int reverse(int x) {
    try {
        if (x > 0) {
            return Integer.parseInt(new StringBuffer(Integer.toString(x)).reverse().toString());
        } else {
            return -Integer.parseInt(new StringBuffer(Integer.toString(-x)).reverse().toString());
        }
    } catch (NumberFormatException ex) {
        return 0;
    }
}
```

## Review
- [Everything You Should Know About Sound](https://waitbutwhy.com/2016/03/sound.html)

## Tip
+ 根gradle中的`com.android.tools:gradle:2.2.3`代表的是gradle插件的版本，`gradle-wrapper.properties`中的版本号代表gradle本身的版本，这两个之间有对应关系，不许错乱
+ Android的monitor工具在Mac上运行会一片空白，需要java的版本不高于`1.8.0_151`

## Share