# 第六十二周ARTS总结
## Algorithm
- [Search in Rotated Sorted Array II](https://leetcode.com/problems/search-in-rotated-sorted-array-ii/)
> 0ms | 100.00% Run time  
> 39.4MB | 62.33% Memory
```java
public boolean search(int[] nums, int target) {
    // 原本思路：
    // 1. 找到分割点
    // 2. 判断target在哪一边
    // 3. 针对于那一边采用二分法
    // 但是：步骤1很难达到，于是就用了简单粗暴的直接遍历

    for (int num : nums) {
        if (num == target) {
            return true;
        }
    }

    return false;
}
```

## Review
- [Longest Single Letter .com Domain Name](https://maori.geek.nz/longest-single-letter-com-domain-name-4faf81548a21)

## Tip
+ **char**相关知识点
    + `char`本质上是一个固定占用两个字节的无符号正整数，这个正整数对应于`Unicode`编号，用于表示那个`Unicode`编号对应的字符
    + 由于固定占用两个字节，`char`只能表示`Unicode`编号在**65536**以内的字符，而不能表示超出范围的字符
    + 超出范围的字符使用两个`char`表示
+ 当条件比较多时，用`switch`比用`if/else`更好的原因是：`if/else`多用**条件跳转**与**无条件跳转**，而`switch`多用**跳转表**，跳转表会使用二分法查找对应的值
+ 枚举类的`ordinal`属性指的是他在类中的顺序值
+ **子网掩码**：是用来判断任意两个计算机是否处于同一子网的依据，一般有`255.255.255.0`和`255.255.0.0`
+ **网关**：用于处理不同网络之间的通信，通常情况下是具有路由功能的设备**IP**地址，例如路由器
+ **DHCP**：自动给网络中的电脑分配**IP**、**子网掩码**、**默认网关**

## Share
暂无内容