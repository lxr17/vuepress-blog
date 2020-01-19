# 第四十周ARTS总结
## Algorithm
- [Permutations II](https://leetcode.com/problems/permutations-ii/)
> 23ms | 15.65% Run time  
> 39.9MB | 58.21% Memory
```java
public List<List<Integer>> permuteUnique(int[] nums) {
    if (nums.length == 0) {
        return new ArrayList<>();
    }

    // 数组元素个数大于等于1的时候
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

    // 最后一个数的全排列
    if (nums.length - index == 1) {

        List<Integer> item = new ArrayList<>();
        item.add(nums[index]);

        ans.add(item);
    } else {
        // 获取index以后所有数的全排列
        List<List<Integer>> temp = recursivePermute(nums, index + 1);

        // 加上当前数（插入到所有排列的所有空隙，注意去重）
        for (List<Integer> list : temp) {
            for (int i = 0; i <= list.size(); i++) {
                List<Integer> item = new ArrayList<>(list);
                item.add(i, nums[index]);
                if (!ans.contains(item)) {
                    ans.add(item);
                }
            }
        }
    }

    return ans;
}
```

## Review
- [GraphQL with Android](https://heartbeat.fritz.ai/graphql-with-android-b44eb3812c3d)

## Tip
+ 关于**MIUI**系统刷机
    + 卡刷需要使用对应的官方版本才行
    + 稳定版的**MIUI**系统需要点击**MIUI图标**十下才能解锁额外功能
    + 完整**root**过程：刷机到开发版→解锁**Bootloder**→开启官方**root**→用**ADB**命令解锁**system**
+ **Python**中的可变对象与不可变对象
    + 可变对象：列表、字典、自定义对象
    + 不可变对象：`int`、`long`、`bool`、`float`、`str`、`tuple`
+ **Python**中`is`与`==`的区别
    + `==`比较的是内容，`is`比较的是内存地址
    + 对于小整数`[-5,256]`区间内的整数，**Python**会创建小整数对象池，这些对象一旦创建，就不会回收，所有新创建的在这个范围的整数都是直接引用他即可。所以造成在`[-5,256]`区间内的整数不同变量只要值相同，引用地址也相同
    + **Python**有个`intern`机制，简单说就是维护一个字典，这个字典维护已经创建字符串(key)和它的字符串对象的地址(value)，每次创建字符串对象都会和这个字典比较，没有就创建，重复了就用指针进行引用就可以了。相当于**Python**对于字符串也是采用了对象池原理
    + 如果字符串（含有空格），不可修改，没开启`intern`机制，不共用对象
    + 以上特点**Pycharm**都作了优化
+ **CPU**的组成 [[1]](https://segmentfault.com/a/1190000021591095)
    + 寄存器
    + 控制器
    + 运算器
    + 时钟
+ **CPU**是一系列寄存器的集合体 [[2]](https://segmentfault.com/a/1190000021591095)
    + 程序计数器(**只有一个**)：用于存储下一条指令所在单元的地址
    + 标志寄存器(**只有一个**)：保存当前运算的值，主要用于判断正、负和零三种状态
    + 累加寄存器(**只有一个**)：存储运行的数据和运算后的数据
    + 指令寄存器(**只有一个**)：存储正在被运行的指令，**CPU**内部使用，程序员无法对该指令进行读写
    + 栈寄存器(**只有一个**)：存储栈区域的起始位置
    + 基址寄存器(**可以多个**)：存储数据内存的起始位置
    + 变址寄存器(**可以多个**)：存储基址寄存器的相对地址
    + 通用寄存器(**可以多个**)：存储任意数据
+ 函数调用机制 [[3]](https://segmentfault.com/a/1190000021591095)：函数的调用和返回很重要的两个指令是`call`和`return`指令，再将函数的入口地址设定到程序计数器之前，`call`指令会把调用函数后要执行的指令地址存储在名为栈的主存内。函数处理完毕后，再通过函数的出口来执行`return`指令。`return`指令的功能是把保存在栈中的地址设定到程序计数器。
+ **CPU**指令执行过程 [[4]](https://segmentfault.com/a/1190000021591095)
    + 取指令
    + 指令译码
    + 执行指令
    + 访问取数
    + 结果写回
    
## Share
暂无内容

<Vssue title="第四十周ARTS总结" />