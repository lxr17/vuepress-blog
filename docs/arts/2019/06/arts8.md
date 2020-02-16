# 第八周ARTS总结
## Algorithm
- [Regular Expression Matching](https://leetcode.com/problems/regular-expression-matching/)
> 61ms | 14.81% Run time  
> 41.2MB | 23.09% Memory
```java
public boolean isMatch(String s, String p) {
    if (p.isEmpty()) {
        return s.isEmpty();
    }

    boolean first_match = (!s.isEmpty() &&
            (p.charAt(0) == s.charAt(0) || p.charAt(0) == '.'));

    if (p.length() >= 2 && p.charAt(1) == '*') {
        return (isMatch(s, p.substring(2)) ||
                (first_match && isMatch(s.substring(1), p)));
    } else {
        return first_match && isMatch(s.substring(1), p.substring(1));
    }
}
```
**注：该题参考了solution的解法**

## Review
- [Get Xposed](https://www.xda-developers.com/xposed-framework-hub/)
- [Android app 在线更新那点事儿（适配Android6.0、7.0、8.0）](https://juejin.im/post/5ad4ab7af265da239d49c8f9#heading-5)

## Tip
+ 方法  
```java
public static void main(String[] args) {
    Object o1 = true ? new Integer(1) : new Double(0.1);
    Object o2 = new Integer(1);
    System.out.println(o1);
    System.out.println(o2);
}
```
的输出结果是 
>1.0  
>1

第一行会被编译为
`Object o1 = Double.valueOf(new Integer(1).intValue());`

## Share
暂无内容