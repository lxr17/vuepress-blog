# 仿9GAG制作过程（四）

## 有话要说
这次主要讲述主页面下拉刷新和上拉加载功能的实现。

主要是使用了`SwipeRefreshLayout`的布局方式，并在此基础上通过`RecyclerView`的特性增加了上拉加载的功能。

## 成果
![](https://he_jhua.gitee.io/image-hosting/2019/10/21/5-1.gif)

## 实现方式
### 页面布局
```xml
<android.support.v4.widget.SwipeRefreshLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/swipeRefreshView"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <android.support.v7.widget.RecyclerView
        android:id="@+id/recyclerView"
        android:background="#f0f0f0"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>
</android.support.v4.widget.SwipeRefreshLayout>
```
通过`SwipeRefreshLayout`来实现下拉刷新功能。

----
### 下拉刷新
```java
SwipeRefreshLayout swipeRefreshLayout;        
// 下拉刷新控件
swipeRefreshLayout = getView().findViewById(R.id.swipeRefreshView);
// 设置下拉控件背景色
swipeRefreshLayout.setProgressBackgroundColorSchemeColor(Color.WHITE);
// 设置下来控件主色
swipeRefreshLayout.setColorSchemeResources(R.color.colorAccent);
// 设置下拉刷新事件
swipeRefreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
    @Override
    public void onRefresh() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                String url = baseUrl + (++currentPage);
                OkHttpClient client = new OkHttpClient();
                Request request = new Request.Builder()
                        .url(url)
                        .build();
                try {
                    Response response = client.newCall(request).execute();
                    String json = response.body().string();
                    if (json != null) {
                        Gson gson = new Gson();
                        List<NewsBean> newDatas = gson.fromJson(json, new TypeToken<List<NewsBean>>(){}.getType());
                        if (newsBeans != null && newsBeans.size() > 0) {
                            newsBeans.addAll(0, newDatas);
                        }
                    }
                    Message message = new Message();
                    message.what = UPDATE_NEWS;
                    handler.sendMessage(message);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
});
```

通过`setProgressBackgroundColorSchemeColor`来设置下拉控件的背景色，也就是圈圈的主体颜色。

通过`setColorSchemeResources`来设置下拉控件中间的线条颜色。

通过`setOnRefreshListener`来定义下拉刷新事件。

然后通过`currentPage`来实现下拉刷新之后获取的数据是下一页的数据，再添加到集合开头。

```java
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

刷新完成之后，通过`notifyDataSetChanged`告诉`RecyclerView`数据改变了，进而更改页面显示。通过`setRefreshing`来控制下拉刷新控件的显示。

由此，完成了下拉刷新的实现。

----
### 上拉加载
由于`SwipeRefreshLayout`并不提供上拉加载的功能，于是准备利用`RecyclerView`灵活的特性来实现上拉加载功能。
```java
package com.example.lanxingren.imitating9gag.adapter;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.lanxingren.imitating9gag.R;
import com.example.lanxingren.imitating9gag.bean.NewsBean;
import com.example.lanxingren.imitating9gag.util.GlideApp;

import java.util.List;

public class NewsAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<NewsBean> myNewsList;
    private Context myContext;

    // 是否加载
    public static final int LOADING = 1;
    public static final int UNLOADING = 2;

    private int mStatus = UNLOADING;// 当前加载状态

    // item的viewType
    private final int ITEM = 1;
    private final int FOOTER = 2;

    static class NewsHolder extends RecyclerView.ViewHolder {
        CardView cardView;
        TextView titleView;
        ImageView imageView;
        TextView pointView;
        ImageView likeImageView;
        ImageView unlikeImageView;


        private NewsHolder (View view) {
            super(view);
            cardView = (CardView) view;
            titleView = view.findViewById(R.id.item_title);
            imageView = view.findViewById(R.id.item_image);
            pointView = view.findViewById(R.id.item_point);
            likeImageView = view.findViewById(R.id.item_like);
            unlikeImageView = view.findViewById(R.id.item_unlike);
        }
    }

    static class FooterHolder extends RecyclerView.ViewHolder {
        CardView cardView;
        private FooterHolder (View view) {
            super(view);
            cardView = view.findViewById(R.id.cardView_footer);
        }
    }

    public NewsAdapter (List<NewsBean> newsList) {
        this.myNewsList = newsList;
    }

    @Override
    public int getItemCount() {
        int count = 0;
        if (myNewsList != null) {
            count = myNewsList.size() + 1;
        }
        return count;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        if (myContext == null) {
            myContext = parent.getContext();
        }

        if (viewType == ITEM) {
            View view = LayoutInflater.from(myContext).inflate(R.layout.item_news, parent, false);
            return new NewsHolder(view);
        } else {
            View view = LayoutInflater.from(myContext).inflate(R.layout.item_footer, parent, false);
            return new FooterHolder(view);
        }
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        if (holder instanceof NewsHolder) {
            final NewsHolder newsHolder = (NewsHolder)holder;
            final NewsBean newsBean = myNewsList.get(position);

            // 设置标题
            String title = "9GAG#" + newsBean.getId();
            if (newsBean.getTitle() != null && newsBean.getTitle().length() > 0) {
                title = newsBean.getTitle();
            }
            newsHolder.titleView.setText(title);

            // 屏幕宽度
            int screenWidth = myContext.getResources()
                    .getDisplayMetrics()
                    .widthPixels;
            // 屏幕高度
            int screenHeight = myContext.getResources()
                    .getDisplayMetrics()
                    .heightPixels;

            // 设置图片，不知道为什么override这样设置就可以让图片正正好显示，有时间研究一下？
            if (newsBean.getUrls() != null && newsBean.getUrls().size() > 0) {
                GlideApp.with(myContext)
                        .load(newsBean.getUrls().get(0))
                        .override(screenWidth, screenHeight)
                        .into(newsHolder.imageView);
            }

            // 设置点赞数
            String point = Integer.toString(newsBean.getLike() - newsBean.getUnlike());
            newsHolder.pointView.setText(point);

            // 设置点赞图标显示
            int accentColor = myContext.getResources().getColor(R.color.colorAccent);
            int defaultColor = myContext.getResources().getColor(R.color.defaultColor);
            switch (newsBean.getIsLiked()) {
                case -1:
                    newsHolder.likeImageView.setColorFilter(defaultColor);
                    newsHolder.unlikeImageView.setColorFilter(accentColor);
                    break;
                case 0:
                    newsHolder.likeImageView.setColorFilter(defaultColor);
                    newsHolder.unlikeImageView.setColorFilter(defaultColor);
                    break;
                case 1:
                    newsHolder.likeImageView.setColorFilter(accentColor);
                    newsHolder.unlikeImageView.setColorFilter(defaultColor);
                    break;
            }

            // 初始化监听事件
            newsHolder.likeImageView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    newsBean.setIsLiked(1);
                    notifyDataSetChanged();
                }
            });
            newsHolder.unlikeImageView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    newsBean.setIsLiked(-1);
                    notifyDataSetChanged();
                }
            });

        } else if (holder instanceof FooterHolder) {
            switch (mStatus) {
                case UNLOADING:
                    ((FooterHolder) holder).cardView.setVisibility(View.GONE);
                    break;
                case LOADING:
                    ((FooterHolder) holder).cardView.setVisibility(View.VISIBLE);
                    break;
            }
        }
    }

    @Override
    public int getItemViewType(int position) {
        if (position + 1 == getItemCount()) {
            return FOOTER;
        } else {
            return ITEM;
        }
    }

    public void changeStatus(int status) {
        this.mStatus = status;
        notifyDataSetChanged();
    }
}
```

在适配器中定义了两个布局，一个是普通布局，一个是尾布局（`footer`）。

下面是`footer`的具体布局：
```xml
<android.support.v7.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_marginTop="10dp"
    android:layout_marginBottom="0dp"
    app:cardCornerRadius="0dp"
    android:elevation="0dp"
    android:id="@+id/cardView_footer">
    <ProgressBar
        android:layout_width="wrap_content"
        android:layout_height="100dp"
        android:layout_gravity="center_horizontal"
        />
</android.support.v7.widget.CardView>
```

#### 注意点
+ 通过`mStatus`来判断尾布局是否展示
+ `ITEM`代表的是普通布局，即段子的布局；`FOOTER`代表的是尾布局
+ 由于增加了一个`item`，故`getItemCount`得在原先的基础上加上一
+ 在`onCreateViewHolder`中通过`viewType`来创建不同的`viewHolder`
+ 实现`getItemViewType`方法，根据`position`的值来确定`viewType`
+ 在`onBindViewHolder`中先判断`viewHolder`的类型，如果是尾布局（`footer`）的话，再根据`mStatus`来判断是否展示
+ `changeStatus`主要是给外面用的，通过该方法可以控制`footer`的显示

----
### 使用上拉加载
```java
private void initLoadMoreListener() {
    recyclerView.setOnScrollListener(new RecyclerView.OnScrollListener() {
        @Override
        public void onScrollStateChanged(final RecyclerView recyclerView, int newState) {
            super.onScrollStateChanged(recyclerView, newState);

            // 获取当前可见的item位置
            int lastVisiblePosition = 0;
            RecyclerView.LayoutManager layoutManager = recyclerView.getLayoutManager();
            if (layoutManager instanceof LinearLayoutManager) {
                lastVisiblePosition = ((LinearLayoutManager) layoutManager).findLastVisibleItemPosition();
            }

            // 当前加载状态是UNLOADING && 当前可见的item位置是最后一条时
            if (currentState == NewsAdapter.UNLOADING
                    && lastVisiblePosition + 1 == recyclerView.getAdapter().getItemCount()) {
                // 改变footer的可见性
                ((NewsAdapter)recyclerView.getAdapter()).changeStatus(NewsAdapter.LOADING);
                currentState = NewsAdapter.LOADING;

                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            Thread.sleep(1000);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }

                        String url = baseUrl + (++currentPage);
                        OkHttpClient client = new OkHttpClient();
                        Request request = new Request.Builder()
                                .url(url)
                                .build();
                        try {
                            Response response = client.newCall(request).execute();
                            String json = response.body().string();
                            if (json != null) {
                                Gson gson = new Gson();
                                List<NewsBean> newDatas = gson.fromJson(json, new TypeToken<List<NewsBean>>(){}.getType());
                                if (newsBeans != null && newsBeans.size() > 0) {
                                    newsBeans.addAll(newsBeans.size(), newDatas);
                                }
                            }
                            Message message = new Message();
                            message.what = LOAD_MORE;
                            handler.sendMessage(message);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }).start();
            }
        }
    });
}
```

通过给`recyclerView`加上滚动事件来实现下拉加载功能，具体逻辑如下：
1. 获取页面可见最下面的`item`位置
2. 判断当前尾布局的加载状态
3. 如果尾布局现在的状态是`UNLOADING && item`位置为最后一个，则开线程加载数据
4. 将尾布局展示，即开始转圈动画
5. 请求网络，获取数据，放入数据集
6. 根据`handler`的处理，告诉`RecyclerView`数据改变，然后将`footer`隐藏

通过以上的过程就可以实现上拉加载的效果。

## 参考
+ [SwipeRefreshLayout详解和自定义上拉加载更多](https://www.jianshu.com/p/d23b42b6360b)  
+ [wipeRefreshLayout + RecyclerView 实现 上拉刷新 和 下拉刷新](https://www.cnblogs.com/liunanjava/p/5860024.html)

## 结束语
本次学习了`Android`的下拉刷新以及上拉加载的实现，对`RecyclerView`有了进一步的了解。

接下来准备实现点赞功能以及`GIF`的暂停功能。