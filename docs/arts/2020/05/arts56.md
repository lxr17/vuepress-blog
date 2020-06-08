# 第五十六周ARTS总结
## Algorithm
- [Add Binary](https://leetcode.com/problems/add-binary/)
> 2ms | 76.04% Run time  
> 39.1MB | 52.79% Memory
```java
public String addBinary(String a, String b) {
    StringBuilder stringBuilder = new StringBuilder();

    // 进位
    int carry = 0;
    // 从后往前索引
    int index = 0;

    // a和b在索引处的值
    int aSingle = 0;
    int bSingle = 0;

    int aLength = a.length();
    int bLength = b.length();

    while (carry > 0 || aLength - 1 - index >= 0 || bLength - 1 - index >= 0) {
        if (aLength - 1 - index >= 0) {
            aSingle = parse(a.charAt(aLength - 1 - index));
        } else {
            aSingle = 0;
        }

        if (bLength - 1 - index >= 0) {
            bSingle = parse(b.charAt(bLength - 1 - index));
        } else {
            bSingle = 0;
        }

        // 相加
        int temp = aSingle + bSingle + carry;
        carry = temp / 2;
        stringBuilder.insert(0, temp % 2);

        index++;
    }

    return stringBuilder.toString();
}

/**
 * 将单个字符转成数字
 *
 * @param ch
 * @return
 */
public int parse(char ch) {
    return ch == '1' ? 1 : 0;
}
```
----

- [Text Justification](https://leetcode.com/problems/text-justification/)
> 1ms | 53.14% Run time  
> 37.4MB | 90.36% Memory
```java
public List<String> fullJustify(String[] words, int maxWidth) {
    List<String> ans = new ArrayList<>();

    // 当前组的单词集合
    List<String> wordList = new ArrayList<>();

    // 当前组单词字符总数
    int charCount = 0;

    // 遍历单词集合，进行分组
    for (int i = 0; i < words.length; i++) {
        String temp = words[i];

        // 字符总和+最少空格数<=maxWidth的情况下
        if (temp.length() + charCount + wordList.size() <= maxWidth) {
            wordList.add(temp);
            charCount = charCount + temp.length();
        } else {
            ans.add(merge(wordList, maxWidth, charCount, false));

            wordList.clear();
            wordList.add(temp);
            charCount = temp.length();
        }

        if (i == words.length - 1) {
            ans.add(merge(wordList, maxWidth, charCount, true));
        }
    }

    return ans;
}

/**
 * 将data合并为一个字符串
 *
 * @param data       数据
 * @param maxWidth   最大宽度
 * @param charCount  data中字符串的字符总数
 * @param isLastLine 是否为最后一行
 * @return
 */
private String merge(List<String> data, int maxWidth, int charCount, boolean isLastLine) {
    StringBuilder stringBuilder = new StringBuilder(maxWidth);

    // 剩余空格数
    int restCount = maxWidth - charCount;

    // 单词之间需要填充的空格数
    int space = 0;

    // 此时单独处理
    if (data.size() == 1) {
        char[] fill = new char[restCount];
        Arrays.fill(fill, ' ');
        stringBuilder.append(data.get(0)).append(fill);

        return stringBuilder.toString();
    }

    // 开始合并
    for (int i = 0; i < data.size(); i++) {
        String temp = data.get(i);

        if (isLastLine) {
            // 最后一行需要左对齐
            space = 1;
        } else {
            // 由于左边的空格需要比右边多，因此存在余数的情况下得加一
            space = restCount / (data.size() - i) + (restCount % (data.size() - i) == 0 ? 0 : 1);
        }

        // 第一个单词
        if (i == 0) {
            stringBuilder.append(temp);
        } else if (i == data.size() - 1) {
            if (isLastLine) {
                // 最后一行的最后一个单词需要左对齐
                char[] fill = new char[restCount - 1];
                Arrays.fill(fill, ' ');
                stringBuilder.append(' ').append(temp).append(fill);
            } else {
                // 填充剩余的空格和最后一个单词
                char[] fill = new char[restCount];
                Arrays.fill(fill, ' ');
                stringBuilder.append(fill).append(temp);
            }

            return stringBuilder.toString();
        } else {
            // 填充单词与空格
            char[] fill = new char[space];
            Arrays.fill(fill, ' ');
            stringBuilder.append(fill).append(temp);

            restCount = restCount - space;
        }
    }

    return stringBuilder.toString();
}
```
----
- [Sqrt(x)](https://leetcode.com/problems/sqrtx/)
> 1ms | 100.00% Run time  
> 36.8MB | 43.50% Memory
```java
public int mySqrt(int x) {
    return (int) Math.sqrt(x);
}
```

## Review
- []()

## Tip
+ 

## Share
暂无内容