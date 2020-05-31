# 第五十一周ARTS总结
## Algorithm
- [Length of Last Word](https://leetcode.com/problems/length-of-last-word/)
> 1ms | 41.93% Run time  
> 37.8MB | 7.57% Memory
```java
public int lengthOfLastWord(String s) {
    String[] strings = s.split(" ");

    if (strings.length == 0) {
        return 0;
    }

    return strings[strings.length - 1].length();
}
```

## Review
- []()

## Tip
+ 

## Share
暂无内容