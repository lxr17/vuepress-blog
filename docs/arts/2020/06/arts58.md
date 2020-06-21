# 第五十八周ARTS总结
## Algorithm
- [Edit Distance](https://leetcode.com/problems/edit-distance/)
> 8ms | 11.84% Run time  
> 42.1MB | 5.03% Memory
```java
public int minDistance(String word1, String word2) {
    // 由于利用递归的思路可行，但是时间复杂度以及递归层次较高，故舍弃（但思路保留）
    // 采用空间换时间的方式来实现

    int word1Length = word1.length();
    int word2Length = word2.length();

    // 构造一个 (word2Length + 1) * (word1Length + 1) 的数组
    // 其中的 a[i][j] 表示从 word1[0, j] 子串变化到 word2[0, i] 的最少步骤数
    // 例：
    //         null    h    o    r    s    e
    // null       0    1    2    3    4    5
    //    r       1    1    2    2    3    4
    //    o       2    2    1    2    3    4
    //    s       3    3    2    2    2    3
    int[][] data = new int[word2Length + 1][word1Length + 1];

    // 填充首行，从word1的子串变为null只需要删除word1子串长度个字符即可
    for (int j = 0; j < word1Length + 1; j++) {
        data[0][j] = j;
    }

    // 填充首列，从null变为word2的子串只需要新增word2子串长度个字符即可
    for (int i = 0; i < word2Length + 1; i++) {
        data[i][0] = i;
    }

    // 填充剩余空格
    for (int i = 1; i < word2Length + 1; i++) {
        for (int j = 1; j < word1Length + 1; j++) {
            // 当word1[0, j]子串和word2[0, i]子串的最后一个字符一样，
            // 则从word1[0, j]子串变到word[0, i]子串的步骤数等于从word1[0, j - 1]变到word2[0, i - 1]的步骤数
            if (word1.charAt(j - 1) == word2.charAt(i - 1)) {
                data[i][j] = data[i - 1][j - 1];
            } else {
                // 已知
                // word1[0, j] -> word2[0, i - 1] = a[i - 1][j]
                // word1[0, j - 1] -> word2[0, i - 1] = a[i - 1][j - 1]
                // word1[0, j - 1] -> word2[0, i] = a[i, j - 1]
                // 则word1[0, j] -> word2[0, i]有三种方式：

                // 1. 删除末尾字符：word1[0, j] -> word1[0, j - 1] -> word2[0, i]
                //    a即为步骤数
                int a = 1 + data[i][j - 1];

                // 2. 替换末尾字符，使其与word2[0, i]的末尾字符一致：word1[0, j] -> word1[0, j - 1] -> word2[0, i - 1]
                //    替换之后相当于从word1[0, j - 1]变到word2[0, i - 1]的步骤数
                //    b即为步骤数
                int b = 1 + data[i - 1][j - 1];

                // 3. 新增一个末尾字符，使其与word2[0, i]的末尾字符一致：word1[0, j] -> word1[0, j] -> word2[0, i - 1]
                //    新增之后最后一个字符一样，因此步骤数就相当于从word1[0, j]变到word2[0, i - 1]的步骤数
                //    c即为步骤数
                int c = 1 + data[i - 1][j];

                data[i][j] = Integer.min(a, Integer.min(b, c));
            }
        }
    }

    return data[word2Length][word1Length];
}

/**
 * 计算w1[w1Index:]子串变化到w2[w2Index:]子串所需要的最少步骤数
 * 该方法的时间复杂度比较高，而且递归层次比较高，故理论上可行，但是太慢
 *
 * @param w1
 * @param w2
 * @param w1Index w1子串的开始索引
 * @param w2Index w2子串的开始索引
 * @return
 */
private int minDistance(String w1, String w2, int w1Index, int w2Index) {
    // 此时w1子串为空，则变化为w2子串只需要插入w2子串的长度个字符即可
    if (w1Index == w1.length()) {
        return w2.length() - w2Index;
    }

    // 此时w2子串为空，则从w1子串变化为w2子串只需要删除w1子串的长度个字符即可
    if (w2Index == w2.length()) {
        return w1.length() - w1Index;
    }

    // 此时w1子串和w2子串的最首字符一样，因此可以不操作的缩短这两个子串
    if (w1.charAt(w1Index) == w2.charAt(w2Index)) {
        return minDistance(w1, w2, w1Index + 1, w2Index + 1);
    }

    // 此时w1子串和w2子串的首字符不一样，因此需要对w1子串进行编辑操作，以便尽可能缩短w1子串和w2子串的长度

    // 1. 删除w1子串的首字符，故w1子串缩短了，开始索引变为了w1Index + 1，而删除操作为一个步骤，因此得+1
    //    a即为删除操作后所需的最少步骤数
    int a = minDistance(w1, w2, w1Index + 1, w2Index) + 1;

    // 2. 在w1子串开头插入一个首字符（w2子串的首字符），此时w1子串和w2子串开头字符一致，可同时向右移动一个索引来缩短子串长度
    //    由于w1子串先插入后删除，故开头索引没变，而新增操作为一个步骤，因此得+1
    //    b即为插入操作后所需的最少步骤数
    int b = minDistance(w1, w2, w1Index, w2Index + 1) + 1;

    // 3. 将w1子串开头字符替换为w2子串开头字符，此时w1子串和w2子串开头字符一致，可同时向右移动一个索引来缩短子串长度
    //    而替换本身为一个步骤，故得+1
    //    c即为替换操作后所需的最少步骤数
    int c = minDistance(w1, w2, w1Index + 1, w2Index + 1) + 1;

    return Integer.min(a, Integer.min(b, c));
}
```
----

- [Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)
> 3ms | 18.57% Run time  
> 51.1MB | 5.77% Memory
```java
public void setZeroes(int[][] matrix) {
    if (matrix.length == 0) {
        return;
    }

    int row = matrix.length;
    int column = matrix[0].length;

    boolean willRowChange = false;
    boolean willColumnChange = false;

    // 先遍历首行首列，判断首行首列需不需要变0
    for (int i = 0; i < row; i++) {
        if (matrix[i][0] == 0) {
            willRowChange = true;
            break;
        }
    }
    for (int j = 0; j < column; j++) {
        if (matrix[0][j] == 0) {
            willColumnChange = true;
            break;
        }
    }

    // 遍历每个格子(除了首行首列)，如果该格子为0，则将该格子所在行以及所在列的首个格子变为0
    // 遍历完成后的matrix首行以及首列的值可以确定整个matrix中哪些格子为0
    for (int i = 1; i < row; i++) {
        for (int j = 1; j < column; j++) {
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }

    // 变零(先变非首行首列)
    for (int i = 1; i < row; i++) {
        for (int j = 1; j < column; j++) {
            if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                matrix[i][j] = 0;
            }
        }
    }

    // 变零(再变首行首列)
    if (willRowChange) {
        for (int i = 0; i < row; i++) {
            matrix[i][0] = 0;
        }
    }
    if (willColumnChange) {
        for (int j = 0; j < column; j++) {
            matrix[0][j] = 0;
        }
    }
}
```
----

- [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)
> 0ms | 100.00% Run time  
> 39.2MB | 70.73% Memory
```java
public boolean searchMatrix(int[][] matrix, int target) {
    if (matrix.length == 0 || matrix[0].length == 0) {
        return false;
    }

    int row = matrix.length;
    int column = matrix[0].length;

    // 二分法

    int first = 1;
    int last = row * column;

    int[] firstIndex = calculatorIndex(first, column);
    int[] lastIndex = calculatorIndex(last, column);

    // 运气好的情况
    if (target == matrix[firstIndex[0]][firstIndex[1]]
            || target == matrix[lastIndex[0]][lastIndex[1]]) {
        return true;
    }

    while (target > matrix[firstIndex[0]][firstIndex[1]]
            && target < matrix[lastIndex[0]][lastIndex[1]]) {
        // 尽头
        if (last - first <= 1) {
            return false;
        }

        // 中间值
        int[] middleIndex = calculatorIndex((first + last) / 2, column);

        if (target == matrix[middleIndex[0]][middleIndex[1]]) {
            return true;
        } else if (target > matrix[middleIndex[0]][middleIndex[1]]) {
            first = (first + last) / 2;
        } else {
            last = (first + last) / 2;
        }
    }

    return false;
}

/**
 * 计算第num个数字的索引
 *
 * @param num
 * @param column
 * @return
 */
private int[] calculatorIndex(int num, int column) {
    int[] index = new int[2];
    index[0] = (num / column) + (num % column == 0 ? 0 : 1) - 1;
    index[1] = (num % column == 0 ? column : (num % column)) - 1;

    return index;
}
```

## Review
- [D8 Optimization: Assertions](https://jakewharton.com/d8-optimization-assertions/)

## Tip
+ 通过`actionBar.setDisplayHomeAsUpEnabled(true);`可以将`ToolBar`中最左边的按钮显示出来，默认图标为左箭头，并且该按钮的点击事件可以在`onOptionsItemSelected`中实现，其**id**为**android.R.id.home**
+ `DrawerLayout`中的**菜单**必须通过`layout_gravity`指定其出来的方向，否则无效
+ `CoordinatorLayout`是一个加强版`FrameLayout`，他可以监听子控件的所有事件，自动的作出合理的反应
+ `CollapsingToolbarLayout`只能是`AppBarLayout`的直接子布局，而`AppBarLayout`只能是`CoordinatorLayout`的直接子布局
+ `AlarmManager`中一些**type**的意义：
    + **ELAPSED_REALTIME**：定时任务的触发时机从系统开机开始算起，不唤起**CPU**
    + **ELAPSED_REALTIME_WAKEUP**：定时任务的触发时机从系统开机开始算起，唤起**CPU**
    + **RTC**：定时任务的触发时机从**1970.1.1**开始算起，不唤起**CPU**
    + **RTC_WAKEUP**：定时任务的触发时机从**1970.1.1**开始算起，唤起**CPU**
+ **Doze**模式：在**Android6**及以上的系统中，如果该设备未插电源，并且屏幕关闭了一段时间，就会进入**Doze**模式，系统会对**CPU**、网络、**Alarm**等活动进行限制，从而延长电池寿命

## Share
暂无内容