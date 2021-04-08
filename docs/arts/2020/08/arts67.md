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
+ 给`TextView`设置上下左右图标的时候最好用`setCompoundDrawablesWithIntrinsicBounds`而不是`setCompoundDrawables`，因为需要先设置`Drawable`的`setBounds`
+ `Dalvik`虚拟机（Android 5.0 [API 21]之前)同时只能加载一个`dex`文件，因此某些`SDK`要求代码放在主`dex`中；`ART`虚拟机（Android 5.0 [API 21]之后）可同时加载多个`dex`文件，因此不必这么做
+ 反射的基本用法：
    ```kotlin
    val clazz = picker::class.java
    val filed = clazz.getDeclaredField("mPaint")
    filed.isAccessible = true
    val xxx = filed.get(picker) as Paint
    xxx.isFakeBoldText = true
    ```

## Share
暂无内容