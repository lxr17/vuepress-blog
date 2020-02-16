# 第三十七周ARTS总结
## Algorithm
- [Multiply Strings](https://leetcode.com/problems/multiply-strings/)
> 12ms | 20.40% Run time  
> 37MB | 100.00% Memory
```java
public String multiply(String num1, String num2) {
    // 判断是否有0
    if ("0".equals(num1) || "0".equals(num2)) {
        return "0";
    }

    // 构造一个数组用来存放最终结果
    int[] ans = new int[num1.length() + num2.length()];

    for (int i = 0; i < num1.length(); i++) {
        for (int j = 0; j < num2.length(); j++) {
            int num = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');
            insert(ans, num,
                    (num1.length() - 1 - i) + (num2.length() - 1 - j));
        }
    }

    // 输出
    StringBuilder sb = new StringBuilder();
    boolean start = false;
    for (int i = ans.length - 1; i >= 0; i--) {
        if (ans[i] == 0 && !start) {
            continue;
        } else {
            start = true;
            sb.append(Integer.toString(ans[i]));
        }
    }

    return sb.toString();
}

/**
 * 将数字插入数组
 *
 * @param ans   数组
 * @param num   单个数的乘积
 * @param zeros 0的个数
 */
private void insert(int[] ans, int num, int zeros) {
    // 索引
    int index = zeros;

    // 进位
    int carry = 0;

    // 被加数
    char[] chs = Integer.toString(num).toCharArray();

    // 从后往前遍历相加
    for (int i = chs.length - 1; i >= 0; i--) {
        int indexNum = chs[i] - '0' + ans[index] + carry;

        carry = indexNum / 10;

        ans[index++] = indexNum % 10;
    }

    // 进位
    while (carry > 0) {
        int indexNum = ans[index] + carry;

        carry = indexNum / 10;

        ans[index++] = indexNum % 10;
    }
}
```

## Review
- [ProGuard & R8: Part 1](https://dustn.dev/post/2019-11-6-understanding-the-android-build-pipeline/)

## Tip
+ `EditText`的`clearFocus()`方法无效 [[1]](https://juejin.im/post/5e00734de51d455804256ee0?utm_source=gold_browser_extension)：`clearFocus`并不是真的清除焦点，而是在整个布局中遍历获取`focusInTouchMode`为**true**的`View`,如果`EditText`为第一个，就又重新设置了焦点，陷入了死循环，所以才会看上去无效，解决方法只需要将`EditText`之前的`View`设置如下属性：
    ```java
    android:focusableInTouchMode="true"
    ```
+ 码率、分辨率、帧率 [[2]](https://www.jianshu.com/p/028196b8ca14)
    + 码率：指图像的精密度，像素的个数
    + 分辨率：期望的压缩后视频的大小
    + 帧率：每秒显示帧数
+ `adb`常用命令：
    + `adb devices`：列出所有已连接设备
    + `adb tcpip 5555`：设置目标设备以监听端口**5555**上的**TCP/IP**连接
    + `adb connect host[:port]`：通过**TCP/IP**连接到设备，如果您未指定端口，则使用默认端口**5555**
    + `adb disconnect [host | host:port]`：断开与在指定端口上运行的指定**TCP/IP**设备的连接
    + `adb kill-server`：终止**adb**服务器
    + `adb install path_to_apk`：安装**APK**
    + `adb pull remote local`：从设备中复制某个文件或目录（及其子目录）
    + `adb push local remote`：将某个文件或目录（及其子目录）复制到某个设备
    + `adb shell`：进入**shell**
        + `am`：调用**Activity**管理器
        + `pm`：调用软件包管理器
+ `Toolbar`内部左侧始终有一段空白，无法填充，只需 [[3]](https://juejin.im/post/5e00734de51d455804256ee0?utm_source=gold_browser_extension)
    ```xml
    app:contentInsetLeft="0dp"
    app:contentInsetStart="0dp"
    ```
+ 利用`BitmapRegionDecoder`可以实现加载大图

## Share
暂无内容