# 第四十七周ARTS总结
## Algorithm
- [Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)
> 0ms | 100.00% Run time  
> 37.7MB | 5.21% Memory
```java
public List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> ans = new ArrayList<>();

    if (matrix.length == 0) {
        return ans;
    }

    int top = 0;
    int bottom = matrix.length - 1;
    int left = 0;
    int right = matrix[0].length - 1;

    // 一圈圈的输出
    while (top <= bottom && left <= right) {
        // 最后一圈为一行或者一列时
        if (top == bottom) {
            for (int i = left; i <= right; i++) {
                ans.add(matrix[top][i]);
            }
            break;
        }
        if (left == right) {
            for (int i = top; i <= bottom; i++) {
                ans.add(matrix[i][left]);
            }
            break;
        }

        // 上
        for (int i = left; i < right; i++) {
            ans.add(matrix[top][i]);
        }

        // 右
        for (int i = top; i < bottom; i++) {
            ans.add(matrix[i][right]);
        }

        // 下
        for (int i = right; i > left; i--) {
            ans.add(matrix[bottom][i]);
        }

        // 左
        for (int i = bottom; i > top; i--) {
            ans.add(matrix[i][left]);
        }

        top++;
        bottom--;
        left++;
        right--;
    }

    return ans;
}
```

## Review
- [Our Journey from Genymotion to the Android Emulator](https://pspdfkit.com/blog/2019/our-journey-from-genymotion-to-the-android-emulator/)

## Tip
+ 可在`RecyclerView.ViewHolder`里通过`getAdapterPosition()`获取当前被点击条目的索引
+ `RecyclerView.Adapter`中的`getItemViewType`实现时，则`onCreateViewHolder`会被多次调用，因此会创建多个`ViewHolder`，即使`ViewType`相同也会被多次创建
+ `<fragment>`标签中可以用`name`属性指定布局
+ 替换`Fragment`的步骤：
    1. `FragmentManager fragmentManager = getSupportFragmentManager();`
    2. `FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();`
    3. `fragmentTransaction.replace(R.id.fragment_container, new RightFragment());`
    4. `fragmentTransaction.commit();`
+ 通过`fragmentTransaction.addToBackStack(null);`可以将替换的`Fragment`加入到返回栈
+ `Fragment`的生命周期：
    + `onAttach()`：当碎片和活动建立关联时调用
    + `onCreateView()`：当为碎片创建布局时调用
    + `onActivityCreated()`：与碎片相关联的活动创建完毕后调用
    + `onDestroyView()`：当与碎片相关的布局被移除时调用
    + `onDetach()`：当碎片与活动解除关联时调用
    

## Share
暂无内容