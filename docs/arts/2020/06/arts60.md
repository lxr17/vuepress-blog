# 第六十周ARTS总结
## Algorithm
- [Subsets](https://leetcode.com/problems/subsets/)
> 2ms | 19.42% Run time  
> 39.9MB | 35.66% Memory
```java
public List<List<Integer>> subsets(int[] nums) {
    // 首先里边的每个条目存的都是nums的索引值(利用索引值的目的是为了方便定位当前条目里的是nums中哪几个数)
    List<List<Integer>> finalAns = new ArrayList<>();

    // 存放个数为i个的子集集合
    List<List<Integer>> ans = new ArrayList<>();

    // 中间变量
    List<List<Integer>> temp = new ArrayList<>();

    // 找到容量为i个的所有子集
    for (int i = 1; i <= nums.length; i++) {
        temp.clear();

        // 找到容量为1的所有子集
        if (i == 1) {
            for (int k = 0; k < nums.length; k++) {
                List<Integer> item = new ArrayList<>();
                item.add(k);
                ans.add(item);
            }

            finalAns.addAll(ans);
        } else {
            // 找到容量大于1的所有子集
            for (int k = 0; k < ans.size(); k++) {
                List<Integer> item = ans.get(k);
                int startIndex = item.get(item.size() - 1) + 1;

                for (int j = startIndex; j < nums.length; j++) {
                    List<Integer> newItem = new ArrayList<>(item);
                    newItem.add(j);

                    temp.add(newItem);
                }
            }

            ans.clear();
            ans.addAll(temp);

            finalAns.addAll(ans);
        }
    }

    List<Integer> itemTemp = new ArrayList<>();

    // 将finalAns里的所有索引值变为真实值
    for (List<Integer> item : finalAns) {
        itemTemp.clear();
        for (int index : item) {
            itemTemp.add(nums[index]);
        }

        item.clear();
        item.addAll(itemTemp);
    }

    // 加入空集
    finalAns.add(new ArrayList<>());

    return finalAns;
}
```

## Review
- []()

## Tip
+ 

## Share
暂无内容