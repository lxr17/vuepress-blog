# 利用AccessibilityService自动获取微信号（Android）

## 前言
最近遇到一个需求，要求写一个小插件，能够自动在微信的页面弹出一个窗口，展示用户的相关信息（与我们公司有关的信息，方便运营快速了解用户信息）。

当时我第一反应是不可能，如果能够在别的app中获取对应的信息，那岂不是太不安全了。直到我知道了`AccessibilityService`这个东西。

## 基本思路
利用`AccessibilityService`服务来获取到微信页面的页面信息，并获取到用户的微信号，有了微信号一切都好办了。

由于获取用户好友微信号和获取本人微信号的方法相同，因此此篇文章主要介绍的是如何通过`AccessibilityService`来获取本人的微信号。

## 过程
### AccessibilityService是什么？
在你的手机更多设置或者高级设置中，我们会发现有个无障碍的功能，很多人不知道这个功能具体是干嘛的，其实这个功能是为了增强用户界面以帮助残障人士，或者可能暂时无法与设备充分交互的人们。

它的具体实现是通过`AccessibilityService`服务运行在后台中，通过`AccessibilityEvent`接收指定事件的回调。这样的事件表示用户在界面中的一些状态转换，例如：焦点改变了，一个按钮被点击，等等。这样的服务可以选择请求活动窗口的内容的能力。简单的说`AccessibilityService`就是一个后台监控服务，当你监控的内容发生改变时，就会调用后台服务的回调方法。

----
### 如何创建一个AccessibilityService？
<span style="color: #ffffff; background-color: #666699;">实现一个自己的<em>AccessibilityService</em>，需要继承<em>AccessibilityService</em>类，并至少实现<em>onAccessibilityEvent</em>和<em>onInterrupt</em>方法：</span>

```java
public class MyAccessibilityService extends AccessibilityService {

    final String TAG = "MyAccessibilityService";

    /**
     * 当服务启动的时候会被调用
     */
    @Override
    protected void onServiceConnected() {
        super.onServiceConnected();
        Log.d(TAG, "connected");
    }

    /**
     * 监听窗口变化的回调
     */
    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        Log.d(TAG, event.getPackageName() + "");
    }

    /**
     * 中断服务的回调
     */
    @Override
    public void onInterrupt() {
        Log.d(TAG, "onInterrupt");
    }
}
```

`AccessibilityService`中的一些常用方法：
+ `disableSelf()`：禁用当前服务，服务可以通过该方法停止运行；
+ `findFocus(int focus)`：查找拥有特定焦点类型的控件；
+ `getRootInActiveWindow()`：如果配置能够获取窗口内容,则会返回当前活动窗口的根结点；
+ `getServiceInfo()`：获取当前服务的配置信息；
+ `onAccessibilityEvent(AccessibilityEvent event)`：有关`AccessibilityEvent`事件的回调函数，系统通过`sendAccessibiliyEvent()`不断的发送`AccessibilityEvent`到此处；
+ `performGlobalAction(int action)`：执行全局操作，比如返回，回到主页，打开最近等操作；
+ `setServiceInfo(AccessibilityServiceInfo info)`：设置当前服务的配置信息；
+ `onServiceConnected()`：系统成功绑定该服务时被触发，也就是当你在设置中开启相应的服务，系统成功的绑定了该服务时会触发，通常我们可以在这里做一些初始化操作；
+ `onInterrupt()`：服务中断时的回调。

----
<span style="background-color: #666699; color: #ffffff;">声明该服务：</span>

```xml
<service
    android:name=".MyAccessibilityService"
    android:enabled="true"
    android:exported="true"
    android:label="这是一个用户测试的无障碍服务"
    android:permission="android.permission.BIND_ACCESSIBILITY_SERVICE">
    <intent-filter>
        <action android:name="android.accessibilityservice.AccessibilityService" />
    </intent-filter>
</service>
```

----
<span style="background-color: #666699; color: #ffffff;">配置服务参数：</span>

主要是用于声明该服务的一些配置参数，现在有两种配置服务参数的方法：在安卓`4.0`之后可以通过`meta-data`标签来在`xml`中配置，也可以通过动态代码直接配置。这里我们通过`xml`进行配置。

首先在`res`下的`xml`文件夹下创建配置文件，

```xml
<?xml version="1.0" encoding="utf-8"?>
<accessibility-service xmlns:android="http://schemas.android.com/apk/res/android"
    android:accessibilityEventTypes="typeAllMask"
    android:accessibilityFeedbackType="feedbackAllMask"
    android:canRetrieveWindowContent="true"
    android:notificationTimeout="100"
    android:packageNames="com.tencent.mm"
    android:description="@string/description" />
```

然后将配置文件添加到清单文件中，

```xml
<service
    android:name=".MyAccessibilityService"
    android:enabled="true"
    android:exported="true"
    android:label="这是一个用户测试的无障碍服务"
    android:permission="android.permission.BIND_ACCESSIBILITY_SERVICE">
    <intent-filter>
        <action android:name="android.accessibilityservice.AccessibilityService" />
    </intent-filter>
    <meta-data
        android:name="android.accessibilityservice"
        android:resource="@xml/config_accessibility" />
</service>
```

下面对xml中的一些参数进行介绍：
1. `accessibilityEventTypes`：表示该服务对界面中的哪些变化感兴趣，即哪些事件通知，比如窗口打开，滑动，焦点变化，长按等。具体的值可以在`AccessibilityEvent`类中查到，如`typeAllMask`表示接受所有的事件通知；
2. `accessibilityFeedbackType`：表示反馈方式，比如是语音播放，还是震动<span style="color: #ff0000;">（此参数是必须的，不写的话不会走回调方法）</span>；
3. `canRetrieveWindowContent`：表示该服务能否访问活动窗口中的内容.也就是如果你希望在服务中获取窗体内容的化，则需要设置其值为`true`；
4. `notificationTimeout`：接受事件的时间间隔,通常将其设置为`100`即可；
5. `packageNames`：表示对该服务是用来监听哪个包的产生的事件，这里以微信的包名为例<span style="color: #ff0000;">（如果要监听的包有多个，则可以在代码中设置；如若不写，则监控的是所有的包）</span>；
6. `description`：对该服务的无障碍描述。

----
### 如何开启AccessibilityService呢？
以小米手机为例，在设置中打开更多设置，进入无障碍。然后打开之前声明的服务即可。
![](https://pic.superbed.cn/item/5da849e3451253d17803f80f.gif)

----
### 如何获取微信“我的”页面的微信号呢？
这里主要利用`AccessibilityNodeInfo的findAccessibilityNodeInfosByViewId(String viewId)`方法，该方法用于根据控件标识来获取到整个控件。

那么问题来了，如何知道微信该控件的标识呢？这里可以通过`SDK`的工具`DDMS`工具。

进入`SDK`目录的`tools`目录，找到`monitor.bat`文件，双击即可。
![](https://pic.superbed.cn/item/5da849e3451253d17803f811.png)

进入`DDMS`界面后，选中微信的包名，并点击如下所示按钮即可分析当前微信页面的布局信息：
![](https://pic.superbed.cn/item/5da849e3451253d17803f813.png)

如下图，可以发现该控件的标识为：`com.tencent.mm:id/czz`
![](https://pic.superbed.cn/item/5da849e3451253d17803f815.png)

因此，即可通过如下方法获取到该控件的值：
```java
@Override
public void onAccessibilityEvent(AccessibilityEvent event) {
    Log.d(TAG, event.getPackageName() + "");

    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.JELLY_BEAN_MR2) {
        // 通过id获取到微信号的View
        List<AccessibilityNodeInfo> nodeInfoList = getRootInActiveWindow().findAccessibilityNodeInfosByViewId("com.tencent.mm:id/czz");
        String wxCode;
        if (nodeInfoList != null && nodeInfoList.size() > 0) {
            wxCode = nodeInfoList.get(0).getText().toString();
            Log.d(TAG, wxCode);
        }
    }

}
```

运行结果如下：
![](https://pic.superbed.cn/item/5da849e3451253d17803f818.png)

## 总结
+ 在过程中遇到了两个问题：第一个问题是运行完了之后服务已经开启，但是一直不走回调，经查是由于没有写`accessibilityFeedbackType`参数的原因；
+ 第二个问题是，一开始通过`Android Studio`自带的`Layout Inspector`来获取控件的标识，当时获取的标识是`czz`，并不全，导致一直获取不到相应的微信号；
+ 无障碍服务是一个很便携但是也很危险的服务，所以轻易不要给别人无障碍服务的权限；
+ 不要轻易对一件事进行判断，需要进行了解之后才进行判断（在此之前我一直觉得该功能是无法实现的）；
+ 对于一个功能，第一反应应该是如何实现而不是如何推脱。

## 参考博客
+ [你真的理解AccessibilityService吗](https://www.jianshu.com/p/4cd8c109cdfb)
+ [[Android进阶]学习AccessibilityService实现微信抢红包插件](https://www.cnblogs.com/huolongluo/p/6120946.html)
