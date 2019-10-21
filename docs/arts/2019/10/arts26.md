# 第二十六周ARTS总结
## Algorithm
- [Next Permutation](https://leetcode.com/problems/next-permutation/)
> 0ms | 100.00% Run time  
> 41.5MB | 31.00% Memory
```java
public void nextPermutation(int[] nums) {
    boolean finded = false;

    for (int i = nums.length - 1; i > 0; i--) {
        // 如果前一个数比后一个数小（i-1之后的必定为倒序），则找到i-1之后的最接近i-1并且比i-1大的数
        if (nums[i] > nums[i - 1]) {
            int index = nums.length - 1;
            while (nums[index] <= nums[i - 1]) {
                index--;
            }

            // 交换index索引处的值与i-1索引处的值
            int temp = nums[i - 1];
            nums[i - 1] = nums[index];
            nums[index] = temp;

            // 重排列i-1之后的数组
            sortRest(nums, i - 1);

            finded = true;

            break;
        }
    }

    // 如果全倒序
    if (!finded) {
        sortRest(nums, -1);
    }
}

// 将index后边的重新排列
private void sortRest(int[] nums, int index) {
    int x = index + 1;
    int y = nums.length - 1;

    while (x <= y) {
        int temp = nums[y];
        nums[y] = nums[x];
        nums[x] = temp;
        x++;
        y--;
    }
}
```

## Review
- [Android UI Testing Frameworks](https://proandroiddev.com/android-ui-testing-frameworks-b0b52187ceb)  

## Tip
+ ![](https://he_jhua.gitee.io/image-hosting/2019/10/21/arts26-1.png)
  + `aapt`:打包资源文件，包括`res`和`assets`文件夹下的资源、`AndroidManifest.xml`文件、`Android`基础类库
  + `aidl`:将`.aidl`接口文件转换成`.java`文件
  + `Java Compiler`:编译`java`文件，生成`.class`字节码文件
  + `dex`:将所有的第三方`libraries`和`.class`文件转换成`Dalvik虚拟机`支持的`.dex`文件
  + `apkbuilder`:打包生成apk文件，但未签名
  + `Jarsigner`:对未签名的apk文件进行签名
  + `zipalign`:对签名后的apk文件进行对其处理
  
## Share