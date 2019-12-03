# 第六周ARTS总结
## Algorithm
- [String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/)
> 3ms | 62.44% Run time  
> 35.3MB | 99.97% Memory
```java
public int myAtoi(String str) {
    // empty
    if (str == null || str.length() == 0 || str.trim().length() == 0) {
        return 0;
    }

    StringBuilder stringBuilder = new StringBuilder();
    for (char ch : str.trim().toCharArray()) {
        if (stringBuilder.length() == 0 && (ch == '+' || ch == '-')) {
            stringBuilder.append(ch);
            continue;
        }

        if (Character.isDigit(ch)) {
            stringBuilder.append(ch);
        } else {
            break;
        }
    }

    // if empty
    if (stringBuilder.length() == 0) {
        return 0;
    }

    // if -
    if ("-".equals(stringBuilder.toString()) || "+".equals(stringBuilder.toString())) {
        return 0;
    }

    try {
        return Integer.parseInt(stringBuilder.toString());
    } catch (NumberFormatException ex) {
        if (stringBuilder.toString().startsWith("-")) {
            return Integer.MIN_VALUE;
        } else {
            return Integer.MAX_VALUE;
        }
    }
}
```

## Review
- [Lazy assignment in Java](https://javax0.wordpress.com/2019/05/15/lazy-assignment-in-java/)  
**note:While Scala and Kotlin give you the fish, Java teaches you to catch your own fish.**

## Tip
+ 断言：指明某个字符串前边或者后边将会出现满足某种规律的字符串。  
  想指定xxx前肯定会出现`<title>`，就用反向肯定预查，表达式：`(?<=<title>)·*`，  
  想指定xxx后肯定会出现`</title>`，就用正向肯定预查，表达式：`.*(?=</title>)`，  
  因此`<title>`xxx`</title>`通过`(?<=<title>).*(?=</title>)`就能匹配到xxx。

## Share
暂无内容

<Vssue title="第六周ARTS总结" />