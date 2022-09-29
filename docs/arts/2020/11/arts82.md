# 第八十二周ARTS总结
## Algorithm
- [Convert Sorted List to Binary Search Tree](https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/)
> 2ms | 10.50% Run time  
> 44.6MB | 6.39% Memory
```java
public TreeNode sortedListToBST(ListNode head) {
    // 思路：先转成有序集合，再进行转换
    List<Integer> values = new ArrayList<>();
    while (head != null) {
        values.add(head.val);
        head = head.next;
    }

    if (values.size() == 0) {
        return null;
    } else {
        return sortedArrayToBST(values);
    }
}

private TreeNode sortedArrayToBST(List<Integer> nums) {
    // 思路：递归
    return sortedArrayToBST(nums, 0, nums.size() - 1);
}

/**
 * 生成[startIndex, endIndex]的子树
 *
 * @param nums
 * @param startIndex
 * @param endIndex
 * @return
 */
private TreeNode sortedArrayToBST(List<Integer> nums, int startIndex, int endIndex) {
    int middleIndex = (startIndex + endIndex) / 2;

    TreeNode curTree = new TreeNode(nums.get(middleIndex));

    if (startIndex < middleIndex) {
        curTree.left = sortedArrayToBST(nums, startIndex, middleIndex - 1);
    }

    if (endIndex > middleIndex) {
        curTree.right = sortedArrayToBST(nums, middleIndex + 1, endIndex);
    }

    return curTree;
}
```

----
> 0ms | 100.00% Run time  
> 40.1MB | 45.25% Memory
```java
public TreeNode sortedListToBST2(ListNode head) {
    // 思路：关键点在于找到中位数
    // 可以同时用两个指针指向 head ，快指针每次移动两个节点，慢指针每次移动一个节点
    // 当快指针到链表末尾时，慢指针正好处于链表中位数所在地
    if (head == null) {
        return null;
    }

    ListNode fast = head;
    ListNode slow = head;

    while (fast != null) {
        // 快指针每次移动两个节点（注意判空）
        fast = fast.next;
        if (fast != null) {
            fast = fast.next;
        }

        // 确保 fast 比 slow 多移动一次，为了找到 middle 的前一个节点
        if (fast != null && fast.next != null) {
            // 慢指针每次移动一个节点
            slow = slow.next;
        }
    }

    // 用来拆分 ListNode
    ListNode preMiddleNode = slow;
    ListNode middleNode = slow.next;

    if (middleNode != null) {
        TreeNode middle = new TreeNode(middleNode.val);

        preMiddleNode.next = null;
        middle.left = sortedListToBST2(head);
        middle.right = sortedListToBST2(middleNode.next);

        return middle;
    } else {
        // 此时 head 只有一个节点
        return new TreeNode(preMiddleNode.val);
    }
}
```

----
> 3ms | 6.53% Run time  
> 40.1MB | 45.25% Memory
```java
public TreeNode sortedListToBST3(ListNode head) {
    // 思路：利用广度遍历构造树的结构，再利用深度遍历填充树的内容
    if (head == null) {
        return null;
    }

    ListNode cur = head;
    TreeNode root = new TreeNode();

    // 广度遍历构造树的结构
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (cur.next != null) {
        TreeNode treeNode = queue.poll();

        // 左树
        treeNode.left = new TreeNode();
        queue.add(treeNode.left);

        // 右树
        cur = cur.next;
        if (cur.next != null) {
            treeNode.right = new TreeNode();
            queue.add(treeNode.right);

            cur = cur.next;
        }
    }

    // 深度遍历填充数据（中序遍历）
    Stack<TreeNode> stack = new Stack<>();
    stack.push(root);

    // 左树不断入栈
    while (stack.peek().left != null) {
        stack.push(stack.peek().left);
    }

    cur = head;
    while (!stack.empty()) {
        // 出栈
        TreeNode temp = stack.pop();

        // 填充中间
        temp.val = cur.val;
        cur = cur.next;

        if (temp.right != null) {
            stack.push(temp.right);

            // 左树不断入栈
            while (stack.peek().left != null) {
                stack.push(stack.peek().left);
            }
        }
    }

    return root;
}
```

## Review
- []()

## Tip
+ 

## Share
暂无内容