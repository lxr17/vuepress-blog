# 第二十八周ARTS总结
## Algorithm
- []()
> 14ms | 7.15% Run time  
> 39.5MB | 5.88% Memory
```java

```

## Review
- [View Binding](https://developer.android.com/topic/libraries/view-binding)
- [View Binding: Internals](https://blog.stylingandroid.com/view-binding-internals/)  
- [Introducing Chucker](https://proandroiddev.com/introducing-chucker-18f13a51b35d)

## Tip
+ Java的一些规范
    + `MyBatis`不要为了多个查询条件而写`1 = 1`
        > 当遇到多个查询条件，使用`where 1=1`可以很方便的解决我们的问题，但是这样很可能会造成非常大的性能损失，因为添加了`where 1=1`的过滤条件之后，数据库系统就无法使用索引等查询优化策略，数据库系统将会被迫对每行数据进行扫描（即全表扫描） 以比较此行是否满足过滤条件，当表中的数据量较大时查询速度会非常慢；此外，还会存在SQL注入的风险。
    + 迭代`entrySet()`获取`Map`的`key`和`value`
        > 当循环中只需要获取`Map`的主键`key`时，迭代`keySet()`是正确的；但是，当需要主键`key`和取值`value`时，迭代`entrySet()`才是更高效的做法，其比先迭代`keySet()`后再去通过`get`取值性能更佳。
    + 使用`Collection.isEmpty()`检测空
        > 使用`Collection.size()`来检测是否为空在逻辑上没有问题，但是使用`Collection.isEmpty()`使得代码更易读，并且可以获得更好的性能；除此之外，任何`Collection.isEmpty()`实现的时间复杂度都是`O(1)`，不需要多次循环遍历，但是某些通过`Collection.size()`方法实现的时间复杂度可能是`O(n)`。
    + 初始化集合时尽量指定其大小
        > 尽量在初始化时指定集合的大小，能有效减少集合的扩容次数，因为集合每次扩容的时间复杂度很可能时`O(n)`，耗费时间和性能。
    + 使用`StringBuilder`拼接字符串
        > 一般的字符串拼接在编译期`Java`会对其进行优化，但是在循环中字符串的拼接`Java`编译期无法执行优化，所以需要使用`StringBuilder`进行替换。
    + 若需频繁调用`Collection.contains`方法则使用`Set`
        > 在`Java`集合类库中，`List`的`contains`方法普遍时间复杂度为`O(n)`，若代码中需要频繁调用`contains`方法查找数据则先将集合`list`转换成`HashSet`实现，将`O(n)`的时间复杂度将为`O(1)`。
    + 使用静态代码块实现赋值静态成员变量
        > 对于集合类型的静态成员变量，应该使用静态代码块赋值，而不是使用集合实现来赋值。
    + 删除未使用的局部变量、方法参数、私有方法、字段和多余的括号
    + 工具类中屏蔽构造函数
        > 工具类是一堆静态字段和函数的集合，其不应该被实例化；但是`Java`为每个没有明确定义构造函数的类添加了一个隐式公有构造函数，为了避免不必要的实例化，应该显式定义私有构造函数来屏蔽这个隐式公有构造函数。
    + 删除多余的异常捕获并跑出
        > 用`catch`语句捕获异常后，若什么也不进行处理，就只是让异常重新抛出，这跟不捕获异常的效果一样，可以删除这块代码或添加别的处理。
    + 字符串转化使用`String.valueOf(value)`代替`"" + value`
        > 把其它对象或类型转化为字符串时，使用`String.valueOf(value)`比`""+value`的效率更高。
    + 避免使用`BigDecimal(double)`
        > `BigDecimal(double)`存在精度损失风险，在精确计算或值比较的场景中可能会导致业务逻辑异常。
    + 返回空数组和集合而非`null`
        > 若程序运行返回`null`，需要调用方强制检测`null`，否则就会抛出空指针异常；返回空数组或空集合，有效地避免了调用方因为未检测`null`而抛出空指针异常的情况，还可以删除调用方检测`null`的语句使代码更简洁。
    + 优先使用常量或确定值调用`equals`方法
        > 对象的`equals`方法容易抛空指针异常，应使用常量或确定有值的对象来调用`equals`方法。
    + 枚举的属性字段必须是私有且不可变
        > 枚举通常被当做常量使用，如果枚举中存在公共属性字段或设置字段方法，那么这些枚举常量的属性很容易被修改；理想情况下，枚举中的属性字段是私有的，并在私有构造函数中赋值，没有对应的`Setter`方法，最好加上`final`修饰符。
    + `String.split(String regex)`部分关键字需要转译
        > 使用字符串`String`的`split`方法时，传入的分隔字符串是正则表达式，则部分关键字（比如`.[]()|`等）需要转义。
## Share