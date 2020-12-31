# 第六十七周ARTS总结
## Algorithm
- []()
> 3ms | 39.99% Run time  
> 39.6MB | 54.66% Memory
```java

```

## Review
- []()

## Tip
+ 最好的判断图片格式的方法：
```java
String filePath = file.getPath();
BitmapFactory.Options options = new BitmapFactory.Options();
options.inJustDecodeBounds = true;
BitmapFactory.decodeFile(filePath, options);

String mimeType = options.outMimeType;
LogUtils.d(TAG, "图片类型1：" + mimeType);
```

## Share
暂无内容