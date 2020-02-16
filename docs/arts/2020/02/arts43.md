# 第四十三周ARTS总结
## Algorithm
- [Pow(x, n)](https://leetcode.com/problems/powx-n/)
> 0ms | 100.00% Run time  
> 37.1MB | 5.88% Memory
```java
public double myPow(double x, int n) {
    if (x == 0 || x == 1) {
        return x;
    }

    if (n < 0) {
        return pow(1 / x, n);
    } else {
        return pow(x, n);
    }
}

/**
 * 此时n的正负不影响结果
 *
 * @param x
 * @param n
 * @return
 */
private double pow(double x, int n) {
    if (n == 0) {
        return 1;
    }

    // x^n=(x^2)^(n/2)
    return (pow(x * x, n / 2) * (n % 2 == 0 ? 1 : x));
}
```

## Review
- [How to Support Themes in Custom Views for Android Apps](https://infinum.com/the-capsized-eight/how-to-support-themes-in-custom-views-for-android-apps)

## Tip
+ 获取**Class对象**的三种方式 [[1]](https://juejin.im/post/5e37b5dc6fb9a02fd742bf68)：
    + `Class class1 = Apple.class;`
    + ```java
        Apple apple = new Apple;
        Class class2 = apple.getClass();
      ```
    + `Class class3 = Class.forName("XXX");`
+ 反射常见的使用方法 [[2]](https://juejin.im/post/5e37b5dc6fb9a02fd742bf68)：
    + `getDeclaredFields`：获取所有参数，不管何种级别都能获取
    + `getDeclaredField("color")`：获得指定的参数
    + `getFields`：获取所有**public类型**的参数
    + `getField`：获得指定**public类型**的参数
    + `getDeclaredMethods`：获取所有方法，不管何种级别都能获取
    + `getDeclaredMethod("getColor")`：获得指定方法名的方法，不能获取父类中的方法
    + `getMethods`：获取所有**public类型**的方法
    + `getMethod("toString")`：获取指定名称的**public类型**方法
    + `getDeclaredConstuctors`：获取所有的构造方法
    + `getDeclaredConstructor`：获取指定的带某些参数的构造方法
    + `getConstructors`：获取所有**public类型**的构造方法
    + `getConstructor`：获取指定的带某些参数的**public类型**构造方法
    + `newInstance`：通过无参构造方法创建类的实例
    + `newInstance(XXXX)`：通过有参构造方法创建类的实例
    + `getName`：获取类的全定名
    + `getSimpleName`：获取类名
    + `invoke(实例)`：通过反射调用方法
    + `isAccessible`：判断方法是否启用访问安全检查
    + `setAccessible`：设置安全检查开关
+ **Lombok**的使用 [[3]](https://mp.weixin.qq.com/s/iI1Rs1dPOBSfKuSXhQVOcQ)：
    1. **IDE**中安装**Lombok**插件
    2. 导入相关依赖
    3. 代码中使用注解：`@Data`、`@Getter/@Setter`等
+ **Lombok**的缺点 [[4]](https://mp.weixin.qq.com/s/iI1Rs1dPOBSfKuSXhQVOcQ)：
    + 同事需要安装相关插件，否则会报错
    + 代码可读性以及可调试性差
    + 底层原理不了解会有坑
    + 代码侵入性较大，影响升级
    + 影响封装性
+ **Lombok**的好处 [[5]](https://mp.weixin.qq.com/s/Un25nEu6xwIft9nSUU69Cg)：
    + 不需要手写**get()/set()**
    + 更优雅的生成对象：`Course course = Course.builder().id(123l).name("高等数学").score(100).build()`
    + 不需要手写全参/无参/部分参构造方法
    + 不需要手写非空判断
    
## Share
暂无内容