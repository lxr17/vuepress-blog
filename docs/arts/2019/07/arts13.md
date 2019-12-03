# 第十三周ARTS总结
## Algorithm
- [3Sum](https://leetcode.com/problems/3sum/)
> 37ms | 43.92% Run time  
> 46.6MB | 94.03% Memory
```java
public List<List<Integer>> threeSum(int[] nums) {
    List<List<Integer>> triplets = new ArrayList<>();
    int len = nums.length;
    Arrays.sort(nums);
    for (int i = 0; i < len - 2; i++) {
        if (i > 0)
            while (i < len - 2 && nums[i - 1] == nums[i])
                i++; // to exclude duplicates
        int j = i + 1;
        int k = len - 1;
        while (j < k) {
            int sum = nums[i] + nums[j] + nums[k];
            if (sum == 0) {
                triplets.add(new ArrayList<>(Arrays.asList(nums[i], nums[j], nums[k])));
                j++;
                k--;
                while ((j < k) && (nums[j - 1] == nums[j])) // to exclude duplicates
                    j++;
                while ((j < k) && (nums[k] == nums[k + 1])) // to exclude duplicates
                    k--;
            } else if (sum < 0) {
                j++; // sum too low
            } else {
                k--; // sum too high
            }
        }
    }
    return triplets;
}
```
**注：该题参考了solution的解法**

## Review
- [50 Android Studio Tips, Tricks & Resources you should be familiar with, as an Android Developer](https://medium.com/@mmbialas/50-android-studio-tips-tricks-resources-you-should-be-familiar-with-as-an-android-developer-af86e7cf56d2)

## Tip
+ `RecycleView`如果要设置圆角背景，那么写`drawable`的时候圆角需要用`radius`定义，不能直接定义上下左右的圆角，否则会无效

## Share
暂无内容

<Vssue title="第十三周ARTS总结" />