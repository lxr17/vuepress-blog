# 第四十二周ARTS总结
## Algorithm
- [Group Anagrams](https://leetcode.com/problems/group-anagrams/)
> 6ms | 99.49% Run time  
> 45.6MB | 34.50% Memory
```java
public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> map = new HashMap<>();

    for (String str : strs) {
        String sortedStr = sort(str);
        List<String> value = map.get(sortedStr);

        if (value == null) {
            value = new ArrayList<>();
            map.put(sortedStr, value);
        }

        value.add(str);
    }

    return new ArrayList<>(map.values());
}

/**
 * 对字符串按照字符进行排序
 *
 * @param str 原始字符串
 * @return 排序完之后的字符串
 */
private String sort(String str) {
    char[] chars = str.toCharArray();
    Arrays.sort(chars);
    return new String(chars);
}
```

## Review
- [How to Promote an App on the App Store and Google Play](https://medium.com/@Alconost/how-to-promote-app-a78337a6c150)

## Tip
+ 优雅实现保活 [[1]](https://juejin.im/post/5dfaeccbf265da33910a441d?utm_source=gold_browser_extension)：
    + 申请白名单
        1. 配置权限
        ```xml
        <uses-permission android:name="android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS" />
        ```
        2. 判断是否在白名单中
        ```java
        @RequiresApi(api = Build.VERSION_CODES.M)
        private boolean isIgnoringBatteryOptimizations() {
            boolean isIgnoring = false;
            PowerManager powerManager = (PowerManager) getSystemService(Context.POWER_SERVICE);
            if (powerManager != null) {
                isIgnoring = powerManager.isIgnoringBatteryOptimizations(getPackageName());
            }
            return isIgnoring;
        }
        ```
        3. 申请白名单
        ```java
        @RequiresApi(api = Build.VERSION_CODES.M)
        public void requestIgnoreBatteryOptimizations() {
            try {
                Intent intent = new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
                intent.setData(Uri.parse("package:" + getPackageName()));
                startActivity(intent);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        ```
    + 加入厂商后台管理白名单（需针对不同厂商进行适配）
+ 如何优雅的打印一个**Java**对象 [[2]](https://www.cnblogs.com/qing-gee/p/12272601.html)
    + 对象：实现`toString()`方法
    + 数组：使用`Arrays.toString()`
+ 防止二次打包最普遍方式 [[3]](https://mp.weixin.qq.com/s/yLdcOhFvuT9PDORtFqS6Iw)：签名校验
  ```java
    private boolean doNormalSignCheck() {
        String trueSignMD5 = "d0add9987c7c84aeb7198c3ff26ca152";
        String nowSignMD5 = "";
        try {
            // 得到签名的MD5
            PackageInfo packageInfo = getPackageManager().getPackageInfo(
                    getPackageName(),
                    PackageManager.GET_SIGNATURES);
            Signature[] signs = packageInfo.signatures;
            String signBase64 = Base64Util.encodeToString(signs[0].toByteArray());
            nowSignMD5 = MD5Utils.MD5(signBase64);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        return trueSignMD5.equals(nowSignMD5);
    }
  ```
+ 去除签名校验方法 [[4]](https://mp.weixin.qq.com/s/yLdcOhFvuT9PDORtFqS6Iw)：
    1. 替换原先的`Application`
    2. 在`attachBaseContext`里初始化`hook`
    3. 动态代理`IPackageManager`
    4. `hook`替换掉`signatures`的值
    ```java
    public class HookApplication extends Application implements InvocationHandler {
        private static final int GET_SIGNATURES = 64;
        private String appPkgName = BuildConfig.FLAVOR;
        private Object base;
        private byte[][] sign;
    
        private void hook(Context context) {
            try {
                DataInputStream dataInputStream = new DataInputStream(new ByteArrayInputStream(Base64.decode("省略很长的签名 base64", 0)));
                byte[][] bArr = new byte[(dataInputStream.read() & 255)][];
                for (int i = 0; i < bArr.length; i++) {
                    bArr[i] = new byte[dataInputStream.readInt()];
                    dataInputStream.readFully(bArr[i]);
                }
                Class cls = Class.forName("android.app.ActivityThread");
                Object invoke = cls.getDeclaredMethod("currentActivityThread", new Class[0]).invoke(null, new Object[0]);
                Field declaredField = cls.getDeclaredField("sPackageManager");
                declaredField.setAccessible(true);
                Object obj = declaredField.get(invoke);
                Class cls2 = Class.forName("android.content.pm.IPackageManager");
                this.base = obj;
                this.sign = bArr;
                this.appPkgName = context.getPackageName();
                Object newProxyInstance = Proxy.newProxyInstance(cls2.getClassLoader(), new Class[]{cls2}, this);
                declaredField.set(invoke, newProxyInstance);
                PackageManager packageManager = context.getPackageManager();
                Field declaredField2 = packageManager.getClass().getDeclaredField("mPM");
                declaredField2.setAccessible(true);
                declaredField2.set(packageManager, newProxyInstance);
                System.out.println("PmsHook success.");
            } catch (Exception e) {
                System.err.println("PmsHook failed.");
                e.printStackTrace();
            }
        }
    
        /* access modifiers changed from: protected */
        public void attachBaseContext(Context context) {
            hook(context);
            super.attachBaseContext(context);
        }
    
        public Object invoke(Object obj, Method method, Object[] objArr) throws Throwable {
            if ("getPackageInfo".equals(method.getName())) {
                String str = objArr[0];
                if ((objArr[1].intValue() & 64) != 0 && this.appPkgName.equals(str)) {
                    PackageInfo packageInfo = (PackageInfo) method.invoke(this.base, objArr);
                    packageInfo.signatures = new Signature[this.sign.length];
                    for (int i = 0; i < packageInfo.signatures.length; i++) {
                        packageInfo.signatures[i] = new Signature(this.sign[i]);
                    }
                    return packageInfo;
                }
            }
            return method.invoke(this.base, objArr);
        }
    }
    ```
+ 去除签名校验的应对措施 [[5]](https://mp.weixin.qq.com/s/yLdcOhFvuT9PDORtFqS6Iw)：
    + 检查`Application`
    + 在调用`attachBaseContext`之前检测签名
    + 检查`IPackageManager`有没有被动态代理
    + 使用别的**API**获取**Package**信息

## Share
暂无内容

<Vssue title="第四十二周ARTS总结" />