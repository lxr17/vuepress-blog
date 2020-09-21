# 第六十四周ARTS总结
## Algorithm
- [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)
> 811ms | 9.55% Run time  
> 41.4MB | 42.75% Memory
```java
public int largestRectangleArea(int[] heights) {
    // 最大面积
    int maxArea = 0;

    // 最小值
    int minValue;

    for (int i = 0; i < heights.length; i++) {
        minValue = heights[i];

        // [i, j]区间面积最大值
        for (int j = i; j < heights.length; j++) {
            // 重新判断最小值
            if (heights[j] < minValue) {
                minValue = heights[j];
            }

            // [i, j]区间的面积
            int area = minValue * (j - i + 1);
            if (area > maxArea) {
                maxArea = area;
            }
        }
    }

    return maxArea;
}
```

- [Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/)
> 13ms | 33.89% Run time  
> 41.6MB | 99.08% Memory
```java
public int maximalRectangle(char[][] matrix) {
    if (matrix.length == 0) {
        return 0;
    }

    int maxRect = 0;

    for (int i = 0; i < matrix.length; i++) {
        for (int j = 0; j < matrix[0].length; j++) {
            int[] coordinate = new int[]{i, j};

            if (isPossible(matrix, coordinate, maxRect)) {
                int rect = findMaxRectangle(matrix, coordinate);

                if (rect > maxRect) {
                    maxRect = rect;
                }
            }
        }
    }

    return maxRect;
}

/**
 * 判断当前坐标可不可能作为顶点
 *
 * @param matrix
 * @param coordinate
 * @param maxRect    目前最大矩形
 * @return
 */
private boolean isPossible(char[][] matrix, int[] coordinate, int maxRect) {
    // 如果是0不可能为顶点
    if (matrix[coordinate[0]][coordinate[1]] == 0) {
        return false;
    }

    // 如果左边的点为1，则该点也不能为顶点
    if (coordinate[1] - 1 >= 0 && matrix[coordinate[0]][coordinate[1] - 1] == 1) {
        return false;
    }

    // 如果剩余部分最大面积比maxRect还小，则不能为顶点
    if ((matrix.length - coordinate[0]) * (matrix[0].length - coordinate[1]) < maxRect) {
        return false;
    }

    return true;
}

/**
 * 以coordinate为左上顶点的最大矩形
 *
 * @param matrix
 * @param coordinate 矩形左上角坐标
 * @return
 */
private int findMaxRectangle(char[][] matrix, int[] coordinate) {
    // 最大矩形
    int maxRect = 0;

    // height行内的最小宽度
    int minWidth = matrix[0].length;

    // 高度
    int height = 1;

    // 以coordinate为顶点，第height列的首个坐标为1的情况下继续
    while (coordinate[0] + height <= matrix.length
            && matrix[coordinate[0] + height - 1][coordinate[1]] == '1') {
        int width = 0;

        for (int i = coordinate[1]; i < matrix[0].length; i++) {
            // 这里多了一个 `width < minWidth` 是为了减少比较
            if (width < minWidth && matrix[coordinate[0] + height - 1][i] == '1') {
                width++;
            } else {
                break;
            }
        }

        // 重置最小宽度
        if (width < minWidth) {
            minWidth = width;
        }

        if (minWidth * height > maxRect) {
            maxRect = minWidth * height;
        }

        height++;
    }

    return maxRect;
}
```

## Review
- [A Great Way to do Presenters](https://cashapp.github.io/2020-06-09/android-presenters)

## Tip
+ 合理利用`layout_marginStart`与`layout_goneMarginStart`可以较好的处理`ConstraintLayout`布局中组件隐藏的情况
+ `String`方法`trim`和`strip`的区别：
    + `trim`自**Java 1**就引入了；`strip`**Java 11**才引入
    + `trim`使用**ASCII**判断；`strip`使用**Unicode**判断
    + `trim`删除**ASCII**小于等于**U+0020**的字符；`strip`删除所有的空白字符
+ **APP**启动过程：
    1. `Launcher`被调用点击事件，转到`Instrumentation`类的`startActivity`方法
    2. `Instrumentation`通过跨进程通信告诉**AMS**要启动应用的需求
    3. **AMS**反馈`Launcher`，让`Launcher`进入`Paused`状态
    4. `Launcher`进入`Paused`状态，**AMS**转到`ZygoteProcess`类，并通过`socket`与`Zygote`通信，告知`Zygote`需要新建进程
    5. `Zygote`**fork**进程，并调用`ActivityThread`的`main`方法，也就是**APP**的入口
    6. `ActivityThread`的`main`方法新建了`ActivityThread`实例，并新建了`Looper`实例，开始`loop`循环
    7. 同时`ActivityThread`也告知**AMS**，进程创建完毕，开始创建`Application`，`Provider`，并调用`Applicaiton`的`attach`，`onCreate`方法
    8. 最后就是创建上下文，通过类加载器加载`Activity`，调用`Activity`的`onCreate`方法
+ `kotlin`中可以用`toInt()`方法把`Float`转为`Integer`
+ `BigDecimal`比较大小用`compareTo`而不是`equals`方法，因为`equals`方法还会比较精度

## Share
暂无内容