# 第四十五周ARTS总结
## Algorithm
- [N-Queens II](https://leetcode.com/problems/n-queens-ii/)
> 8ms | 9.39% Run time  
> 40.5MB | 8.70% Memory
```java
public int totalNQueens(int n) {
    int[][] source = new int[n][n];

    List<int[][]> ans = fillRest(source, 0);

    return ans.size();
}

/**
 * 填写从index行开始的剩余行
 *
 * @param source 已填写部分
 * @param index  需要填写的行数
 * @return 所有的结果
 */
private List<int[][]> fillRest(int[][] source, int index) {
    List<int[][]> ans = new ArrayList<>();

    for (int i = 0; i < source.length; i++) {
        if (canFill(source, index, i)) {
            int[][] temp = clone(source);
            temp[index][i] = 1;

            if (index == source.length - 1) {
                ans.add(temp);
            } else {
                ans.addAll(fillRest(temp, index + 1));
            }
        }
    }

    return ans;
}

/**
 * 拷贝数组
 *
 * @param source
 * @return
 */
private int[][] clone(int[][] source) {
    int[][] newArray = new int[source.length][source[0].length];

    for (int i = 0; i < source.length; i++) {
        for (int j = 0; j < source[0].length; j++) {
            newArray[i][j] = source[i][j];
        }
    }

    return newArray;
}

/**
 * 判断坐标(x, y)可否填写
 *
 * @param source
 * @param x
 * @param y
 * @return
 */
private boolean canFill(int[][] source, int x, int y) {
    // 先比较纵向
    for (int i = 0; i < x; i++) {
        if (source[i][y] == 1) {
            return false;
        }
    }

    // 再比较斜向
    int k = 1;
    while ((x - k >= 0 && y - k >= 0) || (x - k >= 0 && y + k < source.length)) {
        // 左上角坐标存在
        if (x - k >= 0 && y - k >= 0 && source[x - k][y - k] == 1) {
            return false;
        }

        // 右上角坐标存在
        if (x - k >= 0 && y + k < source.length && source[x - k][y + k] == 1) {
            return false;
        }

        ++k;
    }

    return true;
}
```

## Review
- [Complex UI/Animations on Android](https://proandroiddev.com/complex-ui-animation-on-android-8f7a46f4aec4)

## Tip
+ 一些简单好用的控件 [[1]](https://www.jianshu.com/p/70cfff7449f7)：
    + `AutoCompleteTextView`：自动匹配文本内容 
    + `MutiAutoCompleteTextView`：支持多次自动匹配文本内容
+ 中文技术文档写作规范 [[2]](https://github.com/ruanyf/document-style-guide)：
    + 标题：
        + 注意层级
        + 一级标题下，不能直接出现三级标题
        + 避免出现同级标题只有一个的情况
        + 下级标题不重复上级标题的名字
        + 谨慎使用四级标题
    + 文本：
        + 全角中文字符与半角英文字符之间，应有一个半角空格
          > 例：本文介绍如何快速启动 Windows 系统。
        + 全角中文字符与半角阿拉伯数字之间，有没有半角空格都可，但必须保证风格统一，不能两种风格混杂
          > 例：2011年5月15日，我订购了5台笔记本电脑与10台平板电脑。
        + 英文单位若不翻译，单位前的阿拉伯数字与单位符号之间，应留出适当的空隙
          > 例：一部容量为 16 GB 的智能手机
        + 半角英文字符和半角阿拉伯数字，与全角标点符号之间不留空格
          > 例：他的电脑是 MacBook Air。
        + 避免使用长句子
        + 尽量使用简单句和并列句，避免使用复合句
        + 同样意思的话，尽量用肯定句表达，而不是否定句
        + 避免使用双重否定句
        + 尽量不使用被动语态，改为使用主动语态
        + 不使用非正式语言风格
        + 不使用冷僻、生造、文言文
        + 用对"的"、"地"、"得"
        + 使用代词时，避免歧义
        + 不使用过多的形容词
        + 英文原文如果使用了复数形式，翻译成中文时，应该将其还原为单数形式
        + 外文缩写可以使用半角圆点(.)表示缩写
        + 表示中文时，英文省略号（⋯）应改为中文省略号（……）
        + 英文书名或电影名改用中文表达时，双引号应改为书名号
        + 第一次出现英文词汇时，在括号中给出中文标注。此后再次出现时，直接使用英文缩写即可
        + 专有名词中每个词第一个字母均应大写，非专有名词则不需要大写
    + 段落：
        + 一个段落只有一个主题
        + 段落的中心句放在段首
        + 段落长度不得超过七行
        + 尽量使用陈述肯定句
        + 段落之间使用空行隔开
        + 不需要开头空两格
        + 引用三方内容应标明出处
        + 全篇转载需注明并链接
        + 外部图片需标明来源
    + 数值：
        + 数字用半角
        + 数字较大可使用千分号
        + 货币需注明货币种类
        + 数值范围用`~`来连接，例`132kg~231kg`
        + 数字的增加要使用“增加了”、“增加到”。“了”表示增量，“到”表示定量
    + 标点符号：
        + 中文语句的标点符号一律用全角
        + 如果整句为英文，则用半角标点
        + 标点符号不得出现在行首
        + 省略号使用需恰当，不使用`。。。`
    + 文档体系：
        + 文件结构（见原文）
        + 文件名避免使用全角字符
        + 文件名不使用大写字母
        + 文件名连接符用`-`
+ 通过`echo ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE=\'fg=10\' >> $ZSH_CUSTOM/zsh-autosuggestions_custom.zsh`可以有效的更改**iTerm2**自动提示文字的颜色
+ 可以通过`sudo scutil --set HostName lxr-mbp`来修改终端显示的电脑名称
+ 八皇后问题可以通过递归回溯法来解决
        
## Share
暂无内容