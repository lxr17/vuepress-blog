# 第十五周ARTS总结
## Algorithm
- [4Sum](https://leetcode.com/problems/4sum/)
> 288ms | 5.02% Run time  
> 58.4MB | 8.69% Memory
```java
public List<List<Integer>> fourSum(int[] nums, int target) {
    // 排序
    Arrays.sort(nums);

    List<Integer> numsList = new ArrayList<>();
    for (int num : nums) {
        numsList.add(num);
    }

    return findX(numsList, 4, target);
}

/**
 * 从source中找出size个数，使之和为sum，并返回所有的序列（不重复）
 *
 * @param source 序列
 * @param size   个数
 * @param sum    总和
 */
public List<List<Integer>> findX(List<Integer> source, int size, int sum) {
    List<List<Integer>> list = new ArrayList<>();

    // 用二分法找到所需要的值
    if (size == 1) {
        int leftIndex = 0;
        int rightIndex = source.size() - 1;
        while (rightIndex - leftIndex > 1) {
            int middleIndex = (leftIndex + rightIndex) / 2;

            if (sum < source.get(middleIndex)) {
                rightIndex = middleIndex;
            } else if (sum > source.get(middleIndex)) {
                leftIndex = middleIndex;
            } else {
                List<Integer> ans = new ArrayList<>();
                ans.add(sum);
                list.add(ans);
                break;
            }
        }

        // rightIndex - leftIndex == 1 的情况
        if (list.size() == 0) {
            if (sum == source.get(leftIndex) || sum == source.get(rightIndex)) {
                List<Integer> ans = new ArrayList<>();
                ans.add(sum);
                list.add(ans);
            }
        }

        return list;
    }

    for (int i = 0; i < source.size() - size + 1; i++) {
        // 力求不重复
        if (i > 0 && source.get(i).equals(source.get(i - 1))) {
            continue;
        }

        int thisNum = source.get(i);

        // 获取剩余部分的序列
        List<List<Integer>> tempList = findX(source.subList(i + 1, source.size()), size - 1, sum - thisNum);

        // 拼上第一个数
        for (List<Integer> temp : tempList) {
            temp.add(0, thisNum);
            list.add(temp);
        }
    }

    return list;

}
```
**给`XSum`类型的题给了一种通用的解法，其中`X`为任意整数**

## Review
- [Improving build speed in Android Studio](https://medium.com/androiddevelopers/improving-build-speed-in-android-studio-3e1425274837)

## Tip
+ `FragmnetPageAdapter`在每次切换页面时，只是将`Fragment`进行分离，适合页面较少的`Fragment`使用以保存一些内存，对系统内存不会多大影响
+ `FragmentPageStateAdapter`在每次切换页面的时候，是将`Fragment`进行回收，适合页面较多的`Fragment`使用，这样就不会消耗更多的内存
+ `fragment`不通过构造函数进行传值的原因是因为横屏切换的时候获取不到值
+ `Viewpager`配合`fragment`使用，默认加载前两个`fragment`。很容易造成网络丢包、阻塞等问题。因此对于`Fragment`多的可采用懒加载

## Share
暂无内容

<Vssue title="第十五周ARTS总结" />