# 第三十五周ARTS总结
## Algorithm
- [First Missing Positive](https://leetcode.com/problems/first-missing-positive/)
> 0ms | 100.00% Run time  
> 34.6MB | 100.00% Memory
```java
public int firstMissingPositive(int[] nums) {
    // Arrays.sort(nums); 该排序的时间复杂度为O(nlogn)，所以不能使用

    int ans = 1;

    // 由于int只能存储32个数的状态，因此直接采用数组
    // 利用warehouse来存储每个位置的状态，1代表nums中有该值，否则无
    // 本来容量想直接设置为Integer.MAX_VALUE的，但是没必要，而且会OutOfMemory
    // warehouse容量最大不需要超过nums的长度+2
    boolean[] warehouse = new boolean[nums.length + 2];

    // 时间复杂度:O(n)
    for (int index : nums) {
        if (index <= 0 || index >= warehouse.length) {
            continue;
        }

        warehouse[index] = true;
    }

    // 时间复杂度:O(n)
    for (int i = 1; i < warehouse.length; i++) {
        if (!warehouse[i]) {
            ans = i;
            break;
        }
    }

    return ans;
}
```

## Review
- [Resolving View Attributes on Android](https://ataulm.github.io/2019/10/28/resolving-view-attributes.html)

## Tip
+ `Handler`机制：
    + 目的：线程间通信
    + 涉及到的主要类：
        + `Handler`：负责消息的发送与处理
        + `Looper`：负责管理`MessageQueue`，`Looper`会不断的从`MessageQueue`取出消息，交给`Handler`处理
        + `MessageQueue`：消息队列，负责存放消息  
           **注：一个线程中可以有多个`Handler`，但只有一个`Looper`和一个`MessageQueue`**
    + 注意点：
        + 在子线程使用`Handler`前一定要先为子线程创建`Looper`，创建的方式是直接调用`Looper.prepare()`方法
        + 在同一个线程里，`Looper.prepare()`方法不能被调用两次
        + 只有调用了`Looper.loop()`方法，`Handler`机制才能正常工作
        + `Looper.loop()`方法一定要在调用了`Looper.prepare()`方法之后调用
        + 不要在主线程调用`Looper.prepare()`方法
        + 当我们在子线程使用`Handler`时，如果`Handler`不再需要发送和处理消息，那么一定要退出子线程的消息轮询
    + 当一个线程有多个`Handler`，那会由哪个`Handler`来处理这个消息呢：发该消息的那个
+ 给`Activity`的`<meta-data>`加上如下代码用于声明此`Activity`的逻辑父级
    ```xml
    <activity android:name=".DisplayMessageActivity"
              android:parentActivityName=".MainActivity">
        <!-- The meta-data tag is required if you support API level 15 and lower -->
        <meta-data
            android:name="android.support.PARENT_ACTIVITY"
            android:value=".MainActivity" />
    </activity>
    ```
+ `Android`安全功能：
    + `Android`操作系统是一种多用户`Linux`系统，其中的每个应用都是一个不同的用户;
    + 默认情况下，系统会为每个应用分配一个唯一的`Linux`用户ID（该ID仅由系统使用，应用并不知晓）。系统会为应用中的所有文件设置权限，使得只有分配给该应用的用户ID才能访问这些文件;
    + 每个进程都拥有自己的虚拟机(VM)，因此应用代码独立于其他应用而运行;
    + 默认情况下，每个应用都在其自己的`Linux`进程内运行。`Android`系统会在需要执行任何应用组件时启动该进程，然后当不再需要该进程或系统必须为其他应用恢复内存时，其便会关闭该进程。
+ `ViewPage2`的优势
    + 基于`RecyclerView`实现
    + 支持滑动方向的一键切换
    + 支持禁止用户滑动页面
    + 支持通过代码方式模拟用户滚动页面
    + 支持同时添加多个`PageTransformer`
    + 支持`DiffUtil`
    + 支持`RTL(right-to-left)`布局
+ `HashMap`的实现方式
    + `jdk1.6 jdk1.7`：采用数组+链表实现
    + `jdk1.8`：采用数组+链表+红黑树实现，当链表长度超过阈值时，自动转为红黑树
    
## Share
暂无内容

<Vssue title="第三十五周ARTS总结" />