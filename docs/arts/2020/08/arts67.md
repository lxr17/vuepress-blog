# 第六十七周ARTS总结
## Algorithm
- [Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)
> 0ms | 100.00% Run time  
> 39.1MB | 54.08% Memory
```java
public void merge(int[] nums1, int m, int[] nums2, int n) {
    if (nums2.length == 0) {
        return;
    }

    int[] temp = new int[nums1.length];

    int i = 0;// nums1当前索引
    int j = 0;// nums2当前索引
    int k = 0;// temp当前索引

    while (i < m || j < n) {
        if (i >= m) {
            temp[k] = nums2[j];
            j++;
            k++;
        } else if (j >= n) {
            temp[k] = nums1[i];
            i++;
            k++;
        } else if (nums1[i] < nums2[j]) {
            temp[k] = nums1[i];
            i++;
            k++;
        } else if (nums1[i] > nums2[j]) {
            temp[k] = nums2[j];
            j++;
            k++;
        } else {
            temp[k] = nums1[i];

            i++;
            k++;

            temp[k] = nums2[j];

            j++;
            k++;
        }
    }

    for (int t = 0; t < temp.length; t++) {
        nums1[t] = temp[t];
    }
}
```

## Review
- [Let your delegates auto-nullify references☠](https://medium.com/scalereal/let-your-delegates-auto-nullify-references-%EF%B8%8F-3ad6d8875497)

## Tip
+ 最好的判断图片格式的方法：
```java
String filePath = file.getPath();
BitmapFactory.Options options = new BitmapFactory.Options();
options.inJustDecodeBounds = true;
BitmapFactory.decodeFile(filePath, options);

String mimeType = options.outMimeType;
LogUtils.d(TAG, "图片类型1：" + mimeType);
```
+ 可利用`layout_constraintWidth_max`和`layout_constraintWidth_percent`对控件做最大宽度限制（百分比）

## Share
暂无内容