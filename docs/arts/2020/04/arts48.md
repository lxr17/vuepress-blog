# 第四十八周ARTS总结
## Algorithm
- [Jump Game](https://leetcode.com/problems/jump-game/)
> 1ms | 98.90% Run time  
> 41.8MB | 24.79% Memory
```java
public boolean canJump(int[] nums) {
    int index = 0;// 当前索引
    int jump = nums[0];// 从当前索引将要跳的格数

    while (index < nums.length - 1 && jump > 0) {
        // 重置将要跳的格数
        if (nums[index] > jump) {
            jump = nums[index];
        }

        // 跳一格
        index++;
        jump--;

        // 防止出现[1, 2, 3]的错误
        if (jump == 0 && index < nums.length - 1) {
            jump = nums[index];
        }
    }

    return index == nums.length - 1;
}
```

## Review
- [Use view binding to replace findViewById](https://medium.com/androiddevelopers/use-view-binding-to-replace-findviewbyid-c83942471fc)

## Tip
+ 动态注册的广播一定要注意取消注册(`unregisterReceiver`)
+ `<receiver>`中一些属性的解释：
    + `enabled`：是否启用
    + `exported`：是否允许该接收器接收本程序以外的广播
+ 静态注册的广播需要在`<receiver>`标签中用`<intent-filter>`指定要接收什么广播
+ **广播接收器中不允许开启线程，因此不宜进行太多的操作**
+ 在`Android 8`及以上，无法使用静态注册的方式来接收自定义隐式广播，但是可以
    + 使用静态注册方式接收显示广播，既由`Intent(A, B.class)`方式发出的广播
    + 使用动态注册方式接收自定义隐式广播
+ 广播是一种跨进程通信
    

## Share
暂无内容