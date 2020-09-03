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

## Review
- []()

## Tip
+ 

## Share
暂无内容