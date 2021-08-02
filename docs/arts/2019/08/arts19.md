# 第十九周ARTS总结
## Algorithm
- [Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)
> 2ms | 28.71% Run time
> 39.2MB | 57.01% Memory
```java
public List<String> generateParenthesis(int n) {
    List<Store> ans = new ArrayList<>();
    List<Store> temp = new ArrayList<>();

    int count = n * 2;

    Store first = new Store();
    first.str = "(";
    first.leftCount = 1;
    first.rightCount = 0;
    ans.add(first);

    for (int i = 1; i < count; i++) {
        temp.clear();
        for (int j = 0; j < ans.size(); j++) {
            Store cur = ans.get(j);

            // 加左括号
            if (cur.leftCount < n) {
                Store left = new Store();
                left.str = cur.str + "(";
                left.leftCount = cur.leftCount + 1;
                left.rightCount = cur.rightCount;
                temp.add(left);
            }

            // 加右括号
            if (cur.leftCount > cur.rightCount) {
                Store right = new Store();
                right.str = cur.str + ")";
                right.leftCount = cur.leftCount;
                right.rightCount = cur.rightCount + 1;
                temp.add(right);
            }
        }

        ans.clear();
        ans.addAll(temp);
    }

    List<String> realAns = new ArrayList<>();
    for (Store store : ans) {
        realAns.add(store.str);
    }

    return realAns;
}

public static class Store {
    private String str;
    private int leftCount;
    private int rightCount;
}
```

## Review
- [Android for Everyone: Part 1 — Android & Accessibility](https://proandroiddev.com/android-for-everyone-part-1-android-accessibility-a0dd9043db76)

## Tip
+ 广播接收器分为静态注册和动态注册，静态注册的接收器能够在APP不启动的情况下接收到广播
  
## Share
暂无内容