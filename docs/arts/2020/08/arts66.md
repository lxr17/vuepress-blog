# 第六十六周ARTS总结
## Algorithm
- [Scramble String](https://leetcode.com/problems/scramble-string/)
> 72ms | 5.49% Run time  
> 40.1MB | 17.91% Memory
```java
public boolean isScramble2(String s1, String s2) {
    if (s1.length() != s2.length()) return false;
    return solve(s1, s2);
}

Map<String, Boolean> map = new HashMap<>();

private boolean solve(String a, String b) {
    int n = a.length();
    if (a.equals(b)) return true;

    String key = a + " " + b;
    if (map.containsKey(key)) {
        return map.get(key);
    }

    boolean flag = false;

    for (int i = 1; i <= n - 1; i++) {
        boolean noswap = solve(a.substring(0, i), b.substring(0, i)) &&
                solve(a.substring(i), b.substring(i));

        boolean swap = solve(a.substring(0, i), b.substring(n - i)) &&
                solve(a.substring(i), b.substring(0, n - i));

        if (swap || noswap) {
            flag = true;
            break;
        }
    }

    map.put(key, flag);
    return flag;
}
```

## Review
- [The Illustrated Children’s Guide to Kubernetes](https://www.cncf.io/the-childrens-illustrated-guide-to-kubernetes/)

## Tip
+ **aar**的一些常识：
    + 注意事项：
        1. 应用模块的`minSdkVersion`必须大于等于`Library Module`中定义的版本
        2. 资源合并问题，通过`resourcePrefix "<前缀>"`来规范化资源命名
        3. **assets**资源需要放在应用模块中，不支持放在**aar**文件中
        4. **aar**的混淆
            > 注意：**aar**的混淆规则可能会影响**APP**，因此不需要把**aar**的混淆规则设置的太大
        5. 使用**Android Studio**打包出来的**aar**，不会将其依赖的三方库打包进去
+ `Calendar.getInstance().get(Calendar.MONTH)`是从**0**开始的，而不是**1**
+ 熟练的使用**剪切板**功能进行数据传递
+ `RecyclerView`的相关类：
    + `LayoutManager`：用于对`RecyclerView`内部的`View`测量以及排版
    + `ItemDecoration`：用于对`RecyclerView`中`View`之间的间隔进行绘制，`onDrawOver`很有意思
    + `SnapHelper`：用于让`RecyclerView`滑动过程始终让指定条目居中
+ 搭建**APP**时需要注意的点：
    + 使用**AndroidAutoSize**来进行屏幕的适配
    + 使用**git**的提交次数作为版本号，使用**tag**的名称作为版本名称
    + 不同环境的配置直接写在**gradle**文件中，切换环境不需要手动修改代码
    + 正式环境**不允许**抓包，通过配置**networkSecurityConfig**来实现
    + 所有的单色图片都只保留一种，通过**tint**来着色
    + 在**gradle**中配置`resourcePrefix`来规范资源的前缀
    + 不管采用那种架构方式，都按照业务进行分包

## Share
暂无内容