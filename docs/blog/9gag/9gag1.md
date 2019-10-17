# 仿9GAG制作过程（一）

## 有话要说
准备开始学习`Android`应用程序的一个完整的设计过程。准备做一个仿9GAG的APP，前端界面设计+后台数据爬虫+后台接口设计，整个流程体验一遍。今天准备先把前端界面的框架给完成了。

## 成果图
![](https://pic.superbed.cn/item/5da808f5451253d178ea8e34.gif)

## 布局代码
```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v4.widget.DrawerLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/drawer_layout"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true"
    tools:openDrawer="start">

    <include
        layout="@layout/activity_main_appbar"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

    <android.support.design.widget.NavigationView
        android:id="@+id/nav_view"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:layout_gravity="start"
        android:fitsSystemWindows="false"
        app:headerLayout="@layout/activity_main_drawer_head"
        app:menu="@menu/activity_main_drawer_menu"
        android:theme="@style/MenuTextStyle"
         />

</android.support.v4.widget.DrawerLayout>
```
主活动用了`DrawerLayout`的布局方式，通过设置`DrawerLayout`的`openDrawer`属性以及`NavigationView`的`gravity`属性来实现左侧的测拉区域。

下面来看看`NavigationView`的头部布局以及`menu`的布局：
```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="?attr/actionBarSize"
    android:background="@color/background">

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">
        <de.hdodenhof.circleimageview.CircleImageView
            android:id="@+id/circleImageView"
            android:layout_width="28dp"
            android:layout_height="28dp"
            android:layout_centerVertical="true"
            android:layout_marginLeft="14dp"/>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="懒星人"
            android:layout_centerVertical="true"
            android:layout_marginLeft="14dp"
            android:layout_toRightOf="@id/circleImageView"
            android:textColor="@color/colorPrimary"/>
        <ImageView
            android:id="@+id/imageView"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:src="@drawable/ic_settings_gray_24dp"
            android:layout_centerVertical="true"
            android:layout_marginRight="14dp"
            android:layout_alignParentRight="true"/>
    </RelativeLayout>

    <View
        android:layout_alignParentBottom="true"
        android:layout_width="match_parent"
        android:layout_height="1dp"
        android:background="?android:listDivider"
        />
</RelativeLayout>
```
这里用到了`CircleImageView`组件来实现图片缩放裁剪成圆形，作为左上角头像的布局。并且由于头部的布局与`menu`的布局之间没有直接的分割线，就用`View`来实现了一个分割线。

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    tools:showIn="navigation_view">

    <group
        android:id="@+id/group1"
        android:checkableBehavior="single">
        <item
            android:id="@+id/nav_home"
            android:icon="@drawable/ic_home_gray_24dp"
            android:title="@string/home" />
        <item
            android:id="@+id/nav_notifications"
            android:icon="@drawable/ic_notifications_gray_24dp"
            android:title="@string/notifications" />
    </group>

    <group android:id="@+id/group2">
        <item
            android:id="@+id/nav_share"
            android:icon="@drawable/ic_share_gray_24dp"
            android:title="@string/share" />
        <item
            android:id="@+id/nav_send"
            android:icon="@drawable/ic_send_gray_24dp"
            android:title="@string/send" />
    </group>

</menu>
```
左侧`menu`的布局和主`menu`实现方式一致，通过`menu`的配置文件来实现。

在这里遇到了两个问题：
+ 左侧`menu`字体不是粗体，但是需要粗体
+ 左侧`menu`布局的图标和文字之间的间隔太大

第一个问题通过给`NavigationView`设置了主题，主题的主要意义就是加粗字体，如下代码：
```xml
<style name="MenuTextStyle">
        <item name="android:textStyle">bold</item>
</style>
```

第二个问题，通过阅读`NavigationView`的源码逐步找到了`item`的布局文件，布局文件为`design_navigation_menu_item.xml`，于是将布局文件复制到`layout`下，并将`drawablePadding`改成了`20dp`，如下代码：
```xml
<?xml version="1.0" encoding="utf-8"?>
<merge xmlns:android="http://schemas.android.com/apk/res/android">

    <CheckedTextView
        android:id="@+id/design_menu_item_text"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:drawablePadding="20dp"
        android:gravity="center_vertical|start"
        android:maxLines="1"
        android:textAppearance="@style/TextAppearance.AppCompat.Body2"/>

    <ViewStub
        android:id="@+id/design_menu_item_action_area_stub"
        android:inflatedId="@+id/design_menu_item_action_area"
        android:layout="@layout/design_menu_item_action_area"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"/>

</merge>
```

## 插一个知识点
可以直接通过`Android Studio`来生成需要用到的图标，这里的图标我都是直接通过`Android Studio`生成的，生成步骤如下：
![](https://pic.superbed.cn/item/5da808f5451253d178ea8e39.png)
![](https://pic.superbed.cn/item/5da808f5451253d178ea8e3b.png)

接下来说一下主页面的实现，是通过`TabLayout`+`ViewPage`的方式来实现的，先来看代码：
```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".activity.MainActivity">

    <android.support.design.widget.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/AppTheme.AppBarOverlay">

        <android.support.v7.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            android:background="?attr/colorPrimary"
            app:layout_scrollFlags="scroll|enterAlways"
            app:popupTheme="@style/AppTheme.PopupOverlay" />

        <android.support.design.widget.TabLayout
            android:id="@+id/tabLayout"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            app:tabBackground="@color/background"
            app:tabIndicatorColor="@color/colorPrimary"
            app:tabTextColor="@color/defaultColor"
            app:tabSelectedTextColor="@color/colorPrimary"
            app:tabTextAppearance="@style/TabText"/>

    </android.support.design.widget.AppBarLayout>

    <android.support.v4.view.ViewPager
        android:id="@+id/viewPage"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior"/>

</android.support.design.widget.CoordinatorLayout>
```

这里需要注意一下几个知识点：
+ 通过给`Toolbar`的`layout_scrollFlags`属性设置`scroll|enterAlways`并且给`ViewPager`设置`layout_behavior`属性来实现滑动的时候`Toolbar`消失。即当设置`layout_behavior`的组件滑动时设置`layout_scrollFlags`的组件会移出屏幕
+ 给`TabLayout`的`tabTextAppearance`设置一个字体样式来实现`Tab`页加粗效果

下面主要来说一下`activity`部分的代码，先上代码：
```java
package com.example.lanxingren.imitating9gag.activity;

import android.os.Bundle;
import android.support.design.widget.NavigationView;
import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.view.GravityCompat;
import android.support.v4.view.ViewPager;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;

import com.example.lanxingren.imitating9gag.R;
import com.example.lanxingren.imitating9gag.adapter.MyFragmentPagerAdapter;
import com.example.lanxingren.imitating9gag.fragment.HomeFragment;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;
import de.hdodenhof.circleimageview.CircleImageView;

public class MainActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {

    @BindView(R.id.toolbar)
    Toolbar toolbar;
    @BindView(R.id.drawer_layout)
    DrawerLayout drawer;
    @BindView(R.id.nav_view)
    NavigationView navigationView;
    @BindView(R.id.tabLayout)
    TabLayout tabLayout;
    @BindView(R.id.viewPage)
    ViewPager viewPager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

        ButterKnife.bind(this);

        //设置ActionBar
        setSupportActionBar(toolbar);

        //设置DrawerLayout的监听事件，其中后两个参数是给残障人士的语音
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        //设置左上角的三杠图标
        toggle.syncState();
        drawer.addDrawerListener(toggle);

        //设置抽屉的监听事件
        navigationView.setNavigationItemSelectedListener(this);

        //直接findViewById会导致NPE，抽屉head部分的头像
        CircleImageView circleImageView = navigationView.getHeaderView(0)
                .findViewById(R.id.circleImageView);
        Picasso.with(this).load("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527745766743&di=c24134fe5233902ca1a60a8665c30a35&imgtype=0&src=http%3A%2F%2Fimg1.sc115.com%2Fuploads%2Fsc%2Fjpg%2F144%2F18628.jpg")
                .into(circleImageView);

        //定义viewPage的适配器
        List<Fragment> fragments = new ArrayList();
        fragments.add(new HomeFragment());
        fragments.add(new HomeFragment());
        MyFragmentPagerAdapter adapter = new MyFragmentPagerAdapter(getSupportFragmentManager(), fragments);

        viewPager.setAdapter(adapter);
        tabLayout.setupWithViewPager(viewPager);
    }

    @Override
    public void onBackPressed() {
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    /**
     * 右上角按钮图标
     * @param menu
     * @return
     */
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    //右上角按钮点击事件
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        return super.onOptionsItemSelected(item);
    }

    //左侧抽屉menu点击事件
    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        int id = item.getItemId();

        if (id == R.id.nav_home) {

        } else if (id == R.id.nav_notifications) {

        } else if (id == R.id.nav_send) {

        } else if (id == R.id.nav_share) {

        }

        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

}
```

知识点：
+ 用了`ButterKnife`而不是`findViewById`来获取组件
+ 用了`Picasso`来加载网络图片，头像以及内部都是通过这种方式来加载的
+ 定义了`MyFragmentPagerAdapter`适配器来实现`ViewPage`的布局

`MyFragmentPagerAdapter`内部的数据实际上为`HomeFragment`，而该`Fragment`的布局实际上只是一个简单的`RecyclerView`，下面上`HomeFragment`的代码：
```java
package com.example.lanxingren.imitating9gag.fragment;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.lanxingren.imitating9gag.R;
import com.example.lanxingren.imitating9gag.adapter.NewsAdapter;
import com.example.lanxingren.imitating9gag.bean.NewsBean;

import java.util.ArrayList;
import java.util.List;

/**
 */
public class HomeFragment extends Fragment {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_home, container, false);
    }

    @Override
    public void onStart() {
        super.onStart();
        List<NewsBean> newsBeans = new ArrayList<NewsBean>();

        for (int i = 0; i < 30; i++) {
            newsBeans.add(new NewsBean("这是第 " + Integer.toString(i+1) + " 条有趣的段子！",
                    "http://ws4.sinaimg.cn/mw600/6c560b83ly1fruncq3z03j20ks0rs41b.jpg", 0));
        }

        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(getContext());

        RecyclerView recyclerView = getView().findViewById(R.id.recyclerView);
        recyclerView.setAdapter(new NewsAdapter(newsBeans));
        recyclerView.setLayoutManager(linearLayoutManager);
    }
}
```

`RecyrView`用了`NewsAdapter`适配器，适配器代码如下：
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
import com.squareup.picasso.Picasso;

import java.util.List;

public class NewsAdapter extends RecyclerView.Adapter<NewsAdapter.NewsHolder> {

    private List<NewsBean> myNewsList;
    private Context myContext;

    static class NewsHolder extends RecyclerView.ViewHolder {
        CardView cardView;
        TextView textView;
        ImageView imageView;

        private NewsHolder (View view) {
            super(view);
            cardView = (CardView) view;
            textView = view.findViewById(R.id.item_text);
            imageView = view.findViewById(R.id.item_image);
        }
    }

    public NewsAdapter (List<NewsBean> newsList) {
        this.myNewsList = newsList;
    }

    @Override
    public int getItemCount() {
        int count = 0;
        if (myNewsList != null) {
            count = myNewsList.size();
        }
        return count;
    }

    @NonNull
    @Override
    public NewsHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        if (myContext == null) {
            myContext = parent.getContext();
        }
        View view = LayoutInflater.from(myContext).inflate(R.layout.item_news, parent, false);
        return new NewsHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull NewsHolder holder, int position) {
        NewsBean newsBean = myNewsList.get(position);
        holder.textView.setText(newsBean.getTitle());

        int screenWidth = myContext.getResources()
                .getDisplayMetrics()
                .widthPixels;
        Picasso.with(myContext)
                .load(newsBean.getPicUrl())
                .resize(screenWidth, 0)
                .into(holder.imageView);
    }
}
```

每一项的布局为`item_news`，一会儿看具体布局。在`onBindViewHolder`中给布局的`textView`设置了文字，给`imageView`设置了图片。

之前看别人的博客，经常会在适配器中定义一个`myContext`，我一直觉得没什么用。但是在这次实际编写适配器的过程中，发现了`myContext`还是有很多地方要用到的。

下面来看看`item_news`的布局，代码如下：
```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_marginVertical="10dp"
    app:cardCornerRadius="0dp"
    android:elevation="0dp">
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        >
        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_height="40dp"
            android:gravity="center">
            <TextView
                android:id="@+id/item_text"
                android:textStyle="bold"
                android:textColor="@color/colorPrimary"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_alignParentLeft="true"
                android:layout_marginLeft="14dp"/>
            <ImageView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_alignParentRight="true"
                android:src="@drawable/ic_expand_more_gray_24dp"
                android:layout_marginRight="14dp"/>
        </RelativeLayout>
        <ImageView
            android:id="@+id/item_image"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:scaleType="fitCenter"/>
        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="40dp"
            android:orientation="horizontal"
            android:gravity="center">
            <LinearLayout
                android:layout_width="0dp"
                android:layout_weight="1"
                android:layout_height="wrap_content"
                android:orientation="horizontal">
                <ImageView
                    android:layout_width="0dp"
                    android:layout_weight="1"
                    android:layout_height="wrap_content"
                    android:src="@drawable/ic_thumb_up_gray_24dp"
                    android:scaleType="fitEnd"/>
                <TextView
                    android:layout_width="0dp"
                    android:layout_weight="1"
                    android:layout_height="wrap_content"
                    android:gravity="center"
                    android:text="5k"/>
                <ImageView
                    android:layout_width="0dp"
                    android:layout_weight="1"
                    android:layout_height="wrap_content"
                    android:src="@drawable/ic_thumb_down_gray_24dp"
                    android:scaleType="fitStart"/>
            </LinearLayout>

            <View
                android:layout_width="1dp"
                android:layout_height="20dp"
                android:background="?android:listDivider"/>

            <LinearLayout
                android:layout_width="0dp"
                android:layout_weight="1"
                android:layout_height="wrap_content"
                android:gravity="center">
                <ImageView
                    android:layout_width="0dp"
                    android:layout_weight="1"
                    android:layout_height="wrap_content"
                    android:src="@drawable/ic_comment_gray_24dp"
                    android:scaleType="fitEnd"
                    android:paddingRight="5dp"/>
                <TextView
                    android:layout_width="0dp"
                    android:layout_weight="1"
                    android:layout_height="wrap_content"
                    android:gravity="left"
                    android:text="46"
                    android:paddingLeft="5dp"/>
            </LinearLayout>

            <View
                android:layout_width="1dp"
                android:layout_height="20dp"
                android:background="?android:listDivider"/>

            <LinearLayout
                android:layout_width="0dp"
                android:layout_weight="1"
                android:layout_height="wrap_content"
                android:gravity="center">
                <ImageView
                    android:layout_width="0dp"
                    android:layout_weight="1"
                    android:layout_height="wrap_content"
                    android:src="@drawable/ic_share_gray_24dp"
                    android:scaleType="fitEnd"
                    android:paddingRight="5dp"/>
                <TextView
                    android:layout_width="0dp"
                    android:layout_weight="1"
                    android:layout_height="wrap_content"
                    android:gravity="left"
                    android:text="分享"
                    android:paddingLeft="5dp"/>
            </LinearLayout>
        </LinearLayout>
    </LinearLayout>

</android.support.v7.widget.CardView>
```

每一项使用的是卡片式布局，使用了官方的`CardView`组件。

通过设置`cardCornerRadius`来设置圆角弧度为`0`，使得卡片为正矩形。

`ImageView`的`scaleType`的意思是图片如何填充，其中`fitCenter`为居中填充，`fitStart`为左对齐填充，`fitEnd`为右对齐填充。

写的比较仓促，如有疑问或者错误的地方欢迎留言指正。