# 第二周ARTS总结
## Algorithm
- [Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)
```java
public double findMedianSortedArrays(int[] nums1, int[] nums2) {
    int m = nums1.length;
    int n = nums2.length;
    if (m > n) { // to ensure m<=n
        int[] temp = nums1;
        nums1 = nums2;
        nums2 = temp;
        int tmp = m;
        m = n;
        n = tmp;
    }

    int iMin = 0, iMax = m, halfLen = (m + n + 1) / 2;
    while (iMin <= iMax) {
        int i = (iMin + iMax) / 2;
        int j = halfLen - i;
        if (i < iMax && nums2[j - 1] > nums1[i]) {
            iMin = i + 1; // i is too small
        } else if (i > iMin && nums1[i - 1] > nums2[j]) {
            iMax = i - 1; // i is too big
        } else { // i is perfect
            int maxLeft = 0;
            if (i == 0) {
                maxLeft = nums2[j - 1];
            } else if (j == 0) {
                maxLeft = nums1[i - 1];
            } else {
                maxLeft = Math.max(nums1[i - 1], nums2[j - 1]);
            }
            if ((m + n) % 2 == 1) {
                return maxLeft;
            }

            int minRight = 0;
            if (i == m) {
                minRight = nums2[j];
            } else if (j == n) {
                minRight = nums1[i];
            } else {
                minRight = Math.min(nums2[j], nums1[i]);
            }

            return (maxLeft + minRight) / 2.0;
        }
    }
    return 0.0;
}
```
**注：该题参考了solution的解法**

## Review
- [First ever black hole image released](https://www.bbc.com/news/science-environment-47873592)

## Tip
+ HashMap的存储方式：
    + 首先计算key的hash值，然后将value放在索引为hash的地方
    + 如果索引为hash的地方已经存在了value，则计算此key与彼key是否equals
    + 如果equals，则覆盖，否则在该索引处生成一个链表，新value为已存在value的最后一个节点
+ Android 9 默认不支持http请求，如果要支持http请求，需要更改配置以启用

## Share
- [Android拦截并获取WebView内部POST请求参数](https://www.cnblogs.com/lanxingren/p/10697106.html)