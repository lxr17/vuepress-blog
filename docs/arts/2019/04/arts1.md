# 第一周ARTS总结
## Algorithm
- [Two Sum](https://leetcode.com/problems/two-sum/)
> 2ms | 99.85% Run time  
> 38.1MB | 88.71% Memory
```java
public int[] twoSum(int[] nums, int target) {
    // 将int编程long，保存index信息
    long[] longs = new long[nums.length];
    for (int k = 0; k < nums.length; k++) {
        long a = (((long) nums[k]) << 32) + k;
        longs[k] = a;
    }

    // 排序
    Arrays.sort(longs);

    // 找到确定的值，并获取其index
    for (int i = 0; i < longs.length - 1; i++) {
        if ((int) (longs[i] >> 32) + (int) (longs[longs.length - 1] >> 32) >= target) {
            for (int j = i + 1; j < longs.length; j++) {
                if ((int) (longs[i] >> 32) + (int) (longs[j] >> 32) == target) {
                    return new int[]{(int) (longs[i]), (int) (longs[j])};
                }
            }
        }
    }

    return null;
}
```
----

- [Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)
> 2ms | 98.83% Run time  
> 46.8MB | 51.70% Memory
```java
public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    // first position
    int first = l1.val + l2.val;
    // ten position
    int carry = first / 10;

    // every changed node
    ListNode node = new ListNode(first % 10);
    // root node
    ListNode root = node;
    while (l1.next != null || l2.next != null || carry != 0) {

        if (l1.next == null) {
            l1 = new ListNode(0);
        } else {
            l1 = l1.next;
        }

        if (l2.next == null) {
            l2 = new ListNode(0);
        } else {
            l2 = l2.next;
        }

        int temp = l1.val + l2.val + carry;
        carry = temp / 10;

        ListNode child = new ListNode(temp % 10);
        node.next = child;
        node = child;
    }

    return root;
}

static class ListNode {
    int val;
    ListNode next;

    ListNode(int x) {
        val = x;
    }
}
```
----
- [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
> 65ms | 18.94% Run time  
> 39.8MB | 16.26% Memory
```java
public int lengthOfLongestSubstring(String s) {
    int max = 0;
    List<Character> characters = new ArrayList<>();

    if (s == null) {
        return max;
    }

    // change the char[] to Character[]
    for (char ch : s.toCharArray()) {
        characters.add(ch);
    }

    if (s.length() > 0) {
        max = 1;
    }

    for (int i = 0; i < s.length(); i++) {
        // needn't continue
        if (i + max >= s.length()) {
            break;
        }

        // determine if the string contains duplicate characters
        StringBuilder first = new StringBuilder(s.substring(i, i + max));
        Set set = new HashSet(characters.subList(i, i + max));
        if (first.length() > set.size()) {
            continue;
        }

        // grow the first string
        for (int j = i + max; j < s.length(); j++) {
            if (first.indexOf(Character.toString(s.charAt(j))) == -1) {
                first.append(s.charAt(j));
            } else {
                break;
            }
        }

        if (max < first.length()) {
            max = first.length();
        }

    }

    return max;
}
```
## Review
- [When I'm Gone](https://byrslf.co/when-i-m-gone-f1611ceb759f)

## Tip
- 服务器端向apk中写入信息；客户端读取信息。目的在于实现用户绑定，H5导流不会产生割裂感。
- 打包如果选择了V2签名，则不能对apk做修改，否则会安装失败。

## Share
- [一种动态写入apk数据的方法](https://www.cnblogs.com/lanxingren/p/10656647.html)