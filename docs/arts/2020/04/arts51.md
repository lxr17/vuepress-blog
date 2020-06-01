# 第五十一周ARTS总结
## Algorithm
- [Length of Last Word](https://leetcode.com/problems/length-of-last-word/)
> 1ms | 41.93% Run time  
> 37.8MB | 7.57% Memory
```java
public int lengthOfLastWord(String s) {
    String[] strings = s.split(" ");

    if (strings.length == 0) {
        return 0;
    }

    return strings[strings.length - 1].length();
}
```
----

- [Spiral Matrix II](https://leetcode.com/problems/spiral-matrix-ii/)
> 0ms | 100.00% Run time  
> 37.3MB | 8.33% Memory
```java
public int[][] generateMatrix(int n) {
    int[][] ans = new int[n][n];

    // 圈数-1
    int circle = 0;

    // 当前数字
    int currentNum = 1;

    while (n - circle - 1 - circle >= 0) {
        // 四个点坐标
        int leftTopX = circle;
        int leftTopY = circle;
        int leftBottomX = n - circle - 1;
        int leftBottomY = circle;
        int rightTopX = circle;
        int rightTopY = n - circle - 1;
        int rightBottomX = n - circle - 1;
        int rightBottomY = n - circle - 1;

        // 左上→右上
        for (int y = leftTopY; y <= rightTopY; y++) {
            ans[leftTopX][y] = currentNum++;
        }

        // 右上→右下
        for (int x = rightTopX + 1; x <= rightBottomX; x++) {
            ans[x][rightTopY] = currentNum++;
        }

        // 右下→左下
        for (int y = rightBottomY - 1; y >= leftBottomY; y--) {
            ans[rightBottomX][y] = currentNum++;
        }

        // 左下→左上(注意这里没有=)
        for (int x = leftBottomX - 1; x > leftTopX; x--) {
            ans[x][leftBottomY] = currentNum++;
        }

        circle++;
    }

    return ans;
}
```

## Review
- [Butterfly Effects](https://www.zacsweers.dev/butterfly-effects/)

## Tip
+ Uri的两部分：
    + authority：用于确定唯一的APP
    + path：用于区分具体访问哪张表
+ **如果不在清单文件里声明权限，仅仅动态申请了权限，则自动拒绝该权限**
+ `ContentProvider`会在应用程序启动时就初始化
+ **UriMatcher**：可帮助在`ContentProvider`中匹配`Uri`
+ `ContentProvider`中的`getType`为**MIME**类型，分三部分：
    1. **vnd**开头
    2. 如果**Uri**以路径结尾，则`android.cursor.dir/`；如果**Uri**路径以**id**结尾，则`android.cursor.item/`
    3. `vnd.<authority>.<path>`

## Share
暂无内容