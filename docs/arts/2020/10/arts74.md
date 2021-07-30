# 第七十四周ARTS总结
## Algorithm
- [Interleaving String](https://leetcode.com/problems/interleaving-string/)
> 7ms | 30.06% Run time  
> 37.3MB | 72.33% Memory
```java
public boolean isInterleave(String s1, String s2, String s3) {
    // 长度不相等，必定不匹配
    if (s1.length() + s2.length() != s3.length()) {
        return false;
    }

    // 一种简单的匹配
    if (s1.length() == 0) {
        return s2.equals(s3);
    }
    if (s2.length() == 0) {
        return s1.equals(s3);
    }

    // 记 s[i] 表示 s 字符串的 s[0, i) 子串
    // dp[i][j] 代表 s1[i] 与 s2[j] 能否交叉匹配到 s3[i + j]
    // 1  1  1  1  1  1  1  1
    // 1  1  1  1  1  1  1  1
    // 1  1  1  1  1  1  1  1
    // 1  1  1  1  1  1  1  1
    boolean[][] dp = new boolean[s1.length() + 1][s2.length() + 1];

    // 主要思路
    // 1. 如果 s1[i] 的末尾字符等于 s3[i + j] 的末尾字符，则只需要知道 s1[i - 1] 与 s2[j] 是否能交叉匹配即可
    // 2. 如果 s2[j] 的末尾字符等于 s3[i + j] 的末尾字符，则只需要知道 s1[i] 与 s2[j - 1] 是否交叉匹配即可
    // 3. 如果 s3[i + j] 的末尾字符和 s1[i] 的末尾字符、 s2[j] 的末尾字符都不匹配，则 dp[i][j] = false
    // 4. 如果 1. 或 2. 成立，则 dp[i][j] = true ，否则 false
    // 5. 边界条件为 dp[1][0] 和 dp[0][1]
    dp[0][0] = true;
    for (int i = 0; i < s1.length() + 1; i++) {
        for (int j = 0; j < s2.length() + 1; j++) {
            // 条件1
            if (i > 0 && s3.charAt(i + j - 1) == s1.charAt(i - 1) && dp[i - 1][j]) {
                dp[i][j] = true;
            }

            // 条件2
            if (j > 0 && s3.charAt(i + j - 1) == s2.charAt(j - 1) && dp[i][j - 1]) {
                dp[i][j] = true;
            }
        }
    }

    return dp[s1.length()][s2.length()];
}
```

## Review
- []()

## Tip
+ 

## Share
暂无内容