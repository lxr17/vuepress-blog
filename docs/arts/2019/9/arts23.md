# 第二十三周ARTS总结
## Algorithm
- [Implement strStr()](https://leetcode.com/problems/implement-strstr/)
> 0ms | 100.00% Run time  
> 37.7MB | 67.94% Memory
```java
public int strStr(String haystack, String needle) {
    // needle is a empty string
    if (needle == null || needle.length() == 0) {
        return 0;
    }

    // needle比haystack长
    if (haystack == null || haystack.length() < needle.length()) {
        return -1;
    }

    for (int i = 0; i <= haystack.length() - needle.length(); i++) {
        String sub = haystack.substring(i, i + needle.length());

        if (needle.equals(sub)) {
            return i;
        }
    }

    return -1;
}
```

## Review
- [Search in a Sorted Array of Unknown Size](https://leetcode.com/articles/search-in-a-sorted-array-of-unknown-size/)

## Tip
+ `ScrollView`和`fitsSystemWindows`一起使用能够有效的处理`EditText`和软键盘的显示
+ 当给`View`设置背景为虚线时，宽度需要大于虚线的宽度，否则会显示不了虚线
+ `ViewPage`默认会加载本身和左右的`Fragment`，会销毁不相邻的`Fragment`
  
## Share