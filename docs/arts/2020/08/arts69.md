# 第六十九周ARTS总结
## Algorithm
- [Subsets II](https://leetcode.com/problems/subsets-ii/)
> 11ms | 6.37% Run time  
> 39.1MB | 64.21% Memory
```java
public List<List<Integer>> subsetsWithDup(int[] nums) {
    Arrays.sort(nums);

    int length = nums.length;

    // 用作匹配，方便查询
    Map<String, List<Integer>> map = new HashMap<>();
    map.put("null", new ArrayList<>());

    // 每次往已经找到的集合中添加当前元素
    for (int i = 0; i < length; i++) {
        int cur = nums[i];

        // 已有结果（key集）
        Set<String> keys = new HashSet<>(map.keySet());

        for (String key : keys) {
            String newKey = key + "," + cur;
            if (map.get(newKey) == null) {
                List<Integer> item = new ArrayList<>(map.get(key));
                item.add(cur);
                map.put(newKey, item);
            }
        }
    }

    return new ArrayList<>(map.values());
}
```

## Review
- [The dangers of JSON + default values](https://blog.danlew.net/2021/06/23/json-deserializatio-nand-default-values-dont-mix/)

## Tip
+ **packagingOptions**：
    + **exclude**：过滤掉某些文件或者目录不添加到APK中
    + **pickFirst**：匹配到多个相同文件，只提取第一个
    + **doNotStrip**：设置某些动态库不被优化压缩
    + **merge**：将匹配的文件都添加到**APK**中，和**pickFirst**有些相反，会合并所有文件
+ `taskAffinity`一二三：
    + `taskAffinity`必须至少包含一个`.`
    + `allowTaskReparenting`允许`Activity`更换当前所在的活动栈
+ **kotlin**的伴生函数
  + 在**kotlin**的伴生函数里，方法使用`@JvmStatic`修饰的话在**Java**里就可以直接`KotlinClass.doWork();`调用，否则只能`KotlinClass.Companion.doWork();`调用
  + 变量需要使用`@JvmField`修饰
+ **Android Studio**默认运行时增量编译，生成的文件不会到**APK**中
+ **视图动画**的旋转只有**X轴**和**Y轴**，没有**Z轴**，因此只能旋转，无法翻转

## Share
暂无内容