# 从APP跳转到微信指定联系人聊天页面功能的实现与采坑之旅
## 起因
最近做的APP中有一个新功能：已知用户微信号，可点击直接跳转到当前用户微信聊天窗口页面。

当时第一想法是使用无障碍来做，并且觉得应该不难，只是逻辑有点复杂。没想到最终踩了好多坑，特地把踩过的坑记录下来。

## 实现逻辑
在APP中点击按钮→跳转到微信界面→模拟点击微信搜索按钮→在微信搜索页面输入获取的微信号→模拟点击查询到的用户进入用户聊天界面。

## 效果图

![](https://pic.superbed.cn/item/5da9370b451253d178244f66.gif)

## 实现过程
### 跳转微信按钮点击事件
```java
jumpButton.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View view) {
              Intent intent = new Intent(Intent.ACTION_MAIN);
              ComponentName cmp = new ComponentName("com.tencent.mm", "com.tencent.mm.ui.LauncherUI");
              intent.addCategory(Intent.CATEGORY_LAUNCHER);
              intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
              intent.setComponent(cmp);
              startActivity(intent);
        }
   });
```

----
### 无障碍监听主要方法
#### 一些必要的参数
```java
/**
 * 微信主页面的“搜索”按钮id
 */
private final String SEARCH_ID = "com.tencent.mm:id/ij";

/**
 * 微信主页面bottom的“微信”按钮id
 */
private final String WECHAT_ID = "com.tencent.mm:id/d3t";

/**
 * 微信搜索页面的输入框id
 */
private final String EDIT_TEXT_ID = "com.tencent.mm:id/ka";

/**
 * 微信搜索页面活动id
 */
private String SEARCH_ACTIVITY_NAME = "com.tencent.mm.plugin.fts.ui.FTSMainUI";

private String LIST_VIEW_NAME = "android.widget.ListView";
```
微信组件的id之前有博客说过如何获取，所以在此就不重复说明了。

----
#### 监听主要方法
```java
@Override
public void onAccessibilityEvent(AccessibilityEvent event) {
    List<AccessibilityNodeInfo> searchNode = event.getSource().findAccessibilityNodeInfosByViewId(SEARCH_ID);
    List<AccessibilityNodeInfo> wechatNode = event.getSource().findAccessibilityNodeInfosByViewId(WECHAT_ID);

    if (searchNode.size() > 1) {
        // 点击“搜索”按钮
        if (searchNode.get(0).getParent().isClickable()) {
            searchNode.get(0).getParent().performAction(AccessibilityNodeInfo.ACTION_CLICK);
            return;
        }
    } else if (searchNode.size() == 1) {
        // 如果在“我”页面，则进入“微信”页面
        for (AccessibilityNodeInfo info : wechatNode) {
            if (info.getText().toString().equals("微信") && !info.isChecked()) {

                if (info.getParent().isClickable()) {
                    info.getParent().performAction(AccessibilityNodeInfo.ACTION_CLICK);
                    return;
                }
                break;
            }
        }
    }

    // 当前页面是搜索页面
    if (SEARCH_ACTIVITY_NAME.equals(event.getClassName().toString())) {
        List<AccessibilityNodeInfo> editTextNode = event.getSource().findAccessibilityNodeInfosByViewId(EDIT_TEXT_ID);

        if (editTextNode.size() > 0) {
            // 输入框内输入查询的微信号
            Bundle arguments = new Bundle();
            arguments.putCharSequence(AccessibilityNodeInfo.ACTION_ARGUMENT_SET_TEXT_CHARSEQUENCE, Constant.wechatId);
            editTextNode.get(0).performAction(AccessibilityNodeInfo.ACTION_SET_TEXT, arguments);
        }
    } else if (LIST_VIEW_NAME.equals(event.getClassName().toString())) {
        // 如果监听到了ListView的内容改变，则找到查询到的人，并点击进入
        List<AccessibilityNodeInfo> textNodeList = event.getSource().findAccessibilityNodeInfosByText("微信号: " + Constant.wechatId);
        if (textNodeList.size() > 0) {
            textNodeList.get(0).getParent().performAction(AccessibilityNodeInfo.ACTION_CLICK);
        }
    }

}
```
这是最原始的版本，具体逻辑已在注释中说明。

## 遇到的坑
### 1. 搜索内容无法赋值给搜索框
最开始以为是赋值的方法有问题，但是在调试状态下能够赋值成功。因此猜测是因为UI加载太慢的缘故。

在搜索框还没完全加载完全的时候就进行了赋值，因此赋值不成功。

<span style="color: #ff0000;font-weight: bold">解决办法：</span>

在赋值之前停顿300ms，在30行赋值前先停顿300ms。
```java
try {
    Thread.sleep(300);
} catch (InterruptedException e) {
    e.printStackTrace();
}
```
----
### 2. 如何停止监听？
由于监听是一直会进行的，因此只要进入了微信页面就会执行无障碍方法。这是不合理的。理论上应该在点击按钮进入微信才开始监听，而查找到好友之后就停止监听。

<span style="color: #ff0000;font-weight: bold">解决办法：</span>  
可以设置全局的变量用来控制监听。需要在点击按钮设置变量值为监听，而查找到微信好友之后设置为不监听。

<span style="color: #008000;">全局变量：</span>
```java
public class Constant {

    /**
     * 判断是否需要监听
     */
    public static int flag = 0;

    /**
     * 微信号
     */
    public static String wechatId;
}
```
----
<span style="color: #008000;">按钮点击修改flag值：</span>
```java
jumpButton.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view) {
        Intent intent = new Intent(Intent.ACTION_MAIN);
        ComponentName cmp = new ComponentName("com.tencent.mm", "com.tencent.mm.ui.LauncherUI");
        intent.addCategory(Intent.CATEGORY_LAUNCHER);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setComponent(cmp);
        startActivity(intent);

        Constant.flag = 1;
        Constant.wechatId = editText.getText().toString();
    }
});
```

----
<span style="color: #008000;">根据flag判断是否需要监听：</span>

在无障碍服务的监听方法中开始位置判断，

```java
// 只有从app进入微信才进行监听
if (Constant.flag == 0) {
    return;
}
```

----
<span style="color: #008000;">查询到结果后修改flag值：</span>
```java
// 如果监听到了ListView的内容改变，则找到查询到的人，并点击进入
List<AccessibilityNodeInfo> textNodeList = event.getSource().findAccessibilityNodeInfosByText("微信号: " + Constant.wechatId);
if (textNodeList.size() > 0) {
    textNodeList.get(0).getParent().performAction(AccessibilityNodeInfo.ACTION_CLICK);

    // 模拟点击之后将暂存值置空，类似于取消监听
    Constant.flag = 0;
    Constant.wechatId = null;
}
```
----
### 3. 没查询到结果如何停止监听？
想必大家都发现了，上面的处理方法还没有考虑到未查询到好友的情况。那么，未查询到好友如何停止监听呢？

最开始想的是找到未查询页面，只要知道了什么情况是未查询的，那就可以停止监听了。

但是未查询到好友的页面查找比较麻烦，因此想了一个取巧的办法。

<span style="color: #ff0000;font-weight: bold">解决办法：</span>  
写一个线程，两秒后执行，因为用户一般在未查询到结果页面会停留至少两秒，两秒误操作就停止监听。

<span style="color: #008000;">线程实现（线程得是类持有的，而不应该是方法持有的）：</span>
```java
Handler handler = new Handler();
Runnable runnable = new Runnable() {
    @Override
    public void run() {
        Constant.flag = 0;
        Constant.wechatId = null;
    }
};
```
----
<span style="color: #008000;">监听方法内进行线程的开启操作：</span>

```java
// 两秒后如果还没有任何的事件，则停止监听
handler.removeCallbacks(runnable);
handler.postDelayed(runnable, 2000);
```

由于无障碍的监听方法会反复执行，因此为了保证其正确性，需要保证在最后一次事件才开始计时。

----
### 4. 如果在微信其他页面怎么办？
最开始被这个问题难住了。后来产品给了我一个思路，其实很简单，如果判断当前页面并不是微信主页面的话，就执行全局返回按钮事件就行。

<span style="color: #ff0000;font-weight: bold">解决办法：</span>  
如果是页面改变事件，并且当前页面不是主页面也不是搜索页面（搜索页面就可以直接搜索了）的话，就执行全局返回键。

```java
if (event.getEventType() == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED && !LAUNCHER_ACTIVITY_NAME.equals(event.getClassName().toString()) && !SEARCH_ACTIVITY_NAME.equals(event.getClassName().toString())) {
    // 如果当前页面不是微信主页面也不是微信搜索页面，就模拟点击返回键
    performGlobalAction(AccessibilityService.GLOBAL_ACTION_BACK);
    return;
}
```
----
### 5. 页面改变UI加载太慢
在解决上述问题时，又遇到了之前遇到的问题，UI加载太慢的问题，因此需要在每次页面改变事件中都得加上300ms的延迟时间。

<span style="color: #ff0000;font-weight: bold">解决办法：</span>  
```java
// 页面改变时需要延迟一段时间进行布局加载
if (event.getEventType() == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) {
    try {
        Thread.sleep(300);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
}
```
----
### 6. 聊天界面和主页面是同一个活动
解决了上述问题之后，又遇到了一个新的问题，经常性的返回到聊天页面就不返回了。

经过调试，发现聊天页面的活动和微信主页面的活动是同一个。

<span style="color: #ff0000;font-weight: bold">解决办法：</span>  
对聊天界面单独做处理，根据聊天界面左上角UI存在不存在来确定是否为聊天界面。
  
![](https://pic.superbed.cn/item/5da9370b451253d178244f6b.jpg)

```java
if (event.getEventType() == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED && !LAUNCHER_ACTIVITY_NAME.equals(event.getClassName().toString()) && !SEARCH_ACTIVITY_NAME.equals(event.getClassName().toString())) {
    // 如果当前页面不是微信主页面也不是微信搜索页面，就模拟点击返回键
    performGlobalAction(AccessibilityService.GLOBAL_ACTION_BACK);
    return;
} else if (event.getEventType() == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED && LAUNCHER_ACTIVITY_NAME.equals(event.getClassName().toString())) {
    List<AccessibilityNodeInfo> list = event.getSource().findAccessibilityNodeInfosByViewId(USERNAME_ID);
    if (list.size() > 0) {
        // 如果是微信主页面，但是是微信聊天页面，则模拟点击返回键
        performGlobalAction(AccessibilityService.GLOBAL_ACTION_BACK);
        return;
    }
}
```

其中`USRENAME_ID`为左上角备注部分的`UIid`。

----
###  7. 搜索不到结果时，发现他在搜索结果页面乱跳
经排查，发现搜索结果页面中的搜索布局提示布局id和首页面的搜索按钮id一致，因此就执行了点击搜索按钮的方法。

![](https://pic.superbed.cn/item/5da9370b451253d178244f70.jpg)

<span style="color: #ff0000;font-weight: bold">解决办法：</span>  
对于搜索按钮页面（主页面）也要进行单独判断，由于主页面一定有`ViewPage`布局，因此只要找到`ViewPage`那就证明是在主页面。

```java
List<AccessibilityNodeInfo> searchNode = event.getSource().findAccessibilityNodeInfosByViewId(SEARCH_ID);
List<AccessibilityNodeInfo> wechatNode = event.getSource().findAccessibilityNodeInfosByViewId(WECHAT_ID);
List<AccessibilityNodeInfo> viewPageNode = event.getSource().findAccessibilityNodeInfosByViewId(VIEW_PAGE_ID);

Log.e(TAG, "searchNode:" + searchNode.size());
Log.e(TAG, "viewPageNode:" + viewPageNode.size());

// 由于搜索控件在多个页面都有，所以还得判断是否在主页面
if (searchNode.size() > 1 && viewPageNode.size() > 0) {
    // 点击“搜索”按钮
    if (searchNode.get(0).getParent().isClickable()) {
        searchNode.get(0).getParent().performAction(AccessibilityNodeInfo.ACTION_CLICK);
        return;
    }
} else if (searchNode.size() == 1) {
    // 如果在“我”页面，则进入“微信”页面
    for (AccessibilityNodeInfo info : wechatNode) {
        if (info.getText().toString().equals("微信") && !info.isChecked()) {

            if (info.getParent().isClickable()) {
                info.getParent().performAction(AccessibilityNodeInfo.ACTION_CLICK);
                return;
            }
            break;
        }
    }
}
```

----
### 8. 在主页面偶尔找不到搜索按钮
这个问题很奇怪，排查了半天也没发现为什么。这个问题主要出现在进入微信比较深的地方一步步返回之后。我发现找不到搜索按钮主要是通过id找直接就没找到。

于是就换了一种查找控件的方式。

<span style="color: #ff0000;font-weight: bold">解决办法：</span>  
将`event.getSource()`换成`getRootInActiveWindow()`。

```java
// 用getRootInActiveWindow是为了防止找不到搜索按钮的问题
List<AccessibilityNodeInfo> searchNode = getRootInActiveWindow().findAccessibilityNodeInfosByViewId(SEARCH_ID);
List<AccessibilityNodeInfo> wechatNode = getRootInActiveWindow().findAccessibilityNodeInfosByViewId(WECHAT_ID);
List<AccessibilityNodeInfo> viewPageNode = getRootInActiveWindow().findAccessibilityNodeInfosByViewId(VIEW_PAGE_ID);
```

----
### 9. 如果通过同一微信号进行查找，会发现在搜索结果页面就停止了
经排查，发现在搜索结果页面直接更改输入框的查询值，如果值一样的话，不会触发任何的事件。出现该问题的原因就在这。

<span style="color: #ff0000;font-weight: bold">解决办法：</span>  
先清空输入框，再输入需要查询的微信号。

```java
if (editTextNode.size() > 0) {
    try {
        Thread.sleep(300);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }

    // 输入框内清空
    Bundle clear = new Bundle();
    clear.putCharSequence(AccessibilityNodeInfo.ACTION_ARGUMENT_SET_TEXT_CHARSEQUENCE, "");
    editTextNode.get(0).performAction(AccessibilityNodeInfo.ACTION_SET_TEXT, clear);

    // 输入框内输入查询的微信号
    Bundle arguments = new Bundle();
    arguments.putCharSequence(AccessibilityNodeInfo.ACTION_ARGUMENT_SET_TEXT_CHARSEQUENCE, Constant.wechatId);
    editTextNode.get(0).performAction(AccessibilityNodeInfo.ACTION_SET_TEXT, arguments);
}
```

## 反思
+ 任何一门技术都是说说容易，做做难。因为在实现过程中总会出现各种各样的问题；
+ 通过无障碍的方式来实现该功能效率低，并且不稳定，不知是否有更好的方法；
+ `Android`系统真的特别不安全！

## GitHub地址：[JumpToWeChat](https://github.com/lxr17/JumpToWeChat) 