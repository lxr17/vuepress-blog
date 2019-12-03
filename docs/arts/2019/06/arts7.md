# 第七周ARTS总结
## Algorithm
- [Palindrome Number](https://leetcode.com/problems/palindrome-number/)
> 8ms | 68.82% Run time  
> 35.1MB | 71.77% Memory
```java
public boolean isPalindrome(int x) {
    boolean isPalindrome = true;
    String strX = Integer.toString(x);

    for (int i = 0; i < strX.length() / 2; i++) {
        if (strX.charAt(i) != strX.charAt(strX.length() - 1 - i)) {
            isPalindrome = false;
            break;
        }
    }

    return isPalindrome;
}
```

## Review
- [10 Simple Rules for the Best Life Ever](https://medium.com/personal-growth/10-simple-rules-for-the-best-life-ever-8e704365f6ff)

## Tip
+ H5的所有历史记录是一个栈，并且重定向不会入栈
+ 可以通过`WebStorage.getInstance().deleteAllData();`来删除`webview`中的所有`localStorage`存储

## Share
暂无内容

<Vssue title="第七周ARTS总结" />