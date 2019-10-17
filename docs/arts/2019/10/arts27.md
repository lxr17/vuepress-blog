# 第二十七周ARTS总结
## Algorithm
- [Longest Valid Parentheses](https://leetcode.com/problems/longest-valid-parentheses/)
> 14ms | 7.15% Run time  
> 39.5MB | 5.88% Memory
```java
public int longestValidParentheses(String s) {
    // 记录最长匹配串的长度
    int max = 0;

    Stack<String> stacks = new Stack<>();

    for (int i = 0; i < s.length(); i++) {
        if (stacks.empty() || '(' == s.charAt(i)) {// 如果当前字符是左括号或者栈为空，则入栈
            stacks.push(Character.toString(s.charAt(i)));
        } else if ("(".equals(stacks.peek())) {// 如果栈顶是左括号（此时当前字符一定是右括号）
            stacks.pop();

            // 找到当前最大长度
            int temp = 0;

            // 入栈之前看看栈顶是不是数字
            if (!stacks.empty() && !"(".equals(stacks.peek()) && !")".equals(stacks.peek())) {
                temp = temp + Integer.parseInt(stacks.pop());
            }

            temp += 2;
            if (temp > max) {
                max = temp;
            }

            stacks.push(Integer.toString(temp));
        } else if (")".equals(stacks.peek())) {// 如果栈顶是右括号（此时当前字符一定是右括号）
            stacks.push(")");
        } else {// 此时栈顶是数字

            // 获取栈顶的数字，并出栈
            int temp = Integer.parseInt(stacks.pop());

            // 如果此时栈顶的是左括号
            if (!stacks.empty() && "(".equals(stacks.peek())) {
                stacks.pop();
                temp += 2;

                // 入栈之前看看栈顶是不是数字
                if (!stacks.empty() && !"(".equals(stacks.peek()) && !")".equals(stacks.peek())) {
                    temp = temp + Integer.parseInt(stacks.pop());
                }

                stacks.push(Integer.toString(temp));

                if (temp > max) {
                    max = temp;
                }
            } else {
                stacks.push(Integer.toString(temp));
                stacks.push(")");
            }
        }
    }

    return max;
}
```
----
- [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)
> 0ms | 100.00% Run time  
> 36.5MB | 100.00% Memory
```java
public int search(int[] nums, int target) {
    if (nums.length == 0) {
        return -1;
    }

    int a1 = 0;
    int a2 = nums.length - 1;

    int first = nums[a1];
    int last = nums[a2];

    // nums的首尾一定是相邻的两个数
    if (target < first && target > last) {
        return -1;
    }

    // 此时才是被切割的
    if (first > last) {
        // 找到切割的点,即最小值(时间复杂度为logn)
        while (a2 > a1) {
            int mIndex = (a1 + a2) / 2;
            int temp = nums[mIndex];

            if (temp >= first) {
                a1 = mIndex + 1;
            } else if (temp <= last) {
                a2 = mIndex;
            }
        }
    }

    if (target <= last) {
        a2 = nums.length - 1;
    }

    if (target >= first) {
        a1 = 0;
    }

    int ans = -1;

    // 二分法找到该值(时间复杂度为logn)
    while (a2 >= a1) {
        int mIndex = (a1 + a2) / 2;
        int temp = nums[mIndex];

        if (target > temp) {
            a1 = mIndex + 1;
        } else if (target < temp) {
            a2 = mIndex - 1;
        } else {
            ans = mIndex;
            break;
        }
    }

    return ans;
}
```
----

## Review
- [In-App Updates Android: Tips & Tricks](https://proandroiddev.com/in-app-updates-android-tips-tricks-9d74afef3d4a)  

## Tip
+ 
  
## Share