# 第十周ARTS总结
## Algorithm
- [Integer to Roman](https://leetcode.com/problems/integer-to-roman/)
> 7ms | 15.99% Run time  
> 39.4MB | 14.43% Memory
```java
public String intToRoman(int num) {
    Map<Integer, String> map = new HashMap<>();
    map.put(1, "I");
    map.put(5, "V");
    map.put(10, "X");
    map.put(50, "L");
    map.put(100, "C");
    map.put(500, "D");
    map.put(1000, "M");

    StringBuilder stringBuilder = new StringBuilder();

    int digit = 1;
    while (num > 0) {
        int lastNum = num % 10;
        stringBuilder.insert(0, intToRomanForDigit(lastNum, digit, map));

        num = num / 10;
        digit = digit * 10;
    }

    return stringBuilder.toString();
}

private String intToRomanForDigit(int num, int digit, Map<Integer, String> source) {
    StringBuilder stringBuilder = new StringBuilder();

    if (9 == num) {// 9特殊处理
        stringBuilder.append(source.get(1 * digit)).append(source.get(10 * digit));
    } else if (4 == num) {// 4特殊处理
        stringBuilder.append(source.get(1 * digit)).append(source.get(5 * digit));
    } else {
        // 大于5
        if (num - 5 >= 0) {
            stringBuilder.append(source.get(5 * digit));
        }

        // 小于5的部分
        int ext = num % 5;
        while (ext > 0) {
            stringBuilder.append(source.get(digit));
            ext--;
        }
    }

    return stringBuilder.toString();
}
```

## Review
- [Converting your Android App to Jetpack](https://medium.com/google-developer-experts/converting-your-android-app-to-jetpack-85aecfce34d3)  

## Tip
+ 用到了反射的类不能被混淆，否则通过反射会找不到相应的方法

## Share
暂无内容

<Vssue title="第十周ARTS总结" />