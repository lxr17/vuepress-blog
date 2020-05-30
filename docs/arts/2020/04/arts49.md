# 第四十九周ARTS总结
## Algorithm
- [Merge Intervals](https://leetcode.com/problems/merge-intervals/)
> 6ms | 57.53% Run time  
> 41.9MB | 50.00% Memory
```java
public int[][] merge(int[][] intervals) {
    List<int[]> data = new ArrayList<>();
    List<int[]> ans = new ArrayList<>();

    for (int[] temp : intervals) {
        data.add(temp);
    }

    // 正对于左进行排序
    Collections.sort(data, new Comparator<int[]>() {
        @Override
        public int compare(int[] t1, int[] t2) {
            return t1[0] - t2[0];
        }
    });

    // 合并
    for (int[] temp : data) {
        if (ans.size() == 0) {
            ans.add(temp);
        }

        int[] last = ans.get(ans.size() - 1);

        // 合并
        if (temp[0] <= last[1] && temp[1] >= last[1]) {
            last[1] = temp[1];
        }

        if (temp[0] > last[1]) {
            ans.add(temp);
        }
    }

    int[][] realAns = new int[ans.size()][];
    ans.toArray(realAns);
    return realAns;
}
```

## Review
- [Working with dynamic data in MotionLayout](https://medium.com/androiddevelopers/working-with-dynamic-data-in-motionlayout-9dbbcfe5ff75)

## Tip
+ 可以在广播接收器中通过`abortBroadcast`来取消广播的传递（仅针对有序广播）
+ **如果广播接收器是动态注册的，则不能通过显示发送广播的方式发送给该接收器**
+ 静态注册的广播接收器内不允许做耗时操作，也不允许更新UI，因为此时的接收器为单一的类，生命周期很短；但是如果是动态注册的广播接收器则可以，因为此时接收器的实例在**Activity**或者其他生命周期较长的类内
+ 文件存储目录为`/data/data/<package name>/files/`
+ 通过`Activity#getPreferences`方式获取的`SharedPreferences`所产生的文件名为`Activity`的类名
+ `SharedPreferences`存储目录为`/data/data/<package name>/shared_prefs/`

## Share
暂无内容