# 第三十二周ARTS总结
## Algorithm
- [Count and Say](https://leetcode.com/problems/count-and-say/)
> 1ms | 99.69% Run time  
> 34.1MB | 100.00% Memory
```java
public String countAndSay(int n) {
    if (n > 1) {
        // 获取n-1返回的值
        String lastAns = countAndSay(n - 1);

        StringBuilder ans = new StringBuilder();

        // 初始化两个局部变量
        char num = lastAns.charAt(0);
        int count = 0;

        // 遍历字符串，得到需要的字符串
        for (int i = 0; i < lastAns.length(); i++) {
            if (lastAns.charAt(i) != num) {
                if (count > 0) {
                    ans.append((char) ('0' + count)).append(num);
                }

                num = lastAns.charAt(i);
                count = 1;
            } else {
                num = lastAns.charAt(i);
                count++;
            }

            // 处理结束了的情况
            if (i == lastAns.length() - 1) {
                ans.append((char) ('0' + count)).append(num);
            }
        }

        return ans.toString();
    } else {
        return "1";
    }
}
```
## Review
- [Dependency Inversion on Android Theming](https://jorgecastillo.dev/dependency-inversion-on-android-theming)
  > 注：可通过自定义不同的theme来实现切换主题的功能。所有的样式都得通过`?attr/colorSurface`的形式使用，而不是直接引用具体的色值等。
- [AndroidX: Security library](https://scottyab.com/2019/10/androidx-security-library/)
  > 注：一种基于`AndroidX`的安全库，主要针对于`SharedPreference`和`File`的加密。

## Tip
+ `SnapHelper`：用于辅助`RecyclerView`在滚动结束时将`item`对齐到某个位置。特别是列表横向滑动时，很多时候不会让列表滑到任意位置，而是会有一定的规则限制。
    + LinearSnapHelper
    + PagerSnapHelper
+ `ViewFlipper`：`ViewAnimator`的子类，而`ViewAnimator`又是继承自`FrameLayout`，而`FrameLayout`就是平时基本上只显示一个子视图的布局，由于`FrameLayout`下不好确定子视图的位置，所以很多情况下子视图之前存在相互遮挡，这样就造成了很多时候我们基本上只要求`FrameLayout`显示一个子视图，然后通过某些控制来实现切换。正好，`ViewFlipper`帮我们实现了这个工作，我们需要做的就是，选择恰当的时机调用其恰当的方法即可。
+ 注解：注解使得我们能够以将由编译器来测试和验证的格式，存储有关程序的额外信息。注解可以用来生成描述符文件。甚至是新的类定义，并且有助于减轻编写样板代码的负担。
    + 元注解
        + `@Target`：配置该注解可以用在什么地方
        + `@Retention`：配置该注解在什么级别下被保存
        + `@Documented`：将注解包含在`JavaDoc`中
        + `@Inherited`：允许子类继承父类红的注解
        + `@Repeatable`：允许同一个地方多次使用同一种注解类型（jdk1.8后加入）
    + 注解的使用
        1. 定义注解
        2. 使用注解
        3. 利用反射获取注解信息并做处理
+ `APT`工具：`APT`是`javac`中提供的一种编译时扫描和处理注解的工具，它会对源代码文件进行检查，并找出其中的注解，然后根据用户自定义的注解处理方法进行额外的处理。`APT`工具不仅能解析注解，还能根据注解生成其他的源文件，最终将生成的新的源文件与原来的源文件共同编译`（注意：APT并不能对源文件进行修改操作，只能生成新的文件，例如在已有的类中添加方法）`。
    + `APT`项目构建三部分：
        + 注解处理器库(包含我们的注解处理器)
        + 注解声明库(用于存储声明的注解)
        + 实际使用`APT`的`Android/Java`项目
    + 使用步骤：
        1. 注解处理器的声明
        2. 注册注解处理器
        3. 注解处理器的扫描
        4. 文件生成（利用`JavaPoet`）
+ `Dagger`核心知识点
    + `Inject`：标注目标类的依赖和依赖的构造函数
    + `Component`：它是一个桥梁，一端是目标类，另一端是目标类所依赖类的实例，它也是注入器（`Injector`）负责把目标类所依赖类的实例注入到目标类中，同时它也管理`Module`
    + `Module`和`Provides`：是为解决第三方类库而生的，`Module`是一个简单工厂模式，`Module`可以包含创建类实例的方法，这些方法用`Provides`来标注
    + 总的来说：`Component`相当于注射器，`Module`是注射液，`Inject`是被注射体中的目标
+ `Dagger`的使用：
    + 简单使用
        1. 用`@Inject`标注于构造方法，告诉`Dagger2`可以实例化这个类
        2. 使用注解`@Component`定义`注射器`，其中类名、方法名随意，方法参数为被注射类
        3. 编译项目，自动生成`DaggerComponent`类，类名为`Dagge+我们定义的Component的名字`
        4. 在被注射类中调用`DaggerXXX.create().injectTo(this);`,即`打针`
        5. 在被注射类中直接使用`注射液`
    + 带`@Module`的使用
        1. 用`@Module`标注`Module类`，用`@Provides`标注方法的返回值，即我们需要`@Inject`的类型
        2. 用`@Component(modules = AModule.class)`指定`注射器`的`注射液`
        3. 接下来与`简单使用`的步骤`3~5`一致
    + 通过`Module`传参（主要用于`Module`类的构造方法带参且被使用的情况）
        1. 用`@Module`标注`Module类`，用`@Provides`标注方法的返回值，即我们需要`@Inject`的类型。其中方法的返回值可能与`Module`构造方法的参数有关
        2. 用`@Component(modules = AModule.class)`指定`注射器`的`注射液`
        3. 编译项目，自动生成`DaggerComponent`类，类名为`Dagge+我们定义的Component的名字`
        4. 在被注射类中调用`DaggerXXX.builder().aModule(new AModule("xxx")).build().injectTo(this);`,即`打针`。**注：此时的`Module`需要手动传入**
        5. 在被注射类中直接使用`注射液`
    + 自定义`Builder`（上述使用的`Builder`是`APT`自动生成的，现在来自定义`Builder`）
        1. 与上述的`1~2`步骤一致
        2. 自定义一个接口类，并用`@Component.Builder`标注。其中有两个方法：**返回值为本身的方法+返回值为`XXXComponent`的方法**  
           例：
           ```java
           @Component(modules = AModule.class)
            public interface TestComponent {
            
                void injectTo(MainActivity mainActivity);
            
                @Component.Builder
                interface Builder {
                    Builder aModule(AModule aModule);
            
                    TestComponent build();
                }
            }
            ```
        3. 接下来与上述的`3~5`一致
    + 使用`@BindsInstance`（为了精简`Builder`中`aModule`方法）
        1. 改造`Module`，将构造方法中的参数变为方法的形参
        2. 修改`Component`，将返回值为`Builder`的方法参数作修改
        3. `打针`的时候输入的参数作精简
        **注：目的是为了在`打针`的时候不用手动`new`一个对象，而是直接传入对象所需要的参数值**
    + 使用`dependencies`实现`Component`依赖`Component`
        1. `Module`类正常，不改变
        2. 父注射器要把注入类返回
        3. 子注射器需要依赖父注射器，通过`dependencies`
        4. 子注射器`打针`的时候需要父注射器的实例
    + 使用`@subComponent`实现`Component`依赖`Component`
    + 使用`@Subcomponent.Builder`实现`Component`依赖`Component`
+ `Dagger2`中常见的注解：
    + `@Named`：用于标识不同的初始化路径
    + `@Qualifier`
    + `@Singleton`：作用域单例（与该`DaggerComponent`的生命周期一致）
    + `@Scope`
    + `Provider`：一种工厂模式的容器
    + `Lazy`：懒加载容器，只有调用`get()`的时候才会生成实例，并且实例只有一份

## Share