# 第三十三周ARTS总结
## Algorithm
- [Combination Sum](https://leetcode.com/problems/combination-sum/)
> 4ms | 66.65% Run time  
> 40.1MB | 10.37% Memory
```java
public List<List<Integer>> combinationSum(int[] candidates, int target) {
    List<List<Integer>> ans = new ArrayList<>();

    boolean hasAns = false;

    // 只选一个数的答案
    for (int i = 0; i < candidates.length; i++) {
        if (target > candidates[i]) {
            hasAns = true;
        } else if (target == candidates[i]) {
            List<Integer> temp = new ArrayList<>();
            temp.add(target);
            ans.add(temp);
        }
    }

    // 如果候选人中所有的数字都比target大
    if (!hasAns) {
        return ans;
    }

    for (int i = 0; i < candidates.length; i++) {
        int[] rest = Arrays.copyOfRange(candidates, i, candidates.length);
        List<List<Integer>> temp = combinationSum(rest, target - candidates[i]);

        for (List<Integer> list : temp) {
            list.add(0, candidates[i]);
            ans.add(list);
        }
    }

    return ans;
}
```
## Review
- [Working with Scoped Storage](https://proandroiddev.com/working-with-scoped-storage-8a7e7cafea3)

## Tip
+ 原生`WebView`的内核
    + `Android 4.4`之前：`WebKit`
    + `Android 4.4`之后：`chromium`
+ `BlinkLayout`：`LayoutInflater`的内部类，是`FrameLayout`的子类，隔`0.5`秒闪烁一次
+ `Java`对象在堆中的结构
    + 头信息（Object Header）：用于记录对象状态，在32位系统中占32位，即4字节
    + 类指针（Class Pointer）：指向当前类父类的指针，在32位系统中占4字节
    + 字段（Fields）  
  **注：总大小需8位对齐**
+ 节约内存原则
    + 尽量使用基本类型，而不是包装类型
    + 斟酌字段类型，在满足容量前提下，尽量用小字段
    + 如果可能，尽量用数组，少用集合
    + 小技巧
        + 时间用`long/int`表示，不用`Date/String`
        + 短字符串如果能穷举或者转成`ASCII`表示，可以用`long/int`表示
+ `Context`三两语
    + `Context`有两个直接实现类：`ContextImpl`和`ContextWrapper`
    + 所有的实现都由`ContextImpl`实现，`ContextWrapper`持有了`ContextImpl`
    + `Application`、`Service`、`Activity`都直接或者间接的继承了`ContextWrapper`，故他们均持有一个`ContextImpl`
    + `getApplication`、`getApplicationContext`、`getBaseContext`的区别
        + `getApplication`：获取`APP`的`Application`实例，作用域为`Activity`和`Service`
        + `getApplicationContext`：获取`APP`的`Application`实例，作用域为`Context`
        + `getBaseContext`：获取持有的`ContextImpl`实例，作用域为`ContextWrapper`

## Share