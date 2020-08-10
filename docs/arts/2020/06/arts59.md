# 第五十九周ARTS总结
## Algorithm
- [Sort Colors](https://leetcode.com/problems/sort-colors/)
> 0ms | 100.00% Run time  
> 38MB | 57.51% Memory
```java
public void sortColors(int[] nums) {
    // 最后一个0的索引
    int oneIndex = -1;
    // 第一个2的索引
    int twoIndex = nums.length;
    // 当前索引
    int currentIndex = 0;

    for (int i = 0; i < nums.length; i++) {
        // 所有的2不需要再次遍历
        if (i >= twoIndex) {
            break;
        }

        if (nums[i] == 2) {
            // 第一个2的前一个元素与该元素作交换
            nums[i] = nums[twoIndex - 1];
            nums[twoIndex - 1] = 2;
            twoIndex--;

            // 由于被换上来的数字有可能还需要作交换，所以得重新比较一次
            i--;
        } else if (nums[i] == 0) {
            // 最后一个0的后一个元素与该元素作交换
            nums[i] = nums[oneIndex + 1];
            nums[oneIndex + 1] = 0;
            oneIndex++;

            // 这里不需要i--了，因为被换上来的数字只可能为1（只有在oneIndex+1==i的时候才为0）
        }
    }
}
```
----

- [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)
> 101ms | 7.41% Run time  
> 39.9MB | 65.16% Memory
```java
/**
 * 参考了官方答案
 */
public String minWindow3(String s, String t) {
    Map<Character, Integer> ori = new HashMap<Character, Integer>();
    Map<Character, Integer> cnt = new HashMap<Character, Integer>();

    int tLen = t.length();
    for (int i = 0; i < tLen; i++) {
        char c = t.charAt(i);
        ori.put(c, ori.getOrDefault(c, 0) + 1);
    }
    int l = 0, r = -1;
    int len = Integer.MAX_VALUE, ansL = -1, ansR = -1;
    int sLen = s.length();
    while (r < sLen) {
        ++r;
        if (r < sLen && ori.containsKey(s.charAt(r))) {
            cnt.put(s.charAt(r), cnt.getOrDefault(s.charAt(r), 0) + 1);
        }
        while (check(ori, cnt) && l <= r) {
            if (r - l + 1 < len) {
                len = r - l + 1;
                ansL = l;
                ansR = l + len;
            }
            if (ori.containsKey(s.charAt(l))) {
                cnt.put(s.charAt(l), cnt.getOrDefault(s.charAt(l), 0) - 1);
            }
            ++l;
        }
    }
    return ansL == -1 ? "" : s.substring(ansL, ansR);
}

private boolean check(Map<Character, Integer> ori, Map<Character, Integer> cnt) {
    Iterator iter = ori.entrySet().iterator();
    while (iter.hasNext()) {
        Map.Entry entry = (Map.Entry) iter.next();
        Character key = (Character) entry.getKey();
        Integer val = (Integer) entry.getValue();
        if (cnt.getOrDefault(key, 0) < val) {
            return false;
        }
    }
    return true;
}
```
----

- [Combinations](https://leetcode.com/problems/combinations/)
> 5ms | 84.37% Run time  
> 41.3MB | 26.57% Memory
```java
public List<List<Integer>> combine(int n, int k) {
    List<List<Integer>> ans = new ArrayList<>();

    // 首先约定每一种可能都是后一个数比前一个数大
    // 然后一个数一个数的塞就行
    // 首先塞第一个数
    for (int i = 1; i <= n - k + 1; i++) {
        List<Integer> item = new ArrayList<>();
        item.add(i);

        ans.add(item);
    }

    // 然后塞其余的数
    for (int i = 2; i <= k; i++) {
        // 中间变量
        List<List<Integer>> temp = new ArrayList<>();

        // 取第i个数
        for (List<Integer> item : ans) {
            int lastNum = item.get(item.size() - 1);

            // 这里j的范围很重要
            for (int j = lastNum + 1; j <= n - k + i; j++) {
                List<Integer> tempItem = new ArrayList<>(item);
                tempItem.add(j);

                temp.add(tempItem);
            }
        }

        ans.clear();
        ans.addAll(temp);
    }

    return ans;
}
```

## Review
- [OkHttp Interceptor - Making the most of it](https://blog.mindorks.com/okhttp-interceptor-making-the-most-of-it)

## Tip
+ `buildscript`里是`gradle`脚本执行所需依赖；`allprojects`是项目本身需要的依赖
+ `ConstraintLayout`使用：
    + 添加或移除约束条件（每个视图必须至少有两个约束条件：水平约束+垂直约束）
        1. 父级位置（将视图的一侧约束到布局的边缘）
        2. 顺序位置（定义两个视图的显示顺序）
        3. 对齐方式（将一个视图的边缘与另一个视图的同一边对齐）
        4. 基线对齐（将一个视图的文本基线与另一个视图的文本基线对齐）
        5. 引导线约束（可以添加垂直或者水平的引导线来约束布局，并且引导线不可见）
        6. 屏障约束（与引导线类似，屏障是一条隐藏的线，您可以用它来约束视图。屏障不会定义自己的位置；相反，屏障的位置会随着其中所含视图的位置而移动。如果您希望将视图限制到一组视图而不是某个特定视图，这就非常有用）
    + 调整约束偏差
    + 调整视图尺寸（`ConstraintLayout`中的任何视图都不允许使用`match_parent`）
        + 设置视图的尺寸比率
    + 调整视图外边距
    + 使用链控制线性组
    + 自动创建约束条件
    + 关键帧动画
+ 关于接口参数校验的算法，可以用**C**写，并且**so文件**引入，这样比较安全
+ `gradle`的文件放在个人文件夹的`.gradle`下，之后会自动解压
+ `RxJava`的本质在于**异步**，在于**观察者模式**

## Share
暂无内容