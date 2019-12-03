# 第十二周ARTS总结
## Algorithm
- [Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/)
> 1ms | 73.74% Run time  
> 37.7MB | 83.49% Memory
```java
public String longestCommonPrefix(String[] strs) {
    if (strs.length == 0) {
        return "";
    }

    if (strs.length == 1) {
        return strs[0];
    }

    int index = -1;
    while (true) {
        boolean isEqual = true;

        // 判断第 index + 1 位是否一致
        for (int i = 0; i < strs.length - 1; i++) {
            if (strs[i].length() < index + 2 || strs[i + 1].length() < index + 2) {
                isEqual = false;
                break;
            }

            if (strs[i].charAt(index + 1) != strs[i + 1].charAt(index + 1)) {
                isEqual = false;
            }
        }

        // 如果一致，那索引加一
        if (isEqual) {
            index++;
        } else {
            break;
        }
    }

    return strs[0].substring(0, index + 1);
}
```

## Review
- [20+ Awesome Open-Source Android Apps To Boost Your Development Skills](https://blog.aritraroy.in/20-awesome-open-source-android-apps-to-boost-your-development-skills-b62832cf0fa4) 

## Tip
+ 在Android Studio中可以设置预览尺寸，配合着`AutoSize`一起用很好用

## Share
暂无内容

<Vssue title="第十二周ARTS总结" />