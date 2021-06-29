# 第七十周ARTS总结
## Algorithm
- [Decode Ways](https://leetcode.com/problems/decode-ways/)
> 7ms | 8.08% Run time  
> 39.4MB | 5.87% Memory
```java
public int numDecodings2(String s) {
    char[] chars = s.toCharArray();

    // 字符串开头是0的话，不可解码
    if (chars.length == 0 || chars[0] == '0') {
        return 0;
    }

    // 所有不同的情况（key为走到的索引值，value为走到这儿一共有多少种方法）
    Map<Integer, Integer> ways = new HashMap<>();
    boolean isOver = false;

    while (!isOver) {
        isOver = true;

        if (ways.size() == 0) {
            if (chars.length == 1) {
                ways.put(0, 1);
            } else if (chars.length >= 2) {
                ways.put(0, 1);

                // 前两位
                int preTwo = Integer.parseInt(new String(new char[]{chars[0], chars[1]}));
                if (preTwo <= 26) {
                    ways.put(1, 1);
                }

                isOver = false;
            }
        } else {
            Map<Integer, Integer> newWays = new HashMap<>();
            for (int index : ways.keySet()) {
                int count = ways.get(index);

                if (index == chars.length - 1) {// 该方法已经走到终点(证明该方法可行)
                    newWays.put(index, count + newWays.getOrDefault(index, 0));
                    continue;
                } else if (index == chars.length - 2) {// 该方法走到了终点前一位
                    // 最后一位不是0这种方法才成立
                    if (chars[index + 1] != '0') {
                        newWays.put(index + 1, count + newWays.getOrDefault(index + 1, 0));
                    }
                } else {
                    if (chars[index + 1] != '0') {
                        newWays.put(index + 1, count + newWays.getOrDefault(index + 1, 0));

                        // 后两位
                        int lastTwo = Integer.parseInt(new String(new char[]{chars[index + 1], chars[index + 2]}));
                        if (lastTwo <= 26) {
                            newWays.put(index + 2, count + newWays.getOrDefault(index + 2, 0));
                        }

                        isOver = false;
                    }
                }
            }

            ways.clear();
            ways.putAll(newWays);
        }
    }

    if (ways.size() == 1) {
        return ways.get(chars.length - 1);
    }

    return 0;
}
```

## Review
- []()

## Tip

## Share
暂无内容