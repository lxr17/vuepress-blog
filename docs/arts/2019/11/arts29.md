# 第二十九周ARTS总结
## Algorithm
- [Search Insert Position](https://leetcode.com/problems/search-insert-position/)
> 0ms | 100.00% Run time  
> 37.9MB | 100.00% Memory
```java
public int searchInsert(int[] nums, int target) {
    // 如果数组是空的，那索引就是0
    if (nums.length == 0) {
        return 0;
    }

    int left = 0;
    int right = nums.length - 1;

    // 如果找到了，就return；如果没找着，则right-left=1
    while (right - left > 1) {
        int middle = (left + right) / 2;

        if (target == nums[middle]) {
            return middle;
        } else if (target > nums[middle]) {
            left = middle;
        } else {
            right = middle;
        }
    }

    if (target <= nums[left]) {
        return left;
    } else if (target <= nums[right]) {
        return right;
    } else {
        return right + 1;
    }
}
```

## Review
- [Top 10 Android Libraries Every Android Developer Should Know About](https://infinum.co/the-capsized-eight/top-10-android-libraries-every-android-developer-should-know-about)  
    > 笔记:这篇博客介绍的三方库都非常的具有研究意义。

## Tip
+ Android值得研究的一些三方库
  + ***Retrofit***:`Retrofit`是类型安全的`HTTP`客户端，可让您将`REST API`定义为接口；
  + ***Moshi***:`Moshi`是一个将`JSON`转换为`Java`和`Kotlin`模型的库；
  + ***Chuck***:`Chuck`是`Android`的`HTTP`检查器，可让您在手机上挖掘应用程序的`HTTP`历史记录；
  + ***Glide***:`Glide`是一个图像加载库，它公开了一个不错的`API`，可让您随意转换图像；
  + ***ThreeTen***:`ThreeTen`是适用于`Android`的日期和时间处理库；
  + ***Timber***:`Timber`是功能强大但简单的日志记录库，建立在`Log`类的顶部；
  + ***Room***:`Room`是官方的`Android ORM`；
  + ***RxJava***:`RxJava`是`ReactiveX API`的`Java`实现，使您可以将异步任务和事件链接到可观察的序列中；
  + ***Android KTX***:`Android KTX`是`Kotlin`扩展的集合，包装了`Android API`，使其更加用户友好；
  + ***Dagger***:`Dagger`是一个完全静态的编译时依赖项注入框架。

## Share