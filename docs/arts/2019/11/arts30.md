# 第三十周ARTS总结
## Algorithm
- [Valid Sudoku](https://leetcode.com/problems/valid-sudoku/)
> 2ms | 90.46% Run time  
> 42.8MB | 97.10% Memory
```java
public boolean isValidSudoku(char[][] board) {
    // 遍历每一行
    for (int i = 0; i < 9; i++) {
        List<Character> chars = new ArrayList<>();
        for (int j = 0; j < 9; j++) {
            if ('.' == board[i][j]) {
                continue;
            }

            if (!chars.contains(board[i][j])) {
                chars.add(board[i][j]);
            } else {
                return false;
            }
        }
    }

    // 遍历每一列
    for (int i = 0; i < 9; i++) {
        List<Character> chars = new ArrayList<>();
        for (int j = 0; j < 9; j++) {
            if ('.' == board[j][i]) {
                continue;
            }

            if (!chars.contains(board[j][i])) {
                chars.add(board[j][i]);
            } else {
                return false;
            }
        }
    }

    // 遍历每一3*3矩阵
    int x = 0;
    int y = 0;
    while (x <= 6 && y <= 6) {
        if (contain(board, x, y)) {
            return false;
        } else {
            if (y == 6) {
                x = x + 3;
                y = 0;
            } else {
                y = y + 3;
            }
        }
    }

    return true;
}

/**
 * 行从索引x开始，列从索引y开始的一个3*3矩阵是否重复
 *
 * @param board
 * @param x
 * @param y
 * @return
 */
private boolean contain(char[][] board, int x, int y) {
    List<Character> chars = new ArrayList<>();

    for (int i = x; i < x + 3; i++) {
        for (int j = y; j < y + 3; j++) {
            if ('.' == board[i][j]) {
                continue;
            }

            if (!chars.contains(board[i][j])) {
                chars.add(board[i][j]);
            } else {
                return true;
            }
        }
    }

    return false;
}
```

## Review
- [AnimatedIcons: Strikethru](https://blog.stylingandroid.com/animatedicons-strikethru/)  

## Tip
+ mipmap-anydpi-v26的用处：用来适配APP的启动图标；

## Share
暂无内容