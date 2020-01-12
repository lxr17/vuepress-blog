# 第三十九周ARTS总结
## Algorithm
- [Permutations](https://leetcode.com/problems/permutations/)
> 1ms | 92.85% Run time  
> 37.4MB | 95.74% Memory
```java
public List<List<Integer>> permute(int[] nums) {
    if (nums.length == 0) {
        return new ArrayList<>();
    }

    // 数组只有一个元素的时候
    if (nums.length == 1) {
        List<List<Integer>> ans = new ArrayList<>();
        List<Integer> item = new ArrayList<>();
        item.add(nums[0]);

        ans.add(item);
        return ans;
    }

    // 数组元素个数大于等于2的时候
    return recursivePermute(nums, 0);
}

/**
 * 获取从index开始后边所有数的全排列
 *
 * @param nums  给定数组
 * @param index 开始索引
 * @return
 */
public List<List<Integer>> recursivePermute(int[] nums, int index) {
    List<List<Integer>> ans = new ArrayList<>();

    // 最后两个数的全排列
    if (nums.length - index == 2) {
        List<Integer> item1 = new ArrayList<>();
        item1.add(nums[index]);
        item1.add(nums[index + 1]);

        List<Integer> item2 = new ArrayList<>();
        item2.add(nums[index + 1]);
        item2.add(nums[index]);

        ans.add(item1);
        ans.add(item2);
    } else {
        // 获取index以后所有数的全排列
        List<List<Integer>> temp = recursivePermute(nums, index + 1);

        // 加上当前数（插入到所有排列的所有空隙）
        for (List<Integer> list : temp) {
            for (int i = 0; i <= list.size(); i++) {
                List<Integer> item = new ArrayList<>(list);
                item.add(i, nums[index]);
                ans.add(item);
            }
        }
    }

    return ans;
}
```

## Review
- [The Magical Science of Wi-Fi on Airplanes](https://onezero.medium.com/what-makes-it-possible-to-browse-the-internet-at-35-000-feet-1afaea83eb5)

## Tip
+ **APEX**包 [[1]](https://mp.weixin.qq.com/s/U6YYuj5kdk_XtQIhqWxYCg)
    + **apex_manifest.json**：这个是`apex`包的清单文件，类似`apk`中的`AndroidManifest.xml`。`apex_manifest.json`功能比`AndroidManifest.xml`要复杂，里边还包含该`apex`安装前和安装后要执行的命令；
    + **apex_pubkey**：`apex`包的签名信息。和`apk`一样，我们对`apex`包也需要校验；
    + 其他实际内容：`so`，可执行程序，系统级`jar`包等。
+ 音视频基础知识 [[2]](https://juejin.im/post/5e12fe306fb9a0481467d399?utm_source=gold_browser_extension)
    + 视频流播放过程：**解协议**→**解封装**→**解编码**
        + **协议**：指流媒体协议，有`HTTP`、`RTSP`、`RTMP`等
        + **视频封装**：指的是我们常见的`MP4`、`AVI`、`RMVB`、`MKV`、`TS`、`FLV`等常见后缀格式，它们所表示的就是多媒体的封装协议，就是在传输过程中把音频和视频打包都一起的封装
        + **音频编码**：指音频数据的编码方式，有`MP3`、`PCM`、`WAV`、`AAC`等
        + **视频编码**：指画面图像的编码压缩方式，有`H263`、`H264`、`MPEG-2`、`MPEG-4`等
+ **Docker**常用命令 [[3]](https://docker-curriculum.com/)：
    + `docker run hello-world`：装载镜像，运行容器，并退出
    + `docker pull busybox`：拉取一个镜像
    + `docker images`：列出所有的镜像
    + `docker run busybox echo "hello from busybox"`：向指定镜像中运行一段指定命令
    + `docker ps -a`：显示所有的容器
    + `docker run -it busybox`：运行一个容器，并保持**tty**连接
    + `docker run -d -P --name static-site prakhar1989/static-site`：启动容器，分离终端，自定义名称，发布所有暴露端口
    + `docker stop static-site`：暂停指定容器
    + `docker rm 指定容器ID`：删除指定容器
    + `docker rm $(docker ps -a -q -f status=exited)`：删除所有容器
    + `docker container prune`：删除所有容器
    + `docker rmi`：删除指定镜像
    
+ **Docker**术语 [[4]](https://docker-curriculum.com/)：
    + **Images**：镜像
    + **Containers**：容器
    + **Docker Daemon**：在主机上运行的后台服务，用于管理建立、运行和分发**Docker**容器
    + **Docker Client**：命令行工具，允许用户与守护进程交互
    + **Docker Hub**：所有可用的**Docker**映像的目录
+ 终端设置代理的方式
    ```bash
    export http_proxy='http://localhost:1087'
    export https_proxy='http://localhost:1087'
    ```

## Share
暂无内容

<Vssue title="第三十九周ARTS总结" />