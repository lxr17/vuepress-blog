# 第五十周ARTS总结
## Algorithm
- [Insert Interval](https://leetcode.com/problems/insert-interval/)
> 1ms | 98.49% Run time  
> 41.4MB | 75.00% Memory
```java
public int[][] insert(int[][] intervals, int[] newInterval) {
    List<int[]> ans = new ArrayList<>();

    Integer left = null;// 区间左
    Integer right = null;// 区间右
    boolean isFind = false;// 是否找到合并后的区间

    // 遍历每个区间，找到newInterval的区间范围
    for (int[] temp : intervals) {
        // 还未找到左，开始找左
        if (left == null) {
            // 判断newInterval[0]的位置
            if (newInterval[0] < temp[0]) {
                left = newInterval[0];
            } else if (newInterval[0] >= temp[0] && newInterval[0] <= temp[1]) {
                left = temp[0];
            } else {
                ans.add(temp);
            }
        }

        // 已经找到左了，开始找右
        if (left != null && !isFind) {
            // 判断newInterval[1]的位置
            if (newInterval[1] > temp[1]) {
                right = newInterval[1];
            } else if (newInterval[1] >= temp[0] && newInterval[1] <= temp[1]) {
                right = temp[1];
                // 此时的右是事实上的右，因此可添加进ans
                ans.add(new int[]{left, right});

                isFind = true;
                continue;
            } else {
                right = newInterval[1];

                // 此时整个新区间都在最左边
                ans.add(new int[]{left, right});
                ans.add(temp);

                isFind = true;
                continue;
            }
        }

        // 左右都找到了，但是右有可能扩展
        if (left != null && right != null) {
            if (isFind) {
                ans.add(temp);
            } else {
                if (right < temp[0]) {
                    ans.add(new int[]{left, right});
                    isFind = true;

                    // 再加上本区间
                    ans.add(temp);
                } else if (right >= temp[0] && right <= temp[1]) {
                    right = temp[1];
                    ans.add(new int[]{left, right});
                    isFind = true;
                }
            }
        }
    }

    if (!isFind) {
        // 防止出现找了一圈没找到的情况
        if (left == null && newInterval.length > 0) {
            ans.add(newInterval);
        } else if (left != null) {
            ans.add(new int[]{left, right});
        }
        isFind = true;
    }

    int[][] realAns = new int[ans.size()][];
    ans.toArray(realAns);

    return realAns;
}
```

## Review
- [Android Fragments: FragmentContainerView](https://proandroiddev.com/android-fragments-fragmentcontainerview-292f393f9ccf)

## Tip
+ **SQLite**数据库一般存储在`/data/data/<package name>/databases/`目录下
+ 只有调用`SQLiteOpenHelper#getReadableDatabase`和`SQLiteOpenHelper#getWritableDatabase`时才会创建数据库，单纯的实例化`SQLiteOpenHelper`并不会创建数据库
+ `SQLiteOpenHelper#getReadableDatabase`和`SQLiteOpenHelper#getWritableDatabase`没有本质区别，只有当磁盘已满的情况下才会有区别
+ 判断是否有权限：`ActivityCompat#checkSelfPermission`
+ 申请权限：`ActivityCompat#requestPermissions`
+ 申请权限回调：`onRequestPermissionsResult`

## Share
暂无内容