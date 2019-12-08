# 第三十四周ARTS总结
## Algorithm
- [Combination Sum II](https://leetcode.com/problems/combination-sum-ii/)
> 2ms | 100.00% Run time  
> 36.3MB | 100.00% Memory
```java
public List<List<Integer>> combinationSum2(int[] candidates, int target) {
    Arrays.sort(candidates);

    return recursive(candidates, target, 0);
}

/**
 * 从startIndex索引起在candidates中选若干个求和等于target的结果集
 *
 * @param candidates 候选数
 * @param target     目标数
 * @param startIndex 开始索引
 * @return
 */
private List<List<Integer>> recursive(int[] candidates, int target, int startIndex) {
    List<List<Integer>> ans = new ArrayList<>();

    // 此时无满足条件的结果集
    if (startIndex >= candidates.length || target < candidates[startIndex]) {
        return ans;
    }

    for (int i = startIndex; i < candidates.length; i++) {
        int thisNum = candidates[i];

        // 防止重复答案
        if (i > startIndex && thisNum == candidates[i - 1]) {
            continue;
        }

        // 此时已经找到目标值
        if (target == thisNum) {
            List<Integer> item = new ArrayList<>();
            item.add(target);
            ans.add(item);
            return ans;
        }

        // 继续迭代找结果集
        List<List<Integer>> temp = recursive(candidates, target - thisNum, i + 1);

        for (List<Integer> item : temp) {
            item.add(0, thisNum);
            ans.add(item);
        }
    }

    return ans;
}
```
## Review
- [Don’t build systems. Build subsystems.](https://blog.jessitron.com/2019/10/13/dont-build-systems-build-subsystems/)
  > 注：不要构建系统，而要构建子系统。
- [AndroidDevSummit 2019: What's new in Android Fragments](https://www.amryousef.me/new-in-androidx-fragment)
- [Why MVP is outdated in Android](https://proandroiddev.com/why-mvp-is-outdated-in-android-187083eeb4e6)
  > 为什么说MVP过时了？
  > + `Contract`接口过于庞大
  > + `Contract`中大多数方法都是无意义的
  > + 可重用度低
  > + 粒度难以划分
  > + 循环依赖
  > + 很难模块化
- [Smaller PNGs, and Android’s AAPT tool](https://medium.com/@duhroach/smaller-pngs-and-android-s-aapt-tool-4ce38a24019d)

## Tip
+ `LayoutInflater`创建的寻找
    1. 由`LayoutInflater#from`可知从`context`中获取的系统服务
    2. 所有的`Context`实际均由`ContextImpl`实现
    3. 由`ContextImpl#getSystemService`类可知从`SystemServiceRegistry`注册器中获取
    4. 由`SystemServiceRegistry#getSystemService`可知最终获取系统服务的是`ServiceFetcher`
    5. 所有的系统服务都存放在`SystemServiceRegistry`的`SYSTEM_SERVICE_FETCHERS`集合中
    6. 在静态方法内可以发现实际生成的是`PhoneLayoutInflater`对象
+ `inflate(@LayoutRes int resource, @Nullable ViewGroup root, boolean attachToRoot)`方法第三个参数的意义：该布局是否关联到`root`中，`false`表示`root`只用于创建布局的`LayoutParams`
+ `ART`与`Dalvik`的区别：
    + `Dalvik`：应用每次运行的时候，字节码都需要通过即时编译器（just in time ，JIT）转换为机器码，这会拖慢应用的运行效率。
    + `ART`：应用在第一次安装的时候，字节码就会预先编译成机器码，极大的提高了程序的运行效率，同时减少了手机的耗电量。该过程成为预编译（AOT）。
+ 自定义`View`的步骤：
    1. 新建类集成`View`
        + `View(Context context)`：通过代码创建`View`会调用此构造方法
        + `View(Context context, @Nullable AttributeSet attrs)`：在xml创建但是没有指定style会调用此构造方法
    2. 添加自定义属性
    3. 在构造方法中获取属性，并初始化画笔等 **（注意`TypedArray`需及时回收）**
    4. 在`onMeasure(int widthMeasureSpec, int heightMeasureSpec)`中执行测量操作，主要计算控件占多大地方
        + `UNSPECIFIED`：任意大小，尽可能大
        + `EXACTLY`：一个确定的值，例如`100dp`、`match_parent`
        + `AT_MOST`：包裹内容，例如`wrap_content`
    5. 在`onDraw(Canvas canvas)`中做具体的绘制操作
+ 初始化三方库的一种方法：利用`ContentProvider & Manifest-Merger`的特性

## Share
- [Android Saripaar 注解详解](https://www.cnblogs.com/lanxingren/p/11973882.html)

<Vssue title="第三十四周ARTS总结" />