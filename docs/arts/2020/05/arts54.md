# 第五十三周ARTS总结
## Algorithm
- [Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/)
> 2ms | 87.92% Run time  
> 42.1MB | 85.13% Memory
```java
public int minPathSum(int[][] grid) {
    // 反思：如果需要获取的不仅仅是一个数字，而是一个路径的话，那需要新建一个grid[][]，并且其中的每个格子都存入路径

    int row = grid.length;
    int column = grid[0].length;

    // 每个格子填入到此格子的最短路径
    for (int i = 0; i < row; i++) {
        for (int j = 0; j < column; j++) {
            // 从上往下
            int top = -1;
            // 从左往右
            int left = -1;

            if (i - 1 >= 0) {
                top = grid[i - 1][j];
            }

            if (j - 1 >= 0) {
                left = grid[i][j - 1];
            }

            // 判断哪条路之和小，走小的那条路
            grid[i][j] = grid[i][j] + minNum(left, top);
        }
    }

    return grid[row - 1][column - 1];
}

/**
 * 获取最小的非负数
 */
private int minNum(int left, int top) {
    if (left == -1 && top == -1) {
        return 0;
    }

    if (left == -1) {
        return top;
    }

    if (top == -1) {
        return left;
    }

    if (left > top) {
        return top;
    } else {
        return left;
    }
}
```

## Review
- []()

## Tip
+ 

## Share
暂无内容