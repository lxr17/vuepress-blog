# 仿9GAG制作过程（二）

## 有话要说
这次准备讲述用`python`爬虫以及将爬来的数据存到`MySQL`数据库的过程，爬的是煎蛋网的无聊图。

## 成果
![](https://he_jhua.gitee.io/image-hosting/2019/10/21/3-1.png)
![](https://he_jhua.gitee.io/image-hosting/2019/10/21/3-2.png)

## 准备
1. 下载了`python3.7`并配置好了环境变量
2. 下载了`PyCharm`作为开发`python`的`IDE`
3. 安装了`MySQL`客户端以及服务端
4. 安装了`Navicat`客户端
5. 通过`pip`命令下载安装`beautifulsoup`，`selenium`以及`pymysql`模块，`pip`命令如下：
```bash
pip install beautifulsoup4
pip install selenium
pip install pymysql
```

## 观察“无聊图”网页源码
先上部分源码：
```html
<li id="comment-3838846">
    <div>
        <div class="row">
            <div class="author"><strong
                    title="防伪码：fc33b015c2b4d50cd1a23007810b09f049f1407d" class="orange-name">猴子</strong> <br>
                <small><a href="#footer" title="@回复"
                          onclick="document.getElementById('comment').value += &#39;@&lt;a href=&quot;//jandan.net/pic/page-185#comment-3838846&quot;&gt;猴子&lt;/a&gt;: &#39;">@4
                    days ago</a></span></small>
            </div>
            <div class="text"><span class="righttext"><a
                    href="//jandan.net/pic/page-185#comment-3838846">3838846</a></span>
                <p>这个盖字是怎么翻译出来的<br/>
                    <img src="//img.jandan.net/img/blank.gif" onload="jandan_load_img(this)"/><span class="img-hash">Ly93dzMuc2luYWltZy5jbi9tdzYwMC8wMDZYTkVZN2d5MWZydm84MHg0Mm1qMzFrdzIzdmF6cS5qcGc=</span>
                </p>
            </div>
            <div class="jandan-vote">
                            <span class="comment-report-c">
                                <a title="投诉" href="javascript:;" class="comment-report" data-id="3838846">[投诉]</a>
                            </span>
                <span class="tucao-like-container">
                            <a title="圈圈/支持" href="javascript:;" class="comment-like like" data-id="3838846"
                               data-type="pos">OO</a> [<span>52</span>]
                            </span>
                <span class="tucao-unlike-container">
                            <a title="叉叉/反对" href="javascript:;" class="comment-unlike unlike" data-id="3838846"
                               data-type="neg">XX</a> [<span>13</span>]

                            <a href="javascript:;" class="tucao-btn" data-id="3838846"> 吐槽 [16] </a>
                            </span>
            </div>
        </div>
    </div>
</li>
```

发现在源码里边图片链接并没有直接显示出来，而是在`js`中加载的。因此，不能用普通的爬虫方式来获取图片链接。

看了许多博客，最终决定采用`Python3`+`BeautifulSoup`+`selenium`的方式来抓取。

`selenium`用来获取网页链接数据，`BeautifulSoup`用来解析获取的网页源码。

`selenium`相当于一个小型浏览器，可以直接获取完整的网页源码，获取之后的网页源码如下所示：
```html
<li id="comment-3838846">
    <div>
        <div class="row">
            <div class="author"><strong title="防伪码：fc33b015c2b4d50cd1a23007810b09f049f1407d"
                                        class="orange-name">猴子</strong> <br>
                <small><a href="#footer" title="@回复"
                          onclick="document.getElementById('comment').value += '@<a href=&quot;//jandan.net/pic/page-185#comment-3838846&quot;>猴子</a>: '">@4
                    days ago</a></small>
            </div>
            <div class="text"><span class="righttext"><a
                    href="//jandan.net/pic/page-185#comment-3838846">3838846</a></span>
                <p>这个盖字是怎么翻译出来的<br>
                    <a href="//ww3.sinaimg.cn/large/006XNEY7gy1frvo80x42mj31kw23vazq.jpg" target="_blank"
                       class="view_img_link">[查看原图]</a><br><img
                            src="http://ww3.sinaimg.cn/mw600/006XNEY7gy1frvo80x42mj31kw23vazq.jpg"
                            style="max-width: 100%; max-height: 450px;"></p>
            </div>
            <div class="jandan-vote">
                            <span class="comment-report-c">
                                <a title="投诉" href="javascript:;" class="comment-report" data-id="3838846">[投诉]</a>
                            </span>
                <span class="tucao-like-container">
                            <a title="圈圈/支持" href="javascript:;" class="comment-like like" data-id="3838846"
                               data-type="pos">OO</a> [<span>52</span>]
                            </span>
                <span class="tucao-unlike-container">
                            <a title="叉叉/反对" href="javascript:;" class="comment-unlike unlike" data-id="3838846"
                               data-type="neg">XX</a> [<span>13</span>]

                            <a href="javascript:;" class="tucao-btn" data-id="3838846"> 吐槽 [16] </a>
                            </span>
            </div>
        </div>
    </div>
</li>
```

注意到，`class="row"`的`div`是我们需要的，并且不包含我们不需要的部分，因此就可以通过`class="row"`来获取需要的数据。

又因为一条段子包含的信息有：一个标题（有些有有些没有），若干张图片，点赞数，点踩数。因此设计数据库表如下。

## 数据库表设计
因为以上的信息，故设计了两张表。  
一张表用来存放段子的基本信息，包括主键、标题、点赞数、点踩数；  
另一张表用来存放段子包含的图片链接，包括主键、图片链接、段子主键。  
用段子主键来相互关联，主要SQL语句如下：
```sql
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '段子标识',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '段子标题',
  `like` int(11) DEFAULT NULL COMMENT '点赞数',
  `unlike` int(11) DEFAULT NULL COMMENT '点踩数',
  PRIMARY KEY (`id`)
) 

CREATE TABLE `news_pics` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '图片标识',
  `url` varchar(255) DEFAULT NULL COMMENT '图片链接',
  `newsid` int(11) NOT NULL COMMENT '段子标识',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=319 DEFAULT CHARSET=utf8;
```

## 主体部分
接着，阅读了[Python爬取煎蛋妹子图](https://www.jianshu.com/p/999957b6b527)以及[python+selenium+PhantomJS爬取网页动态加载内容](https://www.cnblogs.com/chenice/p/6994111.html)之后，实现了利用`python`进行抓取数据解析数据的过程，先上代码：
```groovy
# coding=utf-8
import re
import pymysql
from bs4 import BeautifulSoup
from selenium import webdriver

base_url = "http://jandan.net/pic/page-"
driver = webdriver.PhantomJS()

items = []
urls = ["http://jandan.net/pic/page-{}#comments".format(str(i)) for i in range(50689352, 50689355)]

db = pymysql.connect(host="localhost", user="root", password="root", db="imitating9gag", charset="utf8")
cursor = db.cursor()

sql_news = '''INSERT INTO `imitating9gag`.`news` (`id`, `title`, `like`, `unlike`) VALUES ('%d', '%s', '%d', '%d')'''
sql_pics = '''INSERT INTO `imitating9gag`.`news_pics` (`id`, `url`, `newsid`) VALUES ('%d', '%s', '%d')'''

if __name__ == "__main__":
    for url in urls:
        driver.get(url)
        data = driver.page_source
        soup = BeautifulSoup(data, "html.parser")
        divs = soup.findAll('div', attrs={'class': 'row'})

        # 遍历所有的项
        for div in divs:
            # 'title'代表的是文字，'urls'代表的是图片的集合，'like'代表的是点赞数，'unlike'代表的是踩
            item = {}
            urls = []

            item['like'] = div.find('span', attrs={'class': 'tucao-like-container'}).find('span').string
            item['unlike'] = div.find('span', attrs={'class': 'tucao-unlike-container'}).find('span').string

            paragraph = div.find(attrs={'class': 'text'}).find("p")

            # 获取所有的图片链接
            links = paragraph.select("a.view_img_link")
            for link in links:
                urls.append("http:" + link.get('href'))
            item['urls'] = urls

            # 获取最开始的文字部分
            title = re.search('<p>[\s\S]+?<a', str(paragraph))

            if title is not None and title.group()[3:-8] is not None \
                    and title.group()[3:-8].find('view_img_link') == -1:
                item['title'] = title.group()[3:-8]
            else:
                item['title'] = ""

            items.append(item)

    i = 1
    j = 1
    try:
        for item in items:
            # 插入新闻数据
            cursor.execute(sql_news % (i, item['title'], int(item['like']), int(item['unlike'])))
            # 插入图片数据
            for tempUrl in item['urls']:
                cursor.execute(sql_pics % (j, tempUrl, i))
                j = j+1
            i = i+1
        db.commit()
    except Exception as e:
        print(e)
        print(item)
        db.rollback()
    db.close()
```

## 注意点
+ 在用`pymysql`的时候，如果插入的数据有中文，则在`connect`的时候需要设置`charset`，见**13行**
+ **44行**在获取`title`的时候用了正则表达式，最开始直接用`[.+]`并不会匹配换行符，因此换成了`[\s\S]`，`\s`匹配空白符，`\S`匹配非空白符，因此可以匹配所有的字符
+ 最开始准备使用`MySQLdb`来操作数据库，但是`python3`不支持，于是换成了`pymysql`来操作数据库

至此，后台数据已经获取完成，接下来是后台接口的开发，准备采用`Java`的`Servlet`来实现后台接口的开发。

## 反思
+ 对`python`语法掌握的不足，一些简单的语法需要通过查询才知道怎么用，需要找一个时间完整的学习一边`python`语法
+ 对正则表达式的使用不熟练，以后需要加强对正则表达式使用的练习
+ 本次代码仅作学习用，没有进行优化，也没有考虑到一些特殊的情况
+ 通过这次学习到了`python`语法+爬虫基本步骤+数据库的整体设计+解析网页源码
+ 如果`title`中有表情，保存数据库会报错，该问题正在解决