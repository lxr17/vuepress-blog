# 第四十四周ARTS总结
## Algorithm
- [N-Queens](https://leetcode.com/problems/n-queens/)
> 6ms | 37.28% Run time  
> 41MB | 5.41% Memory
```java
public List<List<String>> solveNQueens(int n) {
    List<String> puzzle = new ArrayList<>();

    char[] chs = new char[n];
    Arrays.fill(chs, '.');

    for (int i = 0; i < n; i++) {
        puzzle.add(new String(chs));
    }

    return fillRest(puzzle, 0);
}

/**
 * 根据已填的来继续填写剩下的部分
 *
 * @param puzzle 已填写部分
 * @param index  已填写完成的行数
 * @return
 */
private List<List<String>> fillRest(List<String> puzzle, int index) {
    List<List<String>> ans = new ArrayList<>();

    // 填写第index行
    for (int i = 0; i < puzzle.size(); i++) {
        if (canFill(puzzle, index, i)) {
            List<String> newPuzzle = new ArrayList<>(puzzle);

            char[] chs = new char[puzzle.size()];
            Arrays.fill(chs, '.');
            chs[i] = 'Q';
            newPuzzle.set(index, new String(chs));

            if (index < puzzle.size() - 1) {
                List<List<String>> part = fillRest(newPuzzle, index + 1);
                ans.addAll(part);
            } else {
                ans.add(newPuzzle);
            }
        }
    }

    return ans;
}

/**
 * 判断索引(x, y)是否可放置皇后
 *
 * @param puzzle
 * @param x
 * @param y
 * @return
 */
private boolean canFill(List<String> puzzle, int x, int y) {
    // 先比较纵向
    for (int i = 0; i < x; i++) {
        if ('Q' == puzzle.get(i).charAt(y)) {
            return false;
        }
    }

    // 再比较斜向
    int k = 1;
    while ((x - k >= 0 && y - k >= 0) || (x - k >= 0 && y + k <= puzzle.size() - 1)) {
        // 当左上角坐标存在
        if (x - k >= 0 && y - k >= 0 && 'Q' == puzzle.get(x - k).charAt(y - k)) {
            return false;
        }

        // 当右上角坐标存在
        if (x - k >= 0 && y + k <= puzzle.size() - 1 && 'Q' == puzzle.get(x - k).charAt(y + k)) {
            return false;
        }

        ++k;
    }

    return true;
}
```

## Review
- [Should I use a BaseActivity in my Android apps?](https://fragmentedpodcast.com/episodes/184/)

## Tip
+ `getRawX()`可以获取到**View**的绝对坐标 [[1]](https://juejin.im/post/5e520bd1518825496e784bde?utm_source=gold_browser_extension)
+ `translationX`和`translationY`是**View**左上角相对父容器左上角的偏移量，它们默认值是0 [[2]](https://juejin.im/post/5e520bd1518825496e784bde?utm_source=gold_browser_extension)
+ `TouchSlop`：可通过`ViewConfiguration.get(getContext()).getScaledTouchSlop()`获取，指系统所能识别的滑动最小距离 [[3]](https://juejin.im/post/5e520bd1518825496e784bde?utm_source=gold_browser_extension)
+ `VelocityTracker`：速度追踪，用于追踪手指在滑动过程中的速度，包括水平和竖直方向的速度 [[4]](https://juejin.im/post/5e520bd1518825496e784bde?utm_source=gold_browser_extension)
+ `GestureDetector`：手势检测，用于辅助检测用户的单击、滑动、长按、双击等行为 [[5]](https://juejin.im/post/5e520bd1518825496e784bde?utm_source=gold_browser_extension)
+ **View**滑动的几种方式 [[6]](https://juejin.im/post/5e520bd1518825496e784bde?utm_source=gold_browser_extension)：
    + `scrollTo`/`scollBy`
    + `LayoutParams`
    + 动画
    + `layout()`
    + `offsetLeftAndRight()`与`offsetTopAndBottom()`
    + `Scroller`
    + 延时策略

## Share
暂无内容