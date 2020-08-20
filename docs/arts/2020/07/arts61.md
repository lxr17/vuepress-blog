# 第六十一周ARTS总结
## Algorithm
- [Word Search](https://leetcode.com/problems/word-search/)
> 21ms | 17.76% Run time  
> 54.7MB | 6.83% Memory
```java
public boolean exist2(char[][] board, String word) {
    if (word.length() == 0) {
        return true;
    }

    if (board.length == 0) {
        return false;
    }

    // 用于判断路径是否重复的二维数组（默认每个元素都是0）
    int[][] pathFill;

    // 第一个坐标
    List<Node> firstNodeList = new ArrayList<>();

    // 找到所有的第一个坐标
    for (int i = 0; i < board.length; i++) {
        for (int j = 0; j < board[0].length; j++) {
            if (board[i][j] == word.charAt(0)) {
                Node node = new Node(i, j);
                firstNodeList.add(node);
            }
        }
    }

    // 当word长度只有1的情况下
    if (word.length() == 1 && firstNodeList.size() > 0) {
        return true;
    }

    for (Node firstNode : firstNodeList) {
        pathFill = new int[board.length][board[0].length];
        pathFill[firstNode.x][firstNode.y] = 1;

        int index = 1;
        Node curNode = firstNode;

        while (index < word.length()) {
            if (curNode.children.size() == 0) {
                // 找到所有的第index节点
                // 上
                if (curNode.x > 0 && word.charAt(index) == board[curNode.x - 1][curNode.y]
                        && pathFill[curNode.x - 1][curNode.y] == 0) {
                    Node curr = new Node(curNode.x - 1, curNode.y);
                    curr.parent = curNode;

                    curNode.children.add(curr);
                }

                // 下
                if (curNode.x < board.length - 1 && word.charAt(index) == board[curNode.x + 1][curNode.y]
                        && pathFill[curNode.x + 1][curNode.y] == 0) {
                    Node curr = new Node(curNode.x + 1, curNode.y);
                    curr.parent = curNode;

                    curNode.children.add(curr);
                }

                // 左
                if (curNode.y > 0 && word.charAt(index) == board[curNode.x][curNode.y - 1]
                        && pathFill[curNode.x][curNode.y - 1] == 0) {
                    Node curr = new Node(curNode.x, curNode.y - 1);
                    curr.parent = curNode;

                    curNode.children.add(curr);
                }

                // 右
                if (curNode.y < board[0].length - 1 && word.charAt(index) == board[curNode.x][curNode.y + 1]
                        && pathFill[curNode.x][curNode.y + 1] == 0) {
                    Node curr = new Node(curNode.x, curNode.y + 1);
                    curr.parent = curNode;

                    curNode.children.add(curr);
                }
            }

            // 找到了符合条件的一个路径
            if (curNode.children.size() > 0 && index == word.length() - 1) {
                return true;
            }

            // 如果index节点没有找到或者已经遍历完了
            if (curNode.children.size() == 0 || curNode.curIndex == curNode.children.size()) {
                if (curNode.parent == null) {
                    break;
                } else {
                    pathFill[curNode.x][curNode.y] = 0;

                    index--;
                    curNode = curNode.parent;
                    curNode.curIndex++;
                }
            } else {
                // 如果index节点存在且没有遍历完
                curNode = curNode.children.get(curNode.curIndex);
                index++;

                pathFill[curNode.x][curNode.y] = 1;
            }
        }
    }

    return false;
}

/**
 * 路径坐标（类似于双向链表）
 */
class Node {
    // 该点坐标
    int x;
    int y;

    // 父节点
    Node parent;

    // 下一个点的坐标（由于有多种可能性，故用集合）
    List<Node> children = new ArrayList<>();

    // 当前遍历到的孩子索引
    int curIndex = 0;

    public Node(int x, int y) {
        this.x = x;
        this.y = y;
    }
}
```
----

- [Remove Duplicates from Sorted Array II](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/)
> 0ms | 100.00% Run time  
> 39.8MB | 55.66% Memory
```java
public int removeDuplicates(int[] nums) {
    if (nums.length == 0) {
        return 0;
    }

    // 需要返回的长度
    int size = 1;

    // 当前数字重复次数
    int repeat = 1;

    for (int i = 1; i < nums.length; i++) {
        if (nums[i] == nums[size - 1]) {
            if (repeat < 2) {
                nums[size] = nums[i];
                size++;
            }

            repeat++;
        } else {
            nums[size] = nums[i];
            size++;

            repeat = 1;
        }
    }

    return size;
}
```

## Review
- [20 Books Java Developers Should Read in 2020](https://medium.com/javarevisited/10-books-java-developers-should-read-in-2020-e6222f25cc72)

## Tip
+ `TextView`绘制相关：
    + `baseline`：基准点，字符在`TextView`中的基准点，字符的绘制就是通过这个基准点来绘制的，相当于字符的零点，**top**，**bottom**，**ascent**，**descent**的值就是以这个为零点来得到的，在**baseline**上面的**top**和**ascent**是负数，在**baseline**下面的**bottom**和**descent**是正数
    + `top`：指的是最高字符到**baseline**的值，即**ascent**的最大值（绝对值最大），为负数
    + `ascent`：是**baseline**之上至字符最高处的距离，为负数
    + `bottom`：是指最低字符到**baseline**的值，即**descent**的最大值（绝对值最大），为正数
    + `descent`：是**baseline**之下至字符最低处的距离，为正数
+ 可通过`getPaint().getFontMetricsInt()`来获取`TextView`的基准值等信息
+ 同一个布局内`<include>`了两个相同的**layout**怎么分别获取**layout**下的子控件：
    1. 通过`<include>`标签的**id**分别获取两个父**View**
    2. 通过父**View**的`findViewById()`获取相应的子控件
+ `tools:replace`是用来解决清单文件合并过程中的冲突问题的，可通过`,`来分隔，例：`tools:replace="android:theme,android:exported"`
+ 二进制正数负数互转的方法：**先反码，再加一**

## Share
暂无内容