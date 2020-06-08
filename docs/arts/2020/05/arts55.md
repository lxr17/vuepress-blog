# 第五十五周ARTS总结
## Algorithm
- [Valid Number](https://leetcode.com/problems/valid-number/)
> 3ms | 39.99% Run time  
> 39.6MB | 54.66% Memory
```java
public boolean isNumber(String s) {
    // 去除左右的空格
    s = s.trim();

    // 空判断
    if (s.length() == 0) {
        return false;
    }

    // e在开头或者结尾都不是数字
    if (s.charAt(0) == 'e' || s.charAt(s.length() - 1) == 'e') {
        return false;
    }

    // 判断字符是否满足条件
    for (char ch : s.toCharArray()) {
        boolean isMatter = (ch >= '0' && ch <= '9') || ch == '+' || ch == '-' || ch == 'e' || ch == '.';
        if (!isMatter) {
            return false;
        }
    }

    String[] splits = s.split("e");

    // 此时不止一个e
    if (splits.length > 2) {
        return false;
    } else if (splits.length == 2) {
        // split[1]必须为整数，split[0]必须为数字
        if (getType(splits[0]) != 0 && getType(splits[1]) == 1) {
            return true;
        } else {
            return false;
        }
    } else {
        if (getType(splits[0]) != 0) {
            return true;
        } else {
            return false;
        }
    }
}

/**
 * 判断s的类型
 * 注意：.1 和 1. 都算小数，但是 . 不是小数
 *
 * @param s
 * @return 0:非数字; 1:整数; 2:小数
 */
private int getType(String s) {
    if (s.length() == 0) {
        return 0;
    }

    // 是否包含数字
    boolean containDigit = false;

    // 小数点的索引
    int pointIndex = -1;

    for (int i = 0; i < s.length(); i++) {
        char ch = s.charAt(i);

        // 判断正负号
        if (ch == '+' || ch == '-') {
            // 当存在正负号不在首位时，s必定非数字
            if (i > 0) {
                return 0;
            }
        }

        // 判断小数点
        if (ch == '.') {
            // 此时有复数个小数点
            if (pointIndex >= 0) {
                return 0;
            } else {
                pointIndex = i;
            }
        }

        // 是否包含数字
        if (!containDigit && ch >= '0' && ch <= '9') {
            containDigit = true;
        }
    }

    if (!containDigit) {
        return 0;
    }

    if (pointIndex == -1) {
        return 1;
    } else {
        return 2;
    }
}
```
----
- [Plus One](https://leetcode.com/problems/plus-one/)
> 0ms | 100.00% Run time  
> 37.7MB | 89.06% Memory
```java
public int[] plusOne(int[] digits) {
    int carry = 1;

    for (int i = digits.length - 1; i >= 0; i--) {
        digits[i] = digits[i] + carry;
        carry = digits[i] / 10;
        digits[i] = digits[i] % 10;

        if (carry == 0) {
            break;
        }
    }

    if (carry > 0) {
        int[] ans = new int[digits.length + 1];
        ans[0] = carry;
        System.arraycopy(digits, 0, ans, 1, digits.length);

        return ans;
    } else {
        return digits;
    }
}
```

## Review
- [Creating Android animations with MotionLayout and MotionEditor](https://www.bignerdranch.com/blog/creating-android-animations-with-motionlayout-and-motioneditor/)

## Tip
+ 必须在主线程更新**UI**的原因：**Android**的**UI**线程不安全
+ **Handler**机制：
    + **Message**：线程之间传递的消息
    + **Handler**：发送与处理消息
    + **MessageQueue**：消息队列
    + **Looper**：**MessageQueue**的管家
+ 每一个线程只会有一个`MessageQueue`和`Looper`
+ **runOnUiThread**本质上使用了**Handler**机制
+ **AsyncTask**的泛型参数：
    + **Params**：在执行**AsyncTask**时传入的参数，可在后台任务中使用
    + **Progress**：后台执行任务时，如需显示进度，则通过该泛型指定进度的单位
    + **Result**：任务执行完毕返回结果的类型
+ **AsyncTask**常用方法：
    + **onPreExecute**：**主线程**：该方法会在后台任务开始执行之前调用，用于进行一些界面初始化操作
    + **doInBackground**：**子线程**：用于处理所有的耗时任务，如需反馈任务进度，可使用**publishProgress**来切换到主线程
    + **onProgressUpdate**：**主线程**：当**publicProgress**调用后，该方法会被立即调用
    + **onPostExecute**：**主线程**：后台任务完成后，**return**之后会调用该方法，可利用返回数据进行一些更新**UI**的操作

## Share
暂无内容