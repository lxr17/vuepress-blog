# 可达用户投资额的计算

## 有话要说
前阵子遇到了一个计算可达用户投资额的问题，觉得非常有趣，故把它记录下来。

## 问题描述
某产品可被投资，注册后才可以投资，其注册可以被邀请（并不是每个人都是被邀请的）。邀请人可以邀请多个人注册投资，而被邀请人只能有一位邀请人。也就是说邀请人与被邀请人是一对多的关系。

现给定两组数据：邀请与被邀请的关系；所有用户的投资额。

如下：
```
1,2
1,4
2,11
2,10
4,5
5,6
6,8
6,9
6,7
13,14
13,15
13,17
14,20
20,21
15,18
15,19
```
以上数据是处理过后的邀请关系，前者邀请了后者。
```
1,1200.00
2,2300.00
4,1500.00
5,7300.00
6,4100.00
7,1100.00
8,9000.00
9,1000.00
10,1100.00
11,100.00
12,1000.00
13,4500.00
14,1100.00
15,1200.00
17,700.00
18,100.00
19,200.00
20,100.00
21,0.00
```
以上数据是处理过后的所有用户投资额。

现在根据这两组数据需要计算每位用户的“用户投资金额”，“可达用户投资金额”，“邀请用户阶数”，“成功邀请用户数”，“一阶推荐用户投资金额”。

>***用户投资金额***：即该用户的投资额，以以上数据举个例子来说：`2`的投资金额为`2300`

>***可达用户投资金额***：即该用户的投资额加上该用户邀请的所有人的投资额（包括该用户邀请人所邀请的人），假设`A`邀请了`B`和`C`，`B`邀请了`D`和`E`，`C`、`D`、`E`没有邀请别人，那么`A`的 ***可达用户投资金额*** 就是`A`、`B`、`C`、`D`、`E`投资额的总数

>***邀请用户阶数***：即该用户所邀请人的总数（不包括该用户邀请人所邀请的人），假设`A`邀请了`B`和`C`，`B`邀请了`D`和`E`，`C`、`D`、`E`没有邀请别人，那么`A`的 ***邀请用户阶数*** 为`2`

>***成功邀请用户数***：在邀请用户阶数的基础上除去投资额为零的用户

>***一阶推荐用户投资金额***：即该用户所邀请人的总投资额（不包括该用户邀请人所邀请的人），假设`A`邀请了`B`和`C`，`B`邀请了`D`和`E`，`C`、`D`、`E`没有邀请别人，那么`A`的 ***一阶推荐用户投资金额*** 为`B`、`C`投资额的总数

<span style="font-size: 14pt; color: #fc0d1b; background-color: #ffffff;">大家可以先想想如何处理该数据</span>

## 思路分析
首先根据邀请的关系可以分析出邀请人的关系图可以分解为多棵不相关的树（反证法可证）。

邀请关系如下图所示：
![](https://pic.superbed.cn/item/5da82bdc451253d178ef8749.png)
因此可以先将数据生成若干棵树，然后针对于树进行遍历。

对于每棵树来说，父节点的 ***可达用户投资金额*** 就是子节点的 ***可达用户投资金额*** 之和再加上父节点的投资额，根据这一特性，可以对每棵树从叶子节点网上遍历。

## 代码实现
### 获取所有用户的投资额
直接读取文件，并把用户`id`与用户投资额放在`Map`集合中
```java
// 获取每个人的投资额
public static Map<String, Double> getAmount() {
    Map<String, Double> amounts = new HashMap<String, Double>();

    File file = new File("D:/amount.txt");

    try {
        // 创建输入流，读取txt
        InputStream is = new FileInputStream(file.getAbsolutePath());
        InputStreamReader isr = new InputStreamReader(is, "UTF-8");

        BufferedReader br = new BufferedReader(isr);
        String line = "";
        while ((line = br.readLine()) != null) {
            String[] amount = line.trim().split(",");
            amount[0] = amount[0].trim();
            amounts.put(amount[0], Double.parseDouble(amount[1]));
        }

        br.close();
        isr.close();
        is.close();

    } catch (FileNotFoundException e) {
        e.printStackTrace();
    } catch (IOException e) {
        e.printStackTrace();
    }
    return amounts;
}
```

----
### 获取用户的邀请关系
直接读取文件，并把用户的邀请关系放在`List`集合中
```java
// 获取关系数据集合
public static List<String[]> getRelationship() {
    List<String[]> list = new ArrayList<String[]>();

    File file = new File("D:/relationship.txt");

    try {
        // 创建输入流，读取txt
        InputStream is = new FileInputStream(file.getAbsolutePath());
        InputStreamReader isr = new InputStreamReader(is, "UTF-8");

        BufferedReader br = new BufferedReader(isr);
        String line = "";
        while ((line = br.readLine()) != null) {
            String[] relation = line.trim().split(",");
            relation[0] = relation[0].trim();
            relation[1] = relation[1].trim();
            list.add(relation);
        }

        br.close();
        isr.close();
        is.close();

    } catch (FileNotFoundException e) {
        e.printStackTrace();
    } catch (IOException e) {
        e.printStackTrace();
    }
    return list;
}
```

----
### 构造Person对象
```java
// 用户邀请关系(前者邀请了后者)
List<String[]> relationships = new ArrayList<>();
relationships = getRelationship();

// 每个用户投资额
Map<String, Double> amounts = new HashMap<String, Double>();
amounts = getAmount();

// 构造用户信息
Map<String, Person> persons = new HashMap<String, Person>();
Iterator<String> it = amounts.keySet().iterator();
while (it.hasNext()) {
    String key = it.next();

    Person temp = new Person();
    temp.setId(key);
    temp.setAmount(amounts.get(key));

    persons.put(key, temp);
}
```
其中`Person`类为：
```java
class Person {

    /**
     * 用户id
     */
    private String id;

    /**
     * 邀请人列表
     */
    private List<Person> invitedPersons = new ArrayList<Person>();

    /**
     * 投资额
     */
    private double amount;

    /**
     * 所有下线投资额总额（包括自身）
     */
    private double allAmount;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public List<Person> getInvitedPersons() {
        return invitedPersons;
    }

    public void setInvitedPersons(List<Person> invitedPersons) {
        this.invitedPersons = invitedPersons;
    }

    public double getAllAmount() {
        return allAmount;
    }

    public void setAllAmount(double allAmount) {
        this.allAmount = allAmount;
    }

}
```

----
### 构建邀请关系
```java
for (int i = 0; i < relationships.size(); i++) {
    String[] relationship = relationships.get(i);

    // 获取邀请人
    Person person1 = persons.get(relationship[0]);
    // 获取被邀请人
    Person person2 = persons.get(relationship[1]);
    // 加上关联关系
    person1.getInvitedPersons().add(person2);
}
```

根据以上的构造，已经针对于每个用户都生成了一棵树。

但事实上这些树有大量的重合，如果逐一遍历的话会导致不必要的浪费。

于是准备找出所有的根树，遍历根数即可。

----
### 找到所有的根树
```java
// 所有person集合
List<Person> allPerson = new ArrayList<>();
allPerson.addAll(persons.values());

// 找到根节点，去除非根节点
for (int i = 0; i < relationships.size(); i++) {
    String[] relationship = relationships.get(i);

    // 如果是被邀请人，则去除
    persons.remove(relationship[1]);
}
```

根据以上精简，persons集合里只有根节点。

----
### 遍历根数，找出所有人的 ***可达用户投资金额***
```java
Iterator<Person> it4 = persons.values().iterator();
while (it4.hasNext()) {
    Person person = it4.next();
    addAllChildren(person);
}
```

其中`addAllChildren`为

```java
// 可达用户投资金额
public static double addAllChildren(Person person) {
    double childrenAmount = 0;

    // 先加自己的
    childrenAmount += person.getAmount();

    // 再加孩子的
    for (int i = 0; i < person.getInvitedPersons().size(); i++) {
        Person child = person.getInvitedPersons().get(i);

        if (child.getInvitedPersons().size() > 0) {
            childrenAmount += addAllChildren(child);
        } else {
            childrenAmount += child.getAmount();
        }
    }

    person.setAllAmount(childrenAmount);

    return childrenAmount;
}
```

通过此遍历，每个`person`对象的 ***可达用户投资金额*** 均已被算出，又因为`java`是值传递的，所以`allPerson`内的`person`对象的值都已经被计算出来了。

接下来就可以遍历所有的`person`对象了。

----
### 遍历person集合，算出需要的所有数据
```java
try {
    String path = "D:/result.txt";
    File file = new File(path);
    if (!file.exists()) {
        file.getParentFile().mkdirs();
    }
    file.createNewFile();

    // write
    FileWriter fw = new FileWriter(file, true);
    BufferedWriter bw = new BufferedWriter(fw);

    Iterator<Person> it3 = allPerson.iterator();

    while (it3.hasNext()) {
        Person person = it3.next();

        if (person.getAllAmount() == 0) {
            bw.write("可达用户投资总额：" + person.getAmount() + "；");
        } else {
            bw.write("可达用户投资总额：" + person.getAllAmount() + "；");
        }

        bw.write("邀请用户阶数：" + person.getInvitedPersons().size() + "；");

        int count = 0;
        double sum = 0;
        for (Person temp : person.getInvitedPersons()) {
            if (temp.getAmount() != 0) {
                sum += temp.getAmount();
                count++;
            }
        }

        bw.write("成功邀请用户数：" + count + "；");
        bw.write("一阶推荐用户投资金额：" + sum + "；\n");
    }

    bw.flush();
    bw.close();
    fw.close();
} catch (Exception e) {
    e.printStackTrace();
}
```

## 结束语
以上便是我这次遇到问题的解决思路以及解决过程，对于树的构造以及`java`值传递的应用值得学习。

<span style="color: #993300;"><strong><span style="font-size: 14pt;">本题的解决思路以及解决过程比较仓促，只用了一下午的时间，可能会有更好的解决办法，如果大家有什么更好的解决办法欢迎留言~</span></strong></span>

