# Android拦截并获取WebView内部POST请求参数
## 起因
有些时候自家APP中嵌入的H5页面并不是自家的。但是很多时候又想在H5不知情的情况下获取H5内部请求的参数，这应该怎么做到呢？

带着这个疑问，就有了这篇博客。

## 实现过程
### ~~方案一~~
最开始想到的方案是直接拦截H5中所有的请求：
```java
webView.setWebViewClient(new WebViewClient() {
    @Override
    public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
        try {
            URL url = new URL(request.getUrl());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        Log.e("InternetActivity", request + "");
        return super.shouldInterceptRequest(view, request);
    }

});
```
但是通过此方法只能获取`get`请求的参数（<span style="color: #ff0000;">因为参数直接拼在了url链接中</span>），对于`post`请求的参数无可奈何。

----
### 方案二
后来参考了[request_data_webviewclient](https://github.com/KonstantinSchubert/request_data_webviewclient)，有了新的实现方式，具体原理为：<span style="color: #ff0000;">给H5注入一段js代码，目的是在每次Ajax请求都会调用Android原生的方法，将请求参数传给客户端。</span>

具体流程如下：
![](https://he_jhua.gitee.io/image-hosting/2019/10/21/14-1.jpg)

其中，

**js注入代码：**
```javascript
<script language="JavaScript">

    function generateRandom() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }


    // This only works if `open` and `send` are called in a synchronous way
    // That is, after calling `open`, there must be no other call to `open` or
    // `send` from another place of the code until the matching `send` is called.
    requestID = null;
    XMLHttpRequest.prototype.reallyOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
        requestID = generateRandom()
        var signed_url = url + "AJAXINTERCEPT" + requestID;
        this.reallyOpen(method, signed_url , async, user, password);
    };
    XMLHttpRequest.prototype.reallySend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(body) {
        interception.customAjax(requestID, body);
        this.reallySend(body);
    };

</script>
```
----
**客户端拦截请求：**
```java
@Override
public final WebResourceResponse shouldInterceptRequest(final WebView view, WebResourceRequest request) {
    String requestBody = null;
    Uri uri = request.getUrl();

    // 判断是否为Ajax请求（只要链接中包含AJAXINTERCEPT即是）
    if (isAjaxRequest(request)) {
        // 获取post请求参数
        requestBody = getRequestBody(request);
        // 获取原链接
        uri = getOriginalRequestUri(request, MARKER);
    }

    // 重新构造请求，并获取response
    WebResourceResponse webResourceResponse = shouldInterceptRequest(view, new WriteHandlingWebResourceRequest(request, requestBody, uri));
    if (webResourceResponse == null) {
        return webResourceResponse;
    } else {
        return injectIntercept(webResourceResponse, view.getContext());
    }
}
```
----
**客户端注入js代码：**
```java
private WebResourceResponse injectIntercept(WebResourceResponse response, Context context) {
    String encoding = response.getEncoding();
    String mime = response.getMimeType();

    // WebResourceResponse的mime必须为"text/html",不能是"text/html; charset=utf-8"
    if (mime.contains("text/html")) {
        mime = "text/html";
    }

    InputStream responseData = response.getData();
    InputStream injectedResponseData = injectInterceptToStream(
            context,
            responseData,
            mime,
            encoding
    );
    return new WebResourceResponse(mime, encoding, injectedResponseData);
}
```

<span style="color: #ff0000;">注：根据</span>[谷歌官方文档](https://developer.android.com/reference/android/webkit/WebResourceResponse)<span style="color: #ff0000;">，mime必须为"text/html"。</span>

![](https://he_jhua.gitee.io/image-hosting/2019/10/21/14-2.jpg)

## 反思
+ 开发过程中遇到了页面一直显示不了的问题，实际上就是因为获取到的`mime`是`text/html; charset=utf-8`，得改成`text/html`；
+ 通过此方法也可篡改`response`与`request`，但不要滥用；
+ 所以说，`Android`确实不安全！

## GitHub地址：[webview_post_data](https://github.com/lxr17/webview_post_data)