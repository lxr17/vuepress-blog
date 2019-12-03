# 一种动态写入apk数据的方法（用于用户关系绑定、添加渠道号等）
## 背景
正在开发的APP需要记录业务员与客户的绑定关系。具体应用场景如下：
![](https://he_jhua.gitee.io/image-hosting/2019/10/21/13-1.png)

由流程图可知，并没有用户填写业务人员信息这一步，因此在用户下载的APP中就已经携带了业务人员的信息。

由于业务人员众多，不可能针对于每一个业务人员单独生成一个安装包，于是就有了动态修改APP安装包的想法。

## 原理
`Android`使用的`apk`包的压缩方式是`zip`，与`zip`有相同的文件结构（`zip`文件结构见`zip`文件格式说明），在`zip`的`EOCD`区域中包含一个`Comment`区域。

如果我们能够正确修改该区域，就可以在不破坏压缩包、不重新打包的前提下快速给`apk`文件写入自己想要的数据。

![](https://he_jhua.gitee.io/image-hosting/2019/10/21/13-2.jpg)

`apk`默认情况下没有`Comment`，所以`Comment length`的`short`两个字节为`0`，我们需要把这个值修改为我们的`Comment`长度，并把`Comment`追加到后面即可。

## 整体过程
![](https://he_jhua.gitee.io/image-hosting/2019/10/21/13-3.png)

## 服务端实现
### 实现下载接口
```java
@RequestMapping(value = "/download", method = RequestMethod.GET)
public void download(@RequestParam String token, HttpServletResponse response) throws Exception {

    // 获取干净的apk文件
    Resource resource = new ClassPathResource("app-release.apk");
    File file = resource.getFile();

    // 拷贝一份新文件（在新文件基础上进行修改）
    File realFile = copy(file.getPath(), file.getParent() + "/" + new Random().nextLong() + ".apk");

    // 写入注释信息
    writeApk(realFile, token);

    // 如果文件名存在，则进行下载
    if (realFile != null && realFile.exists()) {
        // 配置文件下载
        response.setHeader("content-type", "application/octet-stream");
        response.setContentType("application/octet-stream");
        // 下载文件能正常显示中文
        response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(realFile.getName(), "UTF-8"));

        // 实现文件下载
        byte[] buffer = new byte[1024];
        FileInputStream fis = null;
        BufferedInputStream bis = null;
        try {
            fis = new FileInputStream(realFile);
            bis = new BufferedInputStream(fis);
            OutputStream os = response.getOutputStream();
            int i = bis.read(buffer);
            while (i != -1) {
                os.write(buffer, 0, i);
                i = bis.read(buffer);
            }
            System.out.println("Download successfully!");
        } catch (Exception e) {
            System.out.println("Download failed!");
        } finally {
            if (bis != null) {
                try {
                    bis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
```
----
### 拷贝文件
```java
private File copy(String source, String target) {
    Path sourcePath = Paths.get(source);
    Path targetPath = Paths.get(target);

    try {
        return Files.copy(sourcePath, targetPath, StandardCopyOption.REPLACE_EXISTING).toFile();
    } catch (IOException e) {
        e.printStackTrace();
    }
    return null;
}
```

----
### 往apk中写入信息
```java
public static void writeApk(File file, String comment) {
    ZipFile zipFile = null;
    ByteArrayOutputStream outputStream = null;
    RandomAccessFile accessFile = null;
    try {
        zipFile = new ZipFile(file);

        // 如果已有comment，则不进行写入操作（其实可以先擦除再写入）
        String zipComment = zipFile.getComment();
        if (zipComment != null) {
            return;
        }

        byte[] byteComment = comment.getBytes();
        outputStream = new ByteArrayOutputStream();

        // comment内容
        outputStream.write(byteComment);
        // comment长度（方便读取）
        outputStream.write(short2Stream((short) byteComment.length));

        byte[] data = outputStream.toByteArray();

        accessFile = new RandomAccessFile(file, "rw");
        accessFile.seek(file.length() - 2);

        // 重写comment实际长度
        accessFile.write(short2Stream((short) data.length));
        // 写入comment内容
        accessFile.write(data);
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        try {
            if (zipFile != null) {
                zipFile.close();
            }
            if (outputStream != null) {
                outputStream.close();
            }
            if (accessFile != null) {
                accessFile.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```
其中：
```java
private static byte[] short2Stream(short data) {
    ByteBuffer buffer = ByteBuffer.allocate(2);
    buffer.order(ByteOrder.LITTLE_ENDIAN);
    buffer.putShort(data);
    buffer.flip();
    return buffer.array();
}
```

## 客户端实现
### 获取`comment`信息并写入`TextView`
```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    TextView textView = findViewById(R.id.tv_world);

    // 获取包路径（安装包所在路径）
    String path = getPackageCodePath();
    // 获取业务员信息
    String content = readApk(path);

    textView.setText(content);
}
```

----
### 读取`comment`信息
```java
public String readApk(String path) {
    byte[] bytes = null;
    try {
        File file = new File(path);
        RandomAccessFile accessFile = new RandomAccessFile(file, "r");
        long index = accessFile.length();

        // 文件最后两个字节代表了comment的长度
        bytes = new byte[2];
        index = index - bytes.length;
        accessFile.seek(index);
        accessFile.readFully(bytes);

        int contentLength = bytes2Short(bytes, 0);

        // 获取comment信息
        bytes = new byte[contentLength];
        index = index - bytes.length;
        accessFile.seek(index);
        accessFile.readFully(bytes);

        return new String(bytes, "utf-8");
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    } catch (IOException e) {
        e.printStackTrace();
    }
    return null;
}
```
其中：
```java
private static short bytes2Short(byte[] bytes, int offset) {
    ByteBuffer buffer = ByteBuffer.allocate(2);
    buffer.order(ByteOrder.LITTLE_ENDIAN);
    buffer.put(bytes[offset]);
    buffer.put(bytes[offset + 1]);
    return buffer.getShort(0);
}
```

## 遇到的问题
### 修改完`comment`之后无法安装成功
最开始遇到的就是无法安装的问题，一开始以为是下载接口写的有问题，经过多次调试之后发现是修改完`comment`之后`apk`就无法安装了。

查询[谷歌官方文档](https://developer.android.com/about/versions/nougat/android-7.0.html#apk_signature_v2)可知
![](https://he_jhua.gitee.io/image-hosting/2019/10/21/13-4.jpg)

因此，只需要打包的时候签名方式只选择V1不选择V2就行。

----
### 多人同时下载抢占文件导致的线程安全问题
这个问题暂时的考虑方案是每当有下载请求就会先复制一份，将复制的文件进行修改，客户端下载成功再删除。

但是未做测试，不知是否会产生问题。

## 思考
+ 服务端和客户端不一样，服务端的任何请求都需要考虑线程同步问题；
+ 既然客户端可以获取到安装包，则其实也可以通过修改包名来进行业务人员信息的传递；
+ 利用该方法可以传递其他数据用来实现其他一些功能，不局限于业务人员的信息。

<Vssue title="一种动态写入apk数据的方法（用于用户关系绑定、添加渠道号等）" /> 