# 仿9GAG制作过程（五）

## 有话要说
在做完了数据展示功能之后，就想着完善整个APP。发现现在后台非常的混乱，有好多点都不具备，比方说：图片应该有略缩图和原图，段子、评论、点赞应该联动起来，段子应该有创建时间等。

于是就重新设计了数据库，重新爬取了数据，重新设计了后台接口。

这次主要讲这次重构的主要内容。

## 数据库设计
![](https://pic.superbed.cn/item/5da82153451253d178ed0647.png)
一共设计了六张表，分别为：
1. **段子表**，主要存放每一个段子的图片等信息
2. **评论表**，主要存放评论信息，评论可以上传图片
3. **用户表**
4. **标签表**，每条段子发表之前会自定义标签，该表存放的就是这些标签
5. **点赞记录表**，因为用户点赞与段子之间是多对多的关系，因此要加一张表用来存放点赞记录
6. **段子标签关联表**，因为段子和标签是多对多的，因此需要多一张表存放关联关系

## 接口设计
![](https://pic.superbed.cn/item/5da82153451253d178ed064d.png)

橙色的为表，咖啡色为接口。

目前设计了十四个接口，上图写明了各接口和相关的表之间的关系。

## 后台结构
![](https://pic.superbed.cn/item/5da82153451253d178ed0650.png)

`bean`包下为基本实体类；  
`implement`包下为消息实体类的子类；  
`dao`包为涉及到数据库的具体实现类；  
`servlet`为接口类；  
`util`为过程中用到的工具类。

## 具体例子
下面以查询段子接口为例，介绍具体的结构。

### bean类
#### 消息实体类
```java
public class MessageEntity {

    // 返回信息描述
    private String reason;
    // 返回码
    private int errorCode;

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public int getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }

}
```

----
#### 段子消息实体类
```java
public class TopicMessageEntity extends MessageEntity {

    // 获取段子的结果
    private List<TopicEntity> result;

    public List<TopicEntity> getResult() {
        return result;
    }

    public void setResult(List<TopicEntity> result) {
        this.result = result;
    }

}
```

----
#### 段子实体类
```java
public class TopicEntity {

    // 段子标识
    private int id;
    // 段子作者
    private String author = "";
    // 段子标题
    private String title = "";
    // 段子点赞数
    private int upvote;
    // 段子评论数
    private int commentCount;
    // 段子略缩图地址
    private String thumbNail = "";
    // 段子原图地址
    private String orgPicture = "";
    // 段子发表时间
    private String postTime = "";
    
    // 点的是赞还是踩,0代表没点，1代表赞，-1代表踩
    private int like = 0;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getUpvote() {
        return upvote;
    }

    public void setUpvote(int upvote) {
        this.upvote = upvote;
    }

    public int getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(int commentCount) {
        this.commentCount = commentCount;
    }

    public String getThumbNail() {
        return thumbNail;
    }

    public void setThumbNail(String thumbNail) {
        this.thumbNail = thumbNail;
    }

    public String getOrgPicture() {
        return orgPicture;
    }

    public void setOrgPicture(String orgPicture) {
        this.orgPicture = orgPicture;
    }

    public String getPostTime() {
        return postTime;
    }

    public void setPostTime(String postTime) {
        this.postTime = postTime;
    }

    public int getLike() {
        return like;
    }

    public void setLike(int like) {
        this.like = like;
    }

}
```

这里和数据库表略有不同，主要是`like`字段。

`like`字段代表的是当前获取数据的人对该段子是否点了赞。

----
### dao层
#### 查询段子方法
```java
public List<TopicEntity> query(int topicId, int count, boolean after) {
        List<TopicEntity> topicList = new ArrayList<TopicEntity>();

        if (topicId <= 0) {
            topicId = 0;
        }

        if (count <= 0) {
            count = 10;
        }

        if (after) {
            queryAfter(topicId, count, topicList);
        } else {
            queryBefore(topicId, count, topicList);
        }

        return topicList;
    }
```

```java
private void queryAfter(int topicId, int count, List<TopicEntity> topicList) {
        String queryAfter = "SELECT * FROM 9gag_topics WHERE id > ? LIMIT ?";

        Connection conn = DatabaseUtil.getConnection();
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            pstmt = conn.prepareStatement(queryAfter);
            pstmt.setInt(1, topicId);
            pstmt.setInt(2, count);
            rs = pstmt.executeQuery();

            while (rs.next()) {
                TopicEntity topicEntity = new TopicEntity();
                topicEntity.setId(rs.getInt("id"));
                topicEntity.setAuthor(rs.getString("author"));
                topicEntity.setTitle(rs.getString("title"));
                topicEntity.setUpvote(rs.getInt("upvote"));
                topicEntity.setCommentCount(rs.getInt("commentcount"));
                topicEntity.setThumbNail(rs.getString("thumbnail"));
                topicEntity.setOrgPicture(rs.getString("orgpicture"));
                topicEntity.setPostTime(rs.getString("posttime"));
                topicList.add(topicEntity);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DatabaseUtil.close(conn, pstmt, rs);
        }
    }
```

```java
private void queryBefore(int topicId, int count, List<TopicEntity> topicList) {
        String queryBefore = "SELECT * FROM 9gag_topics WHERE id < ? ORDER BY id DESC LIMIT ?";

        Connection conn = DatabaseUtil.getConnection();
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            pstmt = conn.prepareStatement(queryBefore);
            pstmt.setInt(1, topicId);
            pstmt.setInt(2, count);
            rs = pstmt.executeQuery();

            while (rs.next()) {
                TopicEntity topicEntity = new TopicEntity();
                topicEntity.setId(rs.getInt("id"));
                topicEntity.setAuthor(rs.getString("author"));
                topicEntity.setTitle(rs.getString("title"));
                topicEntity.setUpvote(rs.getInt("upvote"));
                topicEntity.setCommentCount(rs.getInt("commentcount"));
                topicEntity.setThumbNail(rs.getString("thumbnail"));
                topicEntity.setOrgPicture(rs.getString("orgpicture"));
                topicEntity.setPostTime(rs.getString("posttime"));
                topicList.add(topicEntity);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DatabaseUtil.close(conn, pstmt, rs);
        }

        // 获取完数据之后逆序，因为查找的时候是逆序
        Collections.reverse(topicList);
    }
```

这三个方法实现了查询指定段子前（或者后）count条记录。

----
### servlet层
```java
protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/json; charset=utf-8");
        PrintWriter out = response.getWriter();

        TopicMessageEntity message = new TopicMessageEntity();
        TopicDAO topicDao = new TopicDAO();
        UpvoteDAO upvoteDao = new UpvoteDAO();
        Gson gson = GsonUtil.getGson();

        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");

        int topicId = Integer.parseInt(request.getParameter("topicId"));
        int count = Integer.parseInt(request.getParameter("count"));
        boolean after = Boolean.parseBoolean(request.getParameter("after"));
        String author = request.getParameter("author");

        if (count <= 0) {
            message.setErrorCode(-1);
            message.setReason("count值不能为负数！");
            out.print(gson.toJson(message));
            return;
        }

        try {
            List<TopicEntity> topics = topicDao.query(topicId, count, after);
            
            // 判断作者是否点过赞
            if (author != null) {
                List<UpvoteEntity> upvoteList = upvoteDao.findUpvoteByAuthor(author, true);
                if (upvoteList != null) {
                    for (TopicEntity topic : topics) {
                        for (UpvoteEntity upvote : upvoteList) {
                            if (upvote.getLikedId() == topic.getId()) {
                                int like = upvote.isLiked() ? 1 : -1;
                                topic.setLike(like);
                            }
                        }
                    }                    
                }
            }
            
            Collections.reverse(topics);
            message.setErrorCode(0);
            message.setReason("success");
            message.setResult(topics);
        } catch (Exception e) {
            message.setErrorCode(-1);
            message.setReason(e.getMessage());
        } finally {
            out.print(gson.toJson(message));
        }

    }
```

主要逻辑：查找到需要的段子→遍历段子→如果段子被点过赞或者踩，就把段子相应字段更改为赞或者踩→由于查出来的数据时顺序的，要改为逆序展示。

## 反思
这次主要重构了后台的设计逻辑，其实还有好多不完备的地方。

通过这次重构，明白了一个要点。要做一件事情首先要规划好，首先是设计，把一切的流程，框架设计好之后按部就班的做。这样做出来的东西才会比较好。

否则在过程中会很混乱，严重影响效率。

## 预告
下一章准备讲述点赞的逻辑，因为点赞的逻辑比较复杂。
