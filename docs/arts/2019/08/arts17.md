# 第十七周ARTS总结
## Algorithm
- [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)
> 2ms | 60.63% Run time  
> 34.4MB | 100.00% Memory
```java
public boolean isValid(String s) {
    // 利用栈的特性
    Stack<Character> stack = new Stack<>();

    if (s == null || s.length() == 0) {
        return true;
    }

    // 注意判空
    for (Character ch : s.toCharArray()) {
        if (!stack.empty() && ')' == ch && '(' == stack.peek()) {
            stack.pop();
        } else if (!stack.empty() && ']' == ch && '[' == stack.peek()) {
            stack.pop();
        } else if (!stack.empty() && '}' == ch && '{' == stack.peek()) {
            stack.pop();
        } else {
            stack.push(ch);
        }
    }

    return stack.empty();
}
```
## Review
- [Picking your compileSdkVersion, minSdkVersion, and targetSdkVersion](https://medium.com/androiddevelopers/picking-your-compilesdkversion-minsdkversion-targetsdkversion-a098a0341ebd#.egywqatjg)

## Tip
+ Android6、7、8、9适配的要点
  + `Android6`：动态权限的申请
  + `Android7`：应用间共享权限，签名时v1、v2方式，`Popupwindow`的显示问题，后台广播优化，状态栏问题，`Toast`和`WebView`的问题
  + `Android8`：运行时权限申请（组），通知适配，悬浮窗适配，安装APK，透明主题的`Activity`，集合的处理，后台执行策略
  + `Android9`：http请求失败，Apache HTTP弃用，前台服务，启动`Activity`，异形屏适配，权限组的变更，设备号的获取

## Share
- [Android 属性动画实战](https://www.cnblogs.com/lanxingren/p/11309747.html)