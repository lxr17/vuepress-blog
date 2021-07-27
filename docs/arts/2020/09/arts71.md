# 第七十一周ARTS总结
## Algorithm
- [Restore IP Addresses](https://leetcode.com/problems/restore-ip-addresses/)
> 7ms | 35.02% Run time  
> 39.6MB | 17.72% Memory
```java
public List<String> restoreIpAddresses(String s) {
    // 思路是在s中确定三个位置放点
    // 先找到中间的那个点
    // 然后分别找第一个和第三个点
    List<String> ans = new ArrayList<>();

    List<Integer> middles = findMiddlePoint(s);

    for (Integer middle : middles) {
        findAndLoadRestPoint(s, middle, ans);
    }

    return ans;
}

/**
 * 找出中间的那个点
 *
 * @param s
 * @return
 */
private List<Integer> findMiddlePoint(String s) {
    List<Integer> ans = new ArrayList<>();
    char[] chars = s.toCharArray();

    // 左边的长度在2~6之间，右边的长度在2~6之间，然后注意0开头的情况
    for (int i = 0; i < chars.length; i++) {
        // 左边的长度不能小于2
        if (i + 1 < 2) {
            continue;
        }

        // 左边如果是0开头，长度不能超过4
        if (chars[0] == '0' && i + 1 > 4) {
            break;
        }

        // 左边的长度不能超过6
        if (i + 1 > 6) {
            break;
        }

        // 右边长度不能小于2
        if (chars.length - i - 1 < 2) {
            break;
        }

        // 右边如果是0开头，长度不能超过4
        if (chars[i + 1] == '0' && chars.length - i - 1 > 4) {
            continue;
        }

        // 右边的长度不能超过6
        if (chars.length - i - 1 > 6) {
            continue;
        }

        ans.add(i);
    }

    return ans;
}

/**
 * 找到剩余的点，并把生成的字符串放进ans内
 *
 * @param s
 * @param middlePoint
 * @param ans
 */
private void findAndLoadRestPoint(String s, int middlePoint, List<String> ans) {
    List<int[]> leftPart = new ArrayList<>();
    List<int[]> rightPart = new ArrayList<>();

    // 找到左右的点
    findPart(s, 0, middlePoint + 1, leftPart);
    findPart(s, middlePoint + 1, s.length(), rightPart);

    for (int[] left : leftPart) {
        for (int[] right : rightPart) {
            ans.add(left[0] + "." + left[1] + "." + right[0] + "." + right[1]);
        }
    }
}

/**
 * 找到从[startIndex, end)之间满足条件的一个点
 *
 * @param s
 * @param startIndex
 * @param end
 * @param part
 */
private void findPart(String s, int startIndex, int end, List<int[]> part) {
    char[] chars = s.toCharArray();

    for (int i = startIndex; i < end - 1; i++) {
        int p1, p2;

        if (chars[startIndex] == '0') {
            if (chars[startIndex + 1] == '0' && end - startIndex > 2) {
                break;
            }

            p1 = 0;
            p2 = Integer.parseInt(s.substring(startIndex + 1, end));

            if (p2 <= 255) {
                int[] temp = new int[]{p1, p2};
                part.add(temp);
            }

            break;
        } else {
            if (chars[i + 1] == '0' && end > i + 2) {
                continue;
            }

            p1 = Integer.parseInt(s.substring(startIndex, i + 1));
            p2 = Integer.parseInt(s.substring(i + 1, end));

            if (p1 <= 255 && p2 <= 255) {
                int[] temp = new int[]{p1, p2};
                part.add(temp);
            }
        }
    }
}
```

## Review
- [Updating your widget for Android 12](https://medium.com/androiddevelopers/updating-your-widget-for-android-12-92e7de87424c)

## Tip
+ **ndk**的选择
    + 国内：**armeabi-v7a**
    + 国外：**armeabi-v7a, arm64-v8a**
    + DEBUG：**x86, armeabi-v7a, arm64-v8a**（**x86**主要用于**Windows**上的模拟器）
+ 线程池的生命周期
  + **RUNNING**
  + **SHUTDOWN**
  + **STOP**
  + **TIDYING**
  + **TERMINATED**
+ **ThreadPoolExecutor**中的参数
  + **corePoolSize**：线程池的核心线程数
  + **workQueue**：任务队列
  + **maximumPoolSize**：线程池支持的最大线程数
  + **keepAliveTime**：非核心线程空闲时的存活时间
  + **unit**：存活时间的单位
  + **threadFactory**：创建线程的工厂
  + **handler**：拒绝策略
+ **APP**启动优化
  + 启动分类
    1. 冷启动
    2. 热启动：**APP**从后台到前台
    3. 温启动：**APP**进程仍然存在，重新启动活动
  + 获取启动时间
    1. `adb shell am start -W [packageName]/[packageName.xxActivity]`
    2. 使用代码打点：`attachBaseContext`时开启，界面完全展示后结束
    3. 利用工具
       + **TraceView**
       + **Systrace**
  + 常用优化策略
    1. 异步加载
       + 利用`CountDownLatch`来处理某些需要初始化完成后才能运行的情况
       + 利用启动器的思维
    2. 延迟加载：利用`IdleHandler`在主线程空闲的时候进行分批初始化
    3. 提前加载：利用`androidx-startup`
    4. 其他优化：给**Activity**添加一个自定义的主题，使用一个默认的界面
+ 触摸事件的传递顺序：**Activity** -> **PhoneWindow** -> **DecorView** -> **ViewGroup** -> **View**

## Share
暂无内容