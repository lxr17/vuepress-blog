# 第三十六周ARTS总结
## Algorithm
- [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)
> 1ms | 94.66% Run time  
> 35.8MB | 100.00% Memory
```java
public int trap(int[] height) {
    // 思路：
    // 1. 找到最大值的索引
    // 2. 找到所有的顶点索引(顶点索引处的值比相邻两个数大，并且在最大值左边升序，在最大值右边降序)
    // 3. 计算水量

    // height的长度不足3构不成池子
    if (height.length <= 2) {
        return 0;
    }

    int maxIndex;// 最大值的索引
    int[] tops = new int[height.length];// 所有顶点索引
    Arrays.fill(tops, -1);

    // 找到最大值的索引(时间复杂度:O(n))
    maxIndex = 0;
    for (int i = 0; i < height.length; i++) {
        if (height[i] >= height[maxIndex]) {
            maxIndex = i;
        }
    }

    // 找到所有的顶点索引(时间复杂度:O(n))
    int leftIndex = -1;
    // 判断第一个数是不是顶点
    if (height[0] >= height[1]) {
        tops[++leftIndex] = 0;
    }
    // 索引<maxIndex的从左往右进行查找
    for (int i = 1; i < maxIndex; i++) {
        // 判断是不是顶点
        if (height[i] >= height[i - 1] && height[i] >= height[i + 1]) {
            // 第一个顶点
            if (leftIndex == -1) {
                tops[++leftIndex] = i;
                continue;
            }

            // 在最大值索引前的顶点，需升序；
            if (height[i] >= height[tops[leftIndex]]) {
                tops[++leftIndex] = i;
            }
        }
    }

    int rightIndex = tops.length;
    // 判断最后一个点是不是顶点
    if (height[height.length - 1] >= height[height.length - 2]) {
        tops[--rightIndex] = height.length - 1;
    }
    // 索引>=maxIndex的从右往左进行查找
    for (int i = height.length - 2; i >= maxIndex; i--) {
        // 判断是不是顶点
        if ((i == 0 && height[i] >= height[i + 1])
                || (height[i] >= height[i - 1] && height[i] >= height[i + 1])) {
            // 从右往左第一个顶点
            if (rightIndex == tops.length) {
                tops[--rightIndex] = i;
                continue;
            }

            // 在最大值索引后的顶点，需从右往左升序；
            if (height[i] >= height[tops[rightIndex]]) {
                tops[--rightIndex] = i;
            }
        }
    }

    System.arraycopy(tops, rightIndex, tops, leftIndex + 1,
            tops.length - rightIndex);

    // 计算水量(时间复杂度:O(n))
    int index = 0;
    int sum = 0;
    for (int i = 0; i < height.length; i++) {
        if (i < tops[index]) {
            // 为了方便理解，所以就写了这行代码
            continue;
        } else if (i >= tops[index] && i < tops[index + 1]) {
            int min = height[tops[index]];
            if (height[tops[index]] > height[tops[index + 1]]) {
                min = height[tops[index + 1]];
            }

            if (min > height[i]) {
                sum += min - height[i];
            }
        } else if (i == tops[index + 1]) {
            index++;
        }
    }

    return sum;
}
```

## Review
- [Oh Sh*t : There is no time to test](https://blog.novoda.com/no-time-to-test/)

## Tip
+ 刘海屏适配 [[1]](https://blog.csdn.net/guolin_blog/article/details/103112795)
    + 刘海屏的几种形式
        + Top Center
        + Top Corner
        + Bottom
        + Top + Bottom
    + `layoutInDisplayCutoutMode`属性（允许应用自主决定该如何对刘海屏设备进行适配）
        + `LAYOUT_IN_DISPLAY_CUTOUT_MODE_DEFAULT`：这是一种默认的属性，在不进行明确指定的情况下，系统会自动使用这种属性。这种属性允许应用程序的内容在竖屏模式下自动延伸到刘海区域，而在横屏模式下则不会延伸到刘海区域。
        + `LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES`：这种属性表示，不管手机处于横屏还是竖屏模式，都会允许应用程序的内容延伸到刘海区域。
        + `LAYOUT_IN_DISPLAY_CUTOUT_MODE_NEVER`：这种属性表示，永远不允许应用程序的内容延伸到刘海区域。
    + 如何保证自己的可互动区域不被刘海挡住
    ```java
    if (Build.VERSION.SDK_INT >= 28) {
        rootLayout.setOnApplyWindowInsetsListener(new View.OnApplyWindowInsetsListener() {
            @Override
            public WindowInsets onApplyWindowInsets(View view, WindowInsets windowInsets) {
                DisplayCutout displayCutout = windowInsets.getDisplayCutout();
                if (displayCutout != null) {
                    int left = displayCutout.getSafeInsetLeft();
                    int top = displayCutout.getSafeInsetTop();
                    int right = displayCutout.getSafeInsetRight();
                    int bottom = displayCutout.getSafeInsetBottom();
                }
                return windowInsets.consumeSystemWindowInsets();
            }
        });
    }
    ```
+ `Android`项目在导入`module`之后需要首先`implementation project(':xxx')`才能引用`module`中的类
+ `Android Support Library` [[2]](https://blog.csdn.net/guolin_blog/article/details/97142065)：
    + `support-v4`指这个库提供的**API**会一直支持到`API 4`
    + `appcompat-v7`指这个库提供的**API**会一直支持到`API 7`
    + 由于以上两个库慢慢实际功能以及对不上这个名字了(支持的**API**版本并不是名字所指的了)，于是就产生了`AndroidX`
    + `android.*`包下的都是随安卓系统下发的；`androidx.*`包下的都是随扩展库下发的
+ `Android`保活方案 [[3]](https://juejin.im/post/5df24da36fb9a0165c711807?utm_source=gold_browser_extension)
    + 1像素**Activity**
    + 前台服务 + `Notification`
    + 引导用户打开电池管理，允许应用后台运行
+ 进程死后拉活 [[4]](https://juejin.im/post/5df24da36fb9a0165c711807?utm_source=gold_browser_extension)
    + 监听系统静态广播
    + 监听三方静态广播
    + 利用系统**Service**机制拉活
    + 利用**JobScheduler**
    + 利用**AlarmManager**
    + 利用账号同步机制
    + 利用**Native**进程拉活
    + 利用双进程拉活

## Share
暂无内容

<Vssue title="第三十六周ARTS总结" />