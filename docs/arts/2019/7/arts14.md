# 第十四周ARTS总结
## Algorithm
- [3Sum Closest](https://leetcode.com/problems/3sum-closest/)
```java
public int threeSumClosest(int[] nums, int target) {
    // 排序
    Arrays.sort(nums);

    int closest = Integer.MAX_VALUE;

    // i为第一个数的索引
    for (int i = 0; i < nums.length - 2; i++) {

        // j为第二个数的索引
        for (int j = i + 1; j < nums.length - 1; j++) {
            int rest = target - nums[i] - nums[j];
            int leftIndex = j + 1;
            int rightIndex = nums.length - 1;

            // 这两种情况找出来的值一定比closest大（需要对closest作判断）
            if (closest != Integer.MAX_VALUE
                    && (nums[i] + nums[j] + nums[leftIndex] - target > Math.abs(closest - target)
                    || target - (nums[i] + nums[j] + nums[rightIndex]) > Math.abs(closest - target))) {
                break;
            }

            int matchIndex = leftIndex;

            // 找到余下中离rest最近的数
            if (rest <= nums[leftIndex]) {
                // 如果比最小的还小，那最接近的就是最小的
                matchIndex = leftIndex;
            } else if (rest >= nums[rightIndex]) {
                // 如果比最大的还大，那最接近的就是最大的
                matchIndex = rightIndex;
            } else {
                // 否则一定是中间的某个数
                while (rightIndex - leftIndex >= 1) {
                    int middle = (rightIndex + leftIndex) / 2;
                    if (rest < nums[middle]) {
                        rightIndex = middle;
                    } else if (rest > nums[middle + 1]) {
                        leftIndex = middle + 1;
                    } else if (rest >= nums[middle] && rest <= nums[middle + 1]) {
                        leftIndex = middle;
                        rightIndex = middle + 1;

                        matchIndex = Math.abs(nums[i] + nums[j] + nums[leftIndex] - target)
                                > Math.abs(nums[i] + nums[j] + nums[rightIndex] - target) ? rightIndex : leftIndex;
                        break;
                    }
                }
            }

            // 需要对closest的最大值作判断
            if (closest == Integer.MAX_VALUE || Math.abs(nums[i] + nums[j] + nums[matchIndex] - target) < Math.abs(closest - target)) {
                closest = nums[i] + nums[j] + nums[matchIndex];
            }
        }

    }

    return closest;
}
```
- [Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)

## Review
- [The Scariest Thing About DeepNude Wasn’t the Software](https://onezero.medium.com/the-scariest-thing-about-deepnude-wasnt-the-software-a8df4e7f239b)
- [Differences between Designing Native iOS Apps and Native Android Apps](https://medium.muz.li/differences-between-designing-native-ios-apps-and-native-android-apps-e71256dfa1ca)

## Tip
+ 版本格式：`主版本号.次版本号.修订号`，版本号递增规则如下：
  + `主版本号`：当你做了不兼容的 API 修改，
  + `次版本号`：当你做了向下兼容的功能性新增，
  + `修订号`：当你做了向下兼容的问题修正。
  + `先行版本号`及`版本编译元数据`可以加到“主版本号.次版本号.修订号”的后面，作为延伸
+ `View`的`onMeasure`方法的参数为`int`类型，其中`int`的前两个字节代表了`mode`，后边的为尺寸：
  + `EXACTLY`：就是`match_parent`
  + `AT_MOST`：就是`wrap_content`
  + `EXACTLY`：就是具体尺寸

## Share