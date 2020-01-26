# 第四十一周ARTS总结
## Algorithm
- [Rotate Image](https://leetcode.com/problems/rotate-image/)
> 0ms | 100.00% Run time  
> 38.5MB | 5.77% Memory
```java
public void rotate(int[][] matrix) {
    // 由外向内，一圈一圈旋转
    // 每一圈的数字一个个的旋转

    // 对1*1及以下数组作特殊处理
    if (matrix.length <= 1) {
        return;
    }

    int start = 0;
    int end = matrix.length - 2;

    while (start <= end) {
        // 旋转第i个数
        for (int i = 0; i <= end - start; i++) {
            int temp = matrix[start][start + i];

            // 旋转
            matrix[start][start + i] = matrix[end + 1 - i][start];
            matrix[end + 1 - i][start] = matrix[end + 1][end + 1 - i];
            matrix[end + 1][end + 1 - i] = matrix[start + i][end + 1];
            matrix[start + i][end + 1] = temp;
        }

        // 下一圈
        ++start;
        --end;
    }
}
```

## Review
- [How to change your Project Name & Package Name in Android Studio](https://johncodeos.com/how-to-change-your-project-name-package-name-in-android-studio/)

## Tip
+ `TERM environment variable not set.`解决：将`Emulate terminal in output console`打钩
+ `HashMap#put`方法判断**key**是否重复的依据是`hashCode`与`equals`，其中`hashCode`方法更优先
+ **APP**启动分类 [[1](https://segmentfault.com/a/1190000020904556)]：
    + 冷启动
    + 热启动
    + 温启动
+ 冷启动流程 [[2](https://segmentfault.com/a/1190000020904556)]：
    1. 启动**APP**
    2. 加载空白`Window`
    3. 创建进程
    4. 创建`Application`
    5. 启动线程
    6. 创建`MainActivity`
    7. 加载布局
    8. 布置屏幕
    9. 首帧绘制
+ `adb shell am start -W packagename/[packagename].首屏Activity`：用户获取该页面的耗时信息 [[[3](https://segmentfault.com/a/1190000020904556)]]
    
## Share
暂无内容

<Vssue title="第四十一周ARTS总结" />