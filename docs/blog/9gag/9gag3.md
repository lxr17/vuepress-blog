# 仿9GAG制作过程（三）

## 有话要说
这次准备讲述后台服务器的搭建以及前台访问到数据的过程。

## 成果
![](https://pic.superbed.cn/item/5da81695451253d178ebde5f.gif)

## 准备
1. 安装了`eclipse`
2. 安装了`Tomcat7`
3. 安装了数据库管理工具：`Navicat`

## 搭建服务器
用`eclipse`直接创建一个`web`工程，并将运行环境设置为`Tomcat7`

接着定义了四个类来实现了一个简单的接口（通过`servlet`的方式），下面来看看这四个类

### NewsBean.java
```java
package com.lanxingren.bean;

import java.util.List;

public class NewsBean {
    
    //段子标识
    private int id;
    
    //段子文本
    private String title;
    
    //段子包含的图片链接
    private List<String> urls;
    
    //段子点赞数
    private int like;
    
    //段子点踩数
    private int unlike;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getUrls() {
        return urls;
    }

    public void setUrls(List<String> urls) {
        this.urls = urls;
    }

    public int getLike() {
        return like;
    }

    public void setLike(int like) {
        this.like = like;
    }

    public int getUnlike() {
        return unlike;
    }

    public void setUnlike(int unlike) {
        this.unlike = unlike;
    }

    @Override
    public String toString() {
        return "NewsBean [id=" + id + ", title=" + title + ", urls=" + urls + ", like=" + like + ", unlike=" + unlike
                + "]";
    }
    
}
```
该类是段子类的一个`bean`类，各个属性代表的意思在代码里已经说清楚了。

----
### DatabaseUtil.java
```java
package com.lanxingren.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DatabaseUtil {
    
    private static String url = "jdbc:mysql://localhost:3306/imitating9gag?serverTimezone=GMT%2B8&useSSL=false";
    private static String user = "root";
    private static String password = "root";
    
    private static Connection conn;
    
    //获取数据库连接
    public static Connection getConnection() {
        
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(url, user, password);
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return conn;
    }
    
    //关闭数据库连接
    public static void close (Connection conn, PreparedStatement ps) {
        try {
            if (ps != null) {
                ps.close();
            }
            if (conn != null) {
                conn.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    //关闭数据库连接
    public static void close (Connection conn, PreparedStatement ps, ResultSet rs) {
        try {
            if (rs != null) {
                rs.close();
            }
            if (ps != null) {
                ps.close();
            }
            if (conn != null) {
                conn.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
```
该类是一个工具类，主要用来创建数据库连接以及关闭数据库连接。

其中，由于`MySQL`更新到了最新的版本，所以设置了`useSSL`为`false`，否则连接会出问题。

而且，最新的`MySQL`其实并不需要通过`Class.forName`来加载驱动了。

----
### NewsDAO.java
```java
package com.lanxingren.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.lanxingren.bean.NewsBean;
import com.lanxingren.util.DatabaseUtil;

public class NewsDAO {
    
    //page是页数，pageSize是每页条数
    public List<NewsBean> queryNewsByPage (int page, int pageSize) {
        List<NewsBean> newsList = new ArrayList<NewsBean>();
        
        Connection conn = DatabaseUtil.getConnection();
        
        String sql = "select * from news order by id desc limit " + (page - 1)*pageSize + ", " + pageSize;
        PreparedStatement pstmt = null;
        
        try {
            pstmt = (PreparedStatement)conn.prepareStatement(sql);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                NewsBean nb = new NewsBean();
                nb.setId(rs.getInt("id"));
                nb.setTitle(rs.getString("title"));
                nb.setLike(rs.getInt("like"));
                nb.setUnlike(rs.getInt("unlike"));
                newsList.add(nb);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        finally {
            DatabaseUtil.close(conn, pstmt);
        }
        
        return newsList;
    }
    
    // 根据段子id获取段子所包含的图片
    public List<String> queryUrlsByNewsId (int newsId) {
        List<String> urls = new ArrayList<String>();
        
        Connection conn = DatabaseUtil.getConnection();
        
        String sql = "select url from news_pics where newsid = " + newsId;
        PreparedStatement pstmt = null;
        try {
            pstmt = conn.prepareStatement(sql);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                urls.add(rs.getString("url"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        finally {
            DatabaseUtil.close(conn, pstmt);
        }
        
        return urls;
    }
    
}
```
该类定义了两个方法，分别为获取段子信息的方法和获取图片的方法。

其中`sql`用了倒序是为了让段子按照时间流的顺序在前台展示。

----
### QueryNewsServlet.java
```java
package com.lanxingren.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.lanxingren.bean.NewsBean;
import com.lanxingren.dao.NewsDAO;

@WebServlet("/QueryNewsServlet")
public class QueryNewsServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    int pageSize = 5;
       
    public QueryNewsServlet() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/json; charset=utf-8");
        PrintWriter out = response.getWriter();
        
        String page = request.getParameter("page");
        List<NewsBean> newsList = new ArrayList<NewsBean>();
        List<NewsBean> realList = new ArrayList<NewsBean>();
        NewsDAO dao = new NewsDAO();
        
        String news = "";
        
        if (page != null) {
            newsList = dao.queryNewsByPage(Integer.parseInt(page), pageSize);
        }
        
        if (newsList != null && newsList.size() > 0) {
            for (NewsBean nb : newsList) {
                List<String> urls = dao.queryUrlsByNewsId(nb.getId());
                if (urls != null && urls.size() > 0) {
                    nb.setUrls(urls);
                    realList.add(nb);
                }
            }
        }
        
        Gson gson = new Gson();
        news = gson.toJson(realList);
        
        out.print(news);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
    
}
```
通过注解的方式来设置`servlet`的地址，并将数据转化成`json`输出。

通过以上的方式，就完成了后台查询段子接口的开发，并且可通过`page`参数来获取第`page`页的信息，接口URL为：`http://localhost:8080/Imitating9GAG/QueryNewsServlet?page=2`

接着，将项目在`Tomcat`下启动后台服务器就正式搭建完成了。

## 前台获取数据并展示
```java
public List<NewsBean> newsBeans = new ArrayList<NewsBean>();// 段子集合
private String baseUrl = "http://192.168.10.14:8080/Imitating9GAG/QueryNewsServlet?page=";
```

```java
new Thread(new Runnable() {
    @Override
    public void run() {
        String url = baseUrl + (currentPage);
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(url)
                .build();
        try {
            Response response = client.newCall(request).execute();
            String json = response.body().string();
            if (json != null) {
                Gson gson = new Gson();
                newsBeans.addAll(0, (List<NewsBean>)gson.fromJson(json, new TypeToken<List<NewsBean>>(){}.getType()));
            }
            Message message = new Message();
            message.what = QUERY_NEWS;
            handler.sendMessage(message);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}).start();
```

由于请求网络是一个耗时操作，因此放进了子线程中。在子线程中请求网络并将返回的数据放入段子集合中。

`Handler`如下：
```java
// 请求网络结束后的更新View
private Handler handler = new Handler() {
    @Override
    public void handleMessage(Message msg) {
        switch (msg.what) {
            case QUERY_NEWS:
                recyclerView.getAdapter().notifyDataSetChanged();
                break;
            case UPDATE_NEWS:
                recyclerView.getAdapter().notifyDataSetChanged();
                swipeRefreshLayout.setRefreshing(false);
                break;
            case LOAD_MORE:
                ((NewsAdapter)recyclerView.getAdapter()).changeStatus(NewsAdapter.UNLOADING);
                currentState = NewsAdapter.UNLOADING;
                break;
        }
    }
};
```

## 结束语
这样，获取数据+后台服务器搭建+前台页面展示的过程整个就已经完整了。

下一篇准备讲述官方自带的`SwipeRefreshLayout`刷新控件。

由于该控件没有上拉加载功能，于是就在`RecyclerView`中实现了上拉加载功能。