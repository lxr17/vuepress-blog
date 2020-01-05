# 第三十八周ARTS总结
## Algorithm
- [Wildcard Matching](https://leetcode.com/problems/wildcard-matching/)
> 6ms | 77.47% Run time  
> 38.3MB | 93.02% Memory
```java
public boolean isMatch(String s, String p) {
    if (p.equals(s)) {
        return true;
    }

    // 此时 s.length() > 0
    if (p.length() == 0) {
        return false;
    }

    // 1.拆分匹配规则
    // 2.分段匹配

    // 拆分匹配规则
    String[] pArray = p.split("\\*");

    int firstMatchIndex = s.length();
    int lastMatchIndex = -1;

    int[] match;

    // 开始索引
    int startIndex = 0;

    // 分段匹配
    for (int i = 0; i < pArray.length; i++) {
        String segment = pArray[i];
        if (segment.length() == 0) {
            continue;
        }

        // 分段匹配
        if (pArray.length == 1 && p.charAt(p.length() - 1) == '*') {// 针对于只有一段的情况
            match = findMatchIndex(s, segment, startIndex);
        } else if (i == pArray.length - 1) {// 最后一段(有多段的情况下的最后一段)
            match = findLastMatchIndex(s, segment, startIndex);
        } else {// 其他段
            match = findMatchIndex(s, segment, startIndex);
        }

        if (match[0] <= firstMatchIndex) {
            firstMatchIndex = match[0];
        }

        if (match[1] - 1 >= lastMatchIndex) {
            lastMatchIndex = match[1] - 1;
        }

        startIndex = match[1];
        if (-1 == startIndex) {
            return false;
        }
    }

    // 只要走到这儿，就说明所有的分段都匹配成功了
    // 正则的首部匹配
    // 正则的尾部匹配
    return (p.charAt(0) == '*' || firstMatchIndex == 0)
            && (p.charAt(p.length() - 1) == '*' || lastMatchIndex == s.length() - 1);
}

/**
 * 找到匹配部分索引，从前往后匹配
 *
 * @param s          原始字符串
 * @param p          匹配规则
 * @param startIndex 开始索引
 * @return 部分匹配成功之后，返回匹配的一个区间(左闭右开)，其中-1表示未匹配成功
 */
public int[] findMatchIndex(String s, String p, int startIndex) {
    int[] match = new int[]{-1, -1};

    if (startIndex >= s.length()) {
        return match;
    }

    // 记录p的索引
    int pIndex = 0;
    // 记录s的索引
    int sIndex = startIndex++;

    // 注意 p.length() > s.length() 的情况
    while (pIndex < p.length() && sIndex < s.length()) {
        boolean isMatch = p.charAt(pIndex) == '?' || s.charAt(sIndex) == p.charAt(pIndex);
        if (isMatch) {// 匹配成功
            if (pIndex == p.length() - 1) {// 最后一位
                match[0] = startIndex - 1;
                match[1] = sIndex + 1;
                return match;
            }

            ++sIndex;
            ++pIndex;
        } else if (startIndex < s.length() - p.length() + 1) {// 下一个候选人
            sIndex = startIndex++;
            pIndex = 0;
        } else {
            return match;
        }
    }

    return match;
}

/**
 * 找到匹配部分索引，从后往前匹配
 * 针对于 s="aaaa", p="***a" 的例子特地增加此方法
 *
 * @param s          原始字符串
 * @param p          匹配规则
 * @param startIndex 开始索引
 * @return 部分匹配成功之后，返回匹配的一个区间(左闭右开)，其中-1表示未匹配成功
 */
public int[] findLastMatchIndex(String s, String p, int startIndex) {
    int[] match = new int[]{-1, -1};

    if (startIndex >= s.length()) {
        return match;
    }

    // 从后往前匹配的开始索引
    int endIndex = s.length() - 1;
    // 记录p的索引
    int pIndex = p.length() - 1;
    // 记录s的索引
    int sIndex = endIndex--;

    while (pIndex >= 0 && sIndex >= startIndex) {
        boolean isMatch = p.charAt(pIndex) == '?' || s.charAt(sIndex) == p.charAt(pIndex);
        if (isMatch) {// 匹配成功
            if (pIndex == 0) {// 最后一位
                match[0] = sIndex;
                match[1] = sIndex + p.length();
                return match;
            }

            --sIndex;
            --pIndex;
        } else if (endIndex - startIndex >= p.length() - 1) {// 下一个候选人
            sIndex = endIndex--;
            pIndex = p.length() - 1;
        } else {
            return match;
        }
    }

    return match;
}
```

----
- [Jump Game II](https://leetcode.com/problems/jump-game-ii/)
> 129ms | 27.06% Run time  
> 38MB | 100.00% Memory
```java
public int jump(int[] nums) {
    // 1.找出第一个能跳到last index的索引记作p1
    // 2.找出第一个能跳到p1的索引记作p2
    // ...
    // n.直到找到索引0

    int step = 0;// 跳的步数
    int reach = nums.length - 1;// 需要到达点

    while (reach > 0) {
        for (int i = 0; i < reach; i++) {
            if (i + nums[i] >= reach) {
                reach = i;
                ++step;
                break;
            }
        }
    }

    return step;
}
```

## Review
- [Hello Kotlin](https://medium.com/@magdamiu/hello-kotlin-774b44cd9df0)

## Tip
+ 由于一个`DVM`中存储方法`ID`用的是`short`类型，所以导致`dex`中的方法不能超过**65535**个 [[1]](https://mp.weixin.qq.com/s/1rijnlVyxy6Ng3A7RKMe7A)
+ 一个`ClassLoader`可以包含多个`dex`文件，每个`dex`文件是一个`Element`，多个`dex`文件排列成一个有序的数组就是`dexElements` [[2]](https://mp.weixin.qq.com/s/1rijnlVyxy6Ng3A7RKMe7A)
+ 当找类的时候，会按顺序遍历`dex`文件，然后从当前遍历的`dex`文件中找类，如果找到该类则返回，如果找不到从下一个`dex`文件继续查找 [[3]](https://mp.weixin.qq.com/s/1rijnlVyxy6Ng3A7RKMe7A)
+ 热修复原理：如果有个`class`里面有`bug`，我们只需要提供一个一样的`class`，并把它打包成`dex`，通过反射，放到`dexElements`最前端，那就会加载我们新的`class`，之前的有问题的`class`就被覆盖了 [[4]](https://mp.weixin.qq.com/s/1rijnlVyxy6Ng3A7RKMe7A)
+ `Java`的四种引用类型 [[5]](https://juejin.im/post/5e0967fc6fb9a016253c20e0?utm_source=gold_browser_extension)：
    + 强引用
    + 软引用
    + 弱引用
    + 虚引用

## Share
暂无内容

<Vssue title="第三十八周ARTS总结" />