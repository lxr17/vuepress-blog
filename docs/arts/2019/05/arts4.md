# 第四周ARTS总结
## Algorithm
- [ZigZag Conversion](https://leetcode.com/problems/zigzag-conversion/)
> 27ms | 31.14% Run time  
> 43.8MB | 5.02% Memory
```java
public String convert(String s, int numRows) {
    if (numRows == 1) {
        return s;
    }

    int columnNum = s.length() / 2 + 1;
    Character[][] arr = new Character[numRows][columnNum];

    StringBuilder stringBuilder = new StringBuilder();

    int lastX = 0;
    int lastY = 0;
    for (int i = 0; i < s.length(); i++) {
        if (lastY % (numRows - 1) == 0 && lastX < numRows - 1) {
            arr[lastX][lastY] = s.charAt(i);
            lastX++;
        } else {
            arr[lastX][lastY] = s.charAt(i);
            lastY++;
            lastX--;
        }
    }

    for (int i = 0; i < arr.length; i++) {
        for (int j = 0; j < arr[i].length; j++) {
            if (arr[i][j] != null) {
                stringBuilder.append(arr[i][j]);
            }
        }
    }

    return stringBuilder.toString();
}
```

## Review
- [What Makes You You?](https://waitbutwhy.com/2014/12/what-makes-you-you.html)

## Tip
+ 利用Mock可以在本地搭建假接口服务器，请求参数等细节都在json中配置
+ Mock中json,form,queries的区别
+ 这正则表达式中`\w+`表示任意多个字符(＞0个)
+ 正则表达式中`{}`表示限定，内部只能是数字

## Share