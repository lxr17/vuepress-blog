# 第十三周ARTS总结
## Algorithm
- [3Sum](https://leetcode.com/problems/3sum/)
```java
public List<List<Integer>> threeSum(int[] nums) {
    List<List<Integer>> answers = new ArrayList<>();

    for (int i = 0; i < nums.length - 2; i++) {
        for (int j = i + 1; j < nums.length - 1; j++) {
            for (int k = j + 1; k < nums.length; k++) {
                if (nums[i] + nums[j] + nums[k] == 0) {
                    List<Integer> ans = new ArrayList<>();
                    ans.add(nums[i]);
                    ans.add(nums[j]);
                    ans.add(nums[k]);

                    Collections.sort(ans);

                    if (!answers.contains(ans)) {
                        answers.add(ans);
                    }
                }
            }
        }
    }

    return answers;
}
```

## Review
- [50 Android Studio Tips, Tricks & Resources you should be familiar with, as an Android Developer](https://medium.com/@mmbialas/50-android-studio-tips-tricks-resources-you-should-be-familiar-with-as-an-android-developer-af86e7cf56d2)

## Tip
+ `RecycleView`如果要设置圆角背景，那么写`drawable`的时候圆角需要用`radius`定义，不能直接定义上下左右的圆角，否则会无效

## Share