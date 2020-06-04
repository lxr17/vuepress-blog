# 第五十三周ARTS总结
## Algorithm
- [Unique Paths](https://leetcode.com/problems/unique-paths/)
> 3ms | 15.77% Run time  
> 37MB | 5.10% Memory
```java
public int uniquePaths(int m, int n) {
    return Integer.parseInt(factorial(m + n - 2).divide(factorial(m - 1).multiply(factorial(n - 1))).toString());
}

/**
 * 计算n!
 */
private BigInteger factorial(int n) {
    BigInteger ans = new BigInteger("1");

    for (int i = 2; i <= n; i++) {
        ans = ans.multiply(new BigInteger(Integer.toString(i)));
    }

    return ans;
}
```
----

- [Unique Paths II](https://leetcode.com/problems/unique-paths-ii/)
> 0ms | 100.00% Run time  
> 37.8MB | 100.00% Memory
```java
public int uniquePathsWithObstacles(int[][] obstacleGrid) {
    // 如果'Start'为障碍物，则一共有0种路径
    if (obstacleGrid[0][0] == 1) {
        return 0;
    }

    // 行数
    int row = obstacleGrid.length;
    // 列数
    int column = obstacleGrid[0].length;

    // 遍历每一个坐标，并将每个坐标填入到该坐标一共有的路径数
    for (int i = 0; i < row; i++) {
        for (int j = 0; j < column; j++) {
            // 从'Start'出发，即到[0, 0]一共有1种路径
            if (i == 0 && j == 0) {
                obstacleGrid[0][0] = 1;
                continue;
            }

            // 如果当前坐标是障碍物，则被堵住了，因此到达该坐标一共有0种路径
            if (obstacleGrid[i][j] == 1) {
                obstacleGrid[i][j] = 0;
                continue;
            }

            // 主要思路：任何一个坐标都是从上或者从左过来的，因此到该坐标的路径数为上和左的路径数之和
            int left = j - 1 >= 0 ? obstacleGrid[i][j - 1] : 0;
            int up = i - 1 >= 0 ? obstacleGrid[i - 1][j] : 0;
            obstacleGrid[i][j] = left + up;
        }
    }

    // 'Finish'坐标处的值即为所需结果
    return obstacleGrid[row - 1][column - 1];
}
```

## Review
- [SQLite Triggers (+ Android Room)](https://proandroiddev.com/sqlite-triggers-android-room-2e7120bb3e3a)

## Tip
+ `MediaPlayer`在使用前需调用`prepare`方法完成准备工作
+ 当页面销毁时，`MediaPlayer`资源需要得到释放：`MediaPlayer#release`
+ 当页面销毁时，`VideoView`资源需要得到释放：`VideoView#suspend`
+ 判断有无权限：`ContextCompat#checkSelfPermission`
+ 申请权限：`ActivityCompat#requestPermissions`

## Share
暂无内容