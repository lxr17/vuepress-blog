# 第四十六周ARTS总结
## Algorithm
- [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)
> 0ms | 100.00% Run time  
> 41.8MB | 5.16% Memory
```java
public int maxSubArray(int[] nums) {
    // 思路
    // 1. 记start为0
    // 2. 从start开始遍历
    // 3. 如果start到当前索引之间的数之和大于零，start不变，否则start等于当前的索引，继续遍历

    int max = nums[0];

    int sum = nums[0];

    for (int i = 1; i < nums.length; i++) {
        int temp = nums[i];

        if (sum < 0) {
            sum = temp;
        } else if (sum + temp > 0) {
            sum += temp;
        } else {
            sum = temp;
        }

        if (sum > max) {
            max = sum;
        }
    }

    return max;
}
```

## Review
- [How to make Expandable RecyclerView using Kotlin](https://johncodeos.com/how-to-make-expandable-recyclerview-using-kotlin/)

## Tip
+ 给主活动指定的**label**不仅会成为标题栏中的内容，还会成为应用程序显示的名称
+ 定义菜单的步骤：
    1. 在**res**的**menu**文件夹下新建一个**Menu Resource File**
    2. 重写**onCreateOptionsMenu**方法来定义菜单，`getMenuInflater().inflate(R.menu.main, menu);`
    3. 重写**onOptionsItemSelected**方法用于响应菜单点击事件
+ `startActivity`会自动将`android.intent.category.DEFAULT`添加到**Intent**中
+ 返回数据给上一个活动额步骤：
    1. 用`startActivityForResult(Intent intent, int requestCode)`启动活动
    2. 上一个活动中实现`onActivityResult(int requestCode, int resultCode, Intent data)`方法
    3. 被启动的活动在销毁前`setResult(int resultCode, Intent data)`
+ 活动被回收了怎么办：可以在`onSaveInstanceState`中保存临时数据，并在`onCreate`中恢复数据，但最好在`onRestoreInstanceState`方法中恢复数据
+ **onNewIntent**与**onRestart**的区别：
    1. 只有在活动被恢复的时候才会回调**onRestart**
    2. **onNewIntent**与**startActivity**有关
+ 可以通过`android.os.Process.killProcess(android.os.Process.myPid());`杀死当前进程
+ **Button**会自动将英文字母转成大写，可通过`textAllCaps`来禁止
+ 可以直接在自定义**View**的构造函数中用`LayoutInflater.from(context).inflate(R.layout.title, this);`引入布局
+ **ListView**的缺点：
    + 需要技巧来提升运行效率
    + 不能横向滚动

## Share
暂无内容