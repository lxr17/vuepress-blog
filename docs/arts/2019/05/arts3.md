# 第三周ARTS总结
## Algorithm
- [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)
> 43ms | 40.90% Run time  
> 38.3MB | 49.35% Memory
```java
public String longestPalindrome(String s) {
    if (s.length() == 0) {
        return "";
    }

    String longestPalindrome = s.substring(0, 1);
    int maxLength = longestPalindrome.length();

    if (s.length() == 1) {
        return longestPalindrome;
    }

    // assume the length of longest palindromic is odd
    for (int i = 1; i < s.length(); i++) {
        int j = 1;
        while (i - j >= 0 && i + j < s.length()) {
            if (s.charAt(i - j) == s.charAt(i + j)) {
                if (i - j == 0 || i + j == s.length() - 1) {
                    if (2 * j + 1 > maxLength) {
                        longestPalindrome = s.substring(i - j, i + j + 1);
                        maxLength = 2 * j + 1;
                    }
                    break;
                }
                j++;
            } else {
                if (2 * j - 1 > maxLength) {
                    longestPalindrome = s.substring(i - j + 1, i + j);
                    maxLength = 2 * j - 1;
                }
                break;
            }
        }
    }

    // assume the length of longest palindromic is even
    for (int i = 1; i < s.length(); i++) {
        int j = 1;
        while (i - j >= 0 && i + j - 1 < s.length()) {
            if (s.charAt(i - j) == s.charAt(i + j - 1)) {
                if (i - j == 0 || i + j - 1 == s.length() - 1) {
                    if (2 * j > maxLength) {
                        longestPalindrome = s.substring(i - j, i + j);
                        maxLength = 2 * j;
                    }
                    break;
                }
                j++;
            } else {
                if (2 * j - 2 > maxLength) {
                    longestPalindrome = s.substring(i - j + 1, i + j - 1);
                    maxLength = 2 * j - 2;
                }
                break;
            }
        }
    }

    return longestPalindrome;
}
```

## Review
- [100 Blocks a Day](https://waitbutwhy.com/2016/10/100-blocks-day.html)

## Tip
+ `TextView`如果设置了`textColorHighlight`，利用`ClickableSpan`之后点击文字背景会变色
+ `Activity`的四种启动模式
    + `standard` 每次都新建一个实例对象
    + `singleTop` 如果在任务栈顶发现了相同的实例则重用，否则新建并压入栈顶
    + `singleTask` 如果在任务栈中发现了相同的实例，将其上面的任务终止并移除，重用该实例。否则新建实例并入栈
    + `singleInstance` 允许不同应用，进程线程等共用一个实例，无论从何应用调用该实例都重用
    
+ 如果用了谷歌地图的SDK，并且target API≥28(Android 9.0)，需要在`<application>`中将`org.apache.http.legacy`设置为`false`

## Share