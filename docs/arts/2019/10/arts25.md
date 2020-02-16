# 第二十五周ARTS总结
## Algorithm
- [Substring with Concatenation of All Words](https://leetcode.com/problems/substring-with-concatenation-of-all-words/)
> 298ms | 9.95% Run time  
> 39.1MB | 95.24% Memory
```java
public List<Integer> findSubstring(String s, String[] words) {
    List<Integer> ansList = new ArrayList<>();

    // 给定的words为空(或者s为空)
    if (words == null || words.length == 0 || s == null) {
        return ansList;
    }

    // s的总长度
    int sLength = s.length();

    // 单个word的长度
    int wLength = words[0].length();

    // words的总字符数
    int wsLength = wLength * words.length;

    // 如果s的长度不足words的总长度
    if (sLength < wsLength) {
        return ansList;
    }

    // 遍历所有可能的索引
    for (int i = 0; i <= sLength - wsLength; i++) {
        List<String> wList = new ArrayList<>(Arrays.asList(words));

        int index = i;

        // 判断此索引是否是所需要的
        while (wList.size() > 0) {
            String sub = s.substring(index, index + wLength);
            if (wList.contains(sub)) {
                wList.remove(sub);
                index += wLength;
            } else {
                break;
            }
        }

        if (wList.size() == 0) {
            ansList.add(i);
        }
    }

    return ansList;
}
```

## Review
- [Coil vs Picasso vs Glide: Get Ready… Go!](https://proandroiddev.com/coil-vs-picasso-vs-glide-get-ready-go-774add8cfd40)  
**note:最终结果还是Glide取得优胜，不过Coil身为新生儿还有很大的发展潜力。**

## Tip
+ 将资源文件中的值放入`gradle`文件中：
`manifestPlaceholders = [app_label:"@string/app_name"]`
+ 可在`gradle.properties`中写上`RELEASE_KEY_PASSWORD=xxxx`，然后在`gradle`文件中直接使用即可
+ 多渠道打包(`productFlavors`)
+ 在`signingConfigs`与`release`闭包并列写另一个闭包可以自定义一种`build type`
+ 多`module`全局配置参数的方式：可定义`ext`全局变量
+ 自定义导出的apk名称:
```groovy
applicationVariants.all { variant ->
    variant.outputs.all {
        def apkFileName

        if ("debug" == variant.buildType.name) {
            apkFileName = "米多多_debug.apk"
        } else {
            apkFileName = "米多多_${defaultConfig.versionName}_${releaseTime()}.apk"
        }

        outputFileName = apkFileName
    }
}
```
+ 可自定义一些方法来获取`git`的信息
+ 给自己留一个后门：点多下
  
## Share
暂无内容