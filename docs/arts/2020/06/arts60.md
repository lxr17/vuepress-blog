# 第六十周ARTS总结
## Algorithm
- [Subsets](https://leetcode.com/problems/subsets/)
> 2ms | 19.42% Run time  
> 39.9MB | 35.66% Memory
```java
public List<List<Integer>> subsets(int[] nums) {
    // 首先里边的每个条目存的都是nums的索引值(利用索引值的目的是为了方便定位当前条目里的是nums中哪几个数)
    List<List<Integer>> finalAns = new ArrayList<>();

    // 存放个数为i个的子集集合
    List<List<Integer>> ans = new ArrayList<>();

    // 中间变量
    List<List<Integer>> temp = new ArrayList<>();

    // 找到容量为i个的所有子集
    for (int i = 1; i <= nums.length; i++) {
        temp.clear();

        // 找到容量为1的所有子集
        if (i == 1) {
            for (int k = 0; k < nums.length; k++) {
                List<Integer> item = new ArrayList<>();
                item.add(k);
                ans.add(item);
            }

            finalAns.addAll(ans);
        } else {
            // 找到容量大于1的所有子集
            for (int k = 0; k < ans.size(); k++) {
                List<Integer> item = ans.get(k);
                int startIndex = item.get(item.size() - 1) + 1;

                for (int j = startIndex; j < nums.length; j++) {
                    List<Integer> newItem = new ArrayList<>(item);
                    newItem.add(j);

                    temp.add(newItem);
                }
            }

            ans.clear();
            ans.addAll(temp);

            finalAns.addAll(ans);
        }
    }

    List<Integer> itemTemp = new ArrayList<>();

    // 将finalAns里的所有索引值变为真实值
    for (List<Integer> item : finalAns) {
        itemTemp.clear();
        for (int index : item) {
            itemTemp.add(nums[index]);
        }

        item.clear();
        item.addAll(itemTemp);
    }

    // 加入空集
    finalAns.add(new ArrayList<>());

    return finalAns;
}
```

## Review
- [Say no to BaseActivity and BaseFragment](https://proandroiddev.com/say-no-to-baseactivity-and-basefragment-83b156ed8998)

## Tip
+ **RxJava**使用详解
    + 观察者模式：被观察者、观察者、订阅。被观察者会有状态的变化，观察者会定义一系列事件。当被观察者订阅（持有）了观察者，然后当被观察者的状态变化了会告诉观察者，让观察者调用相应的事件
    + 基本实现方式：
        1. 创建`Observer`
        2. 创建`Observable`
        3. 通过`subscribe`将`Observer`与`Observable`结合起来
    + 线程控制：可通过`Schedulers`以及`AndroidSchedulers`来定义线程运行情况
    + 变换：
        + `map()`：一对一的变换
        + `flatMap()`：一对多的变化，被转化为`Observable`对象
        + `throttleFirst()`：在事件触发的一定间隔内丢弃新的事件，常用于去抖动过滤（重复点击）
        + `compose()`：对`Observable`整体的变换
    + 可以通过多次调用`observeOn`来不断的切换观察者所在的线程
    + 默认情况下，`doOnSubscribe()`执行在`subscribe()`所在线程；而如果在`doOnSubscribe()`之后有`subscribeOn()`的话，它将执行在离它最近的`subscribeOn()`所指定线程
+ **Observable**的方法们
    + `create`
    + `map`
    + `zip`
    + `concat`
    + `flatMap`：不保证顺序
    + `concatMap`：保证顺序
    + `distinct`：去重
    + `filter`：过滤
    + `buffer`
    + `timer`
    + `interval`
    + `doOnNext`
    + `skip`
    + `take`
    + `just`
    + `debounce`：去除发送频率过快的事件
    + `defer`
    + `last`
    + `merge`：注意与`concat`的区别
    + `reduce`
    + `scan`：注意与`reduce`的区别
    + `window`    
+ **编译**与**解释**的区别
    + **编译**：将源程序整段的翻译成源程序，然后执行
    + **解释**：将高级语言编写的源程序翻译成机器指令，翻译一条执行一条


## Share
暂无内容