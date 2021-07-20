# 第七十周ARTS总结
## Algorithm
- [Decode Ways](https://leetcode.com/problems/decode-ways/)
> 7ms | 8.08% Run time  
> 39.4MB | 5.87% Memory
```java
public int numDecodings2(String s) {
    char[] chars = s.toCharArray();

    // 字符串开头是0的话，不可解码
    if (chars.length == 0 || chars[0] == '0') {
        return 0;
    }

    // 所有不同的情况（key为走到的索引值，value为走到这儿一共有多少种方法）
    Map<Integer, Integer> ways = new HashMap<>();
    boolean isOver = false;

    while (!isOver) {
        isOver = true;

        if (ways.size() == 0) {
            if (chars.length == 1) {
                ways.put(0, 1);
            } else if (chars.length >= 2) {
                ways.put(0, 1);

                // 前两位
                int preTwo = Integer.parseInt(new String(new char[]{chars[0], chars[1]}));
                if (preTwo <= 26) {
                    ways.put(1, 1);
                }

                isOver = false;
            }
        } else {
            Map<Integer, Integer> newWays = new HashMap<>();
            for (int index : ways.keySet()) {
                int count = ways.get(index);

                if (index == chars.length - 1) {// 该方法已经走到终点(证明该方法可行)
                    newWays.put(index, count + newWays.getOrDefault(index, 0));
                    continue;
                } else if (index == chars.length - 2) {// 该方法走到了终点前一位
                    // 最后一位不是0这种方法才成立
                    if (chars[index + 1] != '0') {
                        newWays.put(index + 1, count + newWays.getOrDefault(index + 1, 0));
                    }
                } else {
                    if (chars[index + 1] != '0') {
                        newWays.put(index + 1, count + newWays.getOrDefault(index + 1, 0));

                        // 后两位
                        int lastTwo = Integer.parseInt(new String(new char[]{chars[index + 1], chars[index + 2]}));
                        if (lastTwo <= 26) {
                            newWays.put(index + 2, count + newWays.getOrDefault(index + 2, 0));
                        }

                        isOver = false;
                    }
                }
            }

            ways.clear();
            ways.putAll(newWays);
        }
    }

    if (ways.size() == 1) {
        return ways.get(chars.length - 1);
    }

    return 0;
}
```

- [Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/)
> 0ms | 100.00% Run time  
> 36.6MB | 65.91% Memory
```java
public ListNode reverseBetween(ListNode head, int left, int right) {
    if (left == right) {
        return head;
    }

    int curIndex = 0;// 当前节点索引
    ListNode curNode = head; // 当前节点
    ListNode preNode = null; // 反转的前一个节点
    ListNode ans = head;

    // 1 2 3 4 5
    // 1 3 2 4 5
    // 1 4 3 2 5
    while (curNode.next != null) {
        if (curIndex < left - 1) { // 找到反转节点的前一个节点
            if (curIndex + 1 == left - 1) {
                preNode = curNode;
            }

            curNode = curNode.next;
            curIndex++;
        } else if (curIndex >= left - 1 && curIndex < right - 1) {
            // 反转
            ListNode next = curNode.next;
            curNode.next = next.next;

            if (preNode == null) {
                next.next = ans;
                ans = next;
            } else {
                next.next = preNode.next;
                preNode.next = next;
            }

            curIndex++;
        } else {
            break;
        }
    }

    return ans;
}

public static class ListNode {
    int val;
    ListNode next;

    ListNode() {
    }

    ListNode(int val) {
        this.val = val;
    }

    ListNode(int val, ListNode next) {
        this.val = val;
        this.next = next;
    }
}
```

## Review
- [Android 12 review for developers](https://proandroiddev.com/review-of-android-12-for-developers-ea3ce9247e0)

## Tip
+ 获取`ViewModel`的方法：
    1. `viewModel = ViewModelProviders.of(this).get(MainViewModel::class.java)`
    2. `viewModel = ViewModelProvider(this, ViewModelProvider.NewInstanceFactory()).get(MainViewModel::class.java)`
    3. `private val mainViewModel by viewModels<MainViewModel>()`
+ **kotlin**集合函数：
    + distinct
    + joinToString
    + reduce
    + all
    + find
    + chunked
    + copyInto
    + toIntArray
    + associateBy
    + union
    + intersect
    + retainAll
    + removeAll
    + filter
    + zip
    + unzip
    + partition
    + reversed
    + groupBy
    + sorted
+ 垃圾回收
    1. 判断哪些垃圾需要回收
        + 引用计数算法
        + 可达性分析算法
    2. 垃圾回收算法
        + 标记-清除法
        + 标记-整理法
        + 标记-复制法
+ `MeasureSpec`的三种模式（**MeasureSpec**是由父**View**的**MeasureSpec**和子**View**的**LayoutParams**简单计算出的针对子**View**的测量要求）
    1. **UPSPECIFIED**：父容器对于子容器没有任何限制，子容器想要多大就多大
    2. **EXACTLY**：父容器已经为子容器设置了尺寸，子容器应当服从这些边界，不论子容器想要多大的空间
    3. **AT_MOST**：子容器可以是声明大小内的任意大小
+ `setMeasuredDimension()`可以简单理解就是给`mMeasuredWidth`和`mMeasuredHeight`设值
+ **View**绘制流程
    1. `onMeasure`：确定了`mMeasuredWidth`和`mMeasuredHeight`
    2. `onLayout`：确定了`mLeft`、`mTop`、`mRight`和`mBottom`
    3. `draw`
        1. `drawBackground`：绘制背景
        2. 可跳过   
        3. `onDraw`：绘制内容
        4. `dispatchDraw`：对子**View**进行绘制
        5. 可跳过   
        6. `onDrawForeground`：绘制前景和滚动条
        7. `drawDefaultFocusHighlight`：绘制默认的焦点突出显示

## Share
暂无内容