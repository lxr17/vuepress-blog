# 微信分享大图遇到的问题（Android）
## 起因
要做一个微信图片分享的功能，但是对于大图会如下问题：
![](https://pic.superbed.cn/item/5da83110451253d178f16601.png)
当时没有仔细查看错误日志，单纯的以为是图片太大的问题。

## 分享图片代码
```java
public void WXsharePic(String transaction, final boolean isSession, Bitmap bitmap) {
    //初始化WXImageObject和WXMediaMessage对象
    WXImageObject imageObject = new WXImageObject(bitmap);
    WXMediaMessage msg = new WXMediaMessage();
    msg.mediaObject = imageObject;
    //设置缩略图
    Bitmap scaledBitmap = Bitmap.createScaledBitmap(bitmap, 200, 200, true);
    bitmap.recycle();
    msg.thumbData = getBitmapByte(scaledBitmap);
    //构造一个Req
    SendMessageToWX.Req req = new SendMessageToWX.Req();
    req.transaction = transaction + Long.toString(System.currentTimeMillis());
    req.message = msg;
    //表示发送给朋友圈  WXSceneTimeline  表示发送给朋友  WXSceneSession
    req.scene = isSession ? SendMessageToWX.Req.WXSceneSession : SendMessageToWX.Req.WXSceneTimeline;
    //调用api接口发送数据到微信
    api.sendReq(req);
}
```

## 解决过程
### ~~想法一~~
查看微信的文档，发现如下信息：
![](https://pic.superbed.cn/item/5da83110451253d178f16603.png)
初步判定是略缩图过大导致的，准备对略缩图进一步压缩。

但是在调试过程中发现略缩图并没有超过32K，于是<span style="color: #ff0000;">这种想法不正确</span>。

----
### ~~想法二~~
既然不是略缩图过大，那大概率就是原图过大了。然而微信官方文档上也没有说明原图大小限制，所以也不知道是否是这个原因。

于是准备测试一下是否是这个原因，对原图进一步压缩。
```java
public static byte[] bitmap2Bytes(Bitmap bitmap, int maxkb) {
    ByteArrayOutputStream output = new ByteArrayOutputStream();
    bitmap.compress(Bitmap.CompressFormat.PNG, 100, output);
    int options = 100;
    while (output.toByteArray().length > maxkb&& options != 10) {
        output.reset(); //清空output
        bitmap.compress(Bitmap.CompressFormat.JPEG, options, output);//这里压缩options%，把压缩后的数据存放到output中
        options -= 10;
    }
    return output.toByteArray();
}
```

从代码可知，设置了一个最大`kb`值，并每次循环压缩率递减`10%`.

然而实际运行中发现无论`maxkb`设置的多小，还是会出这个问题。

仔细调试发现，原图大小为`3M`多，即使是最小`10%`的压缩率也过大了。

于是将压缩率递减改为`1%`.

<span style="font-size: 14pt; color: #ff0000;"><strong>将压缩率递减改为1%，并且maxkb设置为500KB时，就没问题了！</strong></span>

<span style="color: #ff0000;">但是，有两个很严重的问题：</span>  
<span style="color: #ff0000;">1. 微信的原图最大只能是500KB吗？</span>  
<span style="color: #ff0000;">2. 循环压缩所需时间太久，差不多半分钟才能压缩完毕，效率太低。</span>

----
### 想法三
这个时候，我才开始注意起错误日志来。

错误日志是Binder类出现的，字面意思是数据过大。查看微信的SDK源码可以发现实际上调用微信API，微信会将图片传递给一个新的活动。

而<span style="color: #ff0000;">Intent传值有大小限制，最大只能512KB</span>！

现在错误原因知道了，**微信分享图片会涉及到启动一个新活动，而新活动涉及到Intent传值，而Intent传值有大小限制，于是就会出问题。**

可是如何解决呢？

<span style="font-size: 14pt; color: #ff0000;"><strong>既然直接传图片的Bitmap太大，那就把图片先保存在本地，然后直接传递图片的地址。</strong></span>

## 解决过程
### 分享图片
```java
public void WXsharePic(String transaction, final boolean isSession, Bitmap bitmap, String path) {
    //初始化WXImageObject和WXMediaMessage对象
    WXImageObject imageObject;
    if (!StringUtil.isBlank(path)) {
        imageObject = new WXImageObject();
        imageObject.setImagePath(path);
    } else {
        imageObject = new WXImageObject(bitmap);
    }
    WXMediaMessage msg = new WXMediaMessage();
    msg.mediaObject = imageObject;
    //设置缩略图
    Bitmap scaledBitmap = Bitmap.createScaledBitmap(bitmap, 200, 200, true);
    bitmap.recycle();
    msg.thumbData = getBitmapByte(scaledBitmap);
    //构造一个Req
    SendMessageToWX.Req req = new SendMessageToWX.Req();
    req.transaction = transaction + Long.toString(System.currentTimeMillis());
    req.message = msg;
    //表示发送给朋友圈  WXSceneTimeline  表示发送给朋友  WXSceneSession
    req.scene = isSession ? SendMessageToWX.Req.WXSceneSession : SendMessageToWX.Req.WXSceneTimeline;
    //调用api接口发送数据到微信
    api.sendReq(req);
}
```

----
### 调用分享
```java
private void shareToMoment() {
    final Bitmap sharePicture = getBitmapByView(svShare);
    AndPermission.with(this)
            .permission(Permission.WRITE_EXTERNAL_STORAGE)
            .onGranted(new Action() {
                @Override
                public void onAction(List<String> permissions) {
                    String path = saveImageToGallery(sharePicture);
                    WXsharePic("he" + System.currentTimeMillis(), true, sharePicture, path);
                }
            })
            .onDenied(new Action() {
                @Override
                public void onAction(@NonNull List<String> permissions) {
                    Log.e("Activity", "权限申请失败");
                }
            })
            .start();
}
```

----
### 保存图片
```java
public String saveImageToGallery(Bitmap bmp) {
     // 首先保存图片
     String storePath = Environment.getExternalStorageDirectory().getAbsolutePath() + File.separator + "dearxy";
     File appDir = new File(storePath);
     if (!appDir.exists()) {
         appDir.mkdir();
     }
     String fileName = System.currentTimeMillis() + ".jpg";
     File file = new File(appDir, fileName);
     try {
         FileOutputStream fos = new FileOutputStream(file);
         //通过io流的方式来压缩保存图片
         bmp.compress(Bitmap.CompressFormat.JPEG, 60, fos);
         fos.flush();
         fos.close();
     } catch (IOException e) {
         e.printStackTrace();
     }
     return storePath + "/" + fileName;
 }
```

## 反思
+ 遇到问题直接查看错误日志，找到问题的根源，不能想当然；
+ 对于安卓基础的了解有待加强；
+ 总算明白了为什么`QQ`分享需要请求存储权限；
+ `BAT`现在是大家，对于他们的`API`需要熟悉了解。


