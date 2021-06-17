# 第六十八周ARTS总结
## Algorithm
- [Gray Code](https://leetcode.com/problems/gray-code/)
> 30ms | 17.98% Run time  
> 62.8MB | 5.47% Memory
```java
public List<Integer> grayCode(int n){
        // 最终结果
        List<Integer> ans=new ArrayList<>();

        // 缓存
        Map<Integer, Object> cache=new HashMap<>();
        Object placeHolder=new Object();

        // 是否继续寻找
        boolean canContinue=true;

        ans.add(0);
        cache.put(0,placeHolder);

        // 不停的找下一个数
        while(canContinue){
        canContinue=false;
        int last=ans.get(ans.size()-1);

        // 更改其中的一位，并判断在前面的序列是否存在这个数，不存在继续找
        for(int offset=0;offset<n; offset++){
        int temp=last^(1<<offset);
        if(cache.get(temp)==null){
        ans.add(temp);
        cache.put(temp,placeHolder);
        canContinue=true;
        break;
        }
        }
        }

        return ans;
        }
```

## Review
- [Navigating in Jetpack Compose](https://medium.com/google-developer-experts/navigating-in-jetpack-compose-78c78d365c6a)

## Tip
+ 跨`module`跳转的三种方式
    1. 隐式跳转（不好维护）
    2. 利用反射（混淆可能会出问题）
    3. 利用**Aroute**（原理采用**HashMap**来存放**path**与**class**对象的映射）
+ 可通过给`EditText`添加`setOnEditorActionListener`方法来实现**搜索**按钮的点击功能
+ `android:configChanges="orientation|screenSize"`和`onConfigurationChanged`共同使用可以避免配置改变时**Activity**的重建
+ 可使用`git update-index --skip-worktree`或者`git update-index --assume-unchanged`来忽略本地文件的改变，避免提交
+ 可以在`buildTypes`新增一种**build类型**；可在`productFlavors`内配置一种新的变种；可在`flavorDimensions`新增一种维度
+ 清单文件的优先级：依赖库中的清单文件(**low**) -> 应用模块主清单(**medium**) -> 构建变体的清单文件(**medium**) -> **gradle**配置的属性(**high**)
+ 如需生成**fullDebug**版本，构建系统会合并`src/fullDebug/`(构建变体)，`src/debug/`(构建类型)，`src/full/`(产品变种)，`src/main/`(主源码)下的代码

## Share
暂无内容