# 第十一周ARTS总结
## Algorithm
- [Roman to Integer](https://leetcode.com/problems/roman-to-integer/)
```java
public int romanToInt(String s) {
    Map<String, Integer> map = new HashMap<>();
    map.put("I", 1);
    map.put("V", 5);
    map.put("X", 10);
    map.put("L", 50);
    map.put("C", 100);
    map.put("D", 500);
    map.put("M", 1000);
    map.put("IV", 4);
    map.put("IX", 9);
    map.put("XL", 40);
    map.put("XC", 90);
    map.put("CD", 400);
    map.put("CM", 900);

    int sum = 0;

    char[] chars = s.toCharArray();

    // 单个字符遍历求和
    for (int i = 0; i < chars.length; ) {
        String chs;
        if (i + 1 < chars.length) {
            chs = chars[i] + "" + chars[i + 1];
        } else {
            chs = chars[i] + "";
        }

        if (map.get(chs) == null) {
            chs = chs.substring(0, 1);
        }

        sum = sum + map.get(chs);

        i = i + chs.length();
    }

    return sum;
}
```

## Review
- [Exploring the v28 Android Design Support Library Additions](https://medium.com/google-developer-experts/exploring-the-v28-android-design-support-library-2c96c6031ae8)  

## Tip
+ `Base64`编码过程：将字符转成二进制，并每6位重新进行编码，不足补`=`
+ `Base64`解码过程：将字符去掉`=`，然后转成二进制，并每8位重新编码

## Share