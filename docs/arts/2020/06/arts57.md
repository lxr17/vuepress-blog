# 第五十七周ARTS总结
## Algorithm
- [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
> 0ms | 100.00% Run time  
> 38.3MB | 5.05% Memory
```java
public int climbStairs(int n) {
//  // 这是斐波那契数列
//  if (n == 1) {
//      // 此时只有一种：1
//      return 1;
//  } else if (n == 2) {
//      // 此时有两种：1、1；2
//      return 2;
//  } else {
//      // 走一步的后续情况 + 走两步的后续情况
//      return climbStairs(n - 1) + climbStairs(n - 2);
//  }

    if (n == 1) {
        return 1;
    } else if (n == 2) {
        return 2;
    }

    int first = 1;
    int second = 2;

    // 将递归转换成遍历
    for (int i = 2; i < n; i++) {
        int temp = second;
        second = first + second;
        first = temp;
    }

    return second;
}
```
----

- [Simplify Path](https://leetcode.com/problems/simplify-path/)
> 6ms | 46.92% Run time  
> 40.9MB | 13.48% Memory
```java
public String simplifyPath(String path) {
    List<String> simplifyList = new ArrayList<>();

    // 先进行拆分
    String[] splits = path.split("/");

    // 然后精简
    for (String str : splits) {
        switch (str) {
            case "":
            case ".":
                break;
            case "..":
                if (simplifyList.size() > 0) {
                    simplifyList.remove(simplifyList.size() - 1);
                }
                break;
            default:
                simplifyList.add(str);
                break;
        }
    }

    // 最后合并
    StringBuilder builder = new StringBuilder();
    for (String str : simplifyList) {
        builder.append("/").append(str);
    }

    if (builder.length() == 0) {
        return "/";
    } else {
        return builder.toString();
    }
}
```

## Review
- [Enum vs Sealed class — which one to choose?](https://blog.kotlin-academy.com/enum-vs-sealed-class-which-one-to-choose-dc92ce7a4df5)

## Tip
+ **Service**如果需要在前台，需要申请**FOREGROUND_SERVICE**权限
+ 获取定位的方式：
    + **GPS**：通过硬件的**GPS**直接与卫星进行交互，优点是精度高，缺点是室内几乎接收不到信号
    + **网络**：根据手机当前网络附近三个基站进行测速，计算出手机和每个基站的距离，进而计算出手机的位置，缺点是精度不高（由于谷歌网络在国内不可用，故该原生方式不可用）
+ 获取签名文件的信息：`keytool -list -v -keystore <签名文件路径>`
+ 在**Android Studio**中可以通过`Gradle\app\Task\android\signingReport`获取测试秘钥信息
+ **Toolbar**中属性的意思：
    + **theme**：区别于**APP**主题，专属于**Toolbar**的主题，主要区分深色主题和浅色主题
    + **popupTheme**：用于指定弹出菜单的主题
+ 只有`setSupportActionBar(toolbar);`之后**Toolbar**才会完全变成**ActionBar**，否则不会具有**ActionBar**的一些特性
+ 菜单文件中`showAsAction`的意思：
    + **always**：永远显示在**Toolbar**中，屏幕不够则不显示
    + **ifRoom**：屏幕空间够的情况显示在**Toolbar**中，不够则显示在菜单中
    + **never**：永远显示在菜单中
    

## Share
暂无内容