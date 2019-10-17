# 长图的展开与收起（Android）

## 前言
在app的文章中，经常会夹杂着一些特别长的长图。在阅读的时候需要滑动很久才能看图片下方的文字，因此对于长图只展示图片上面一部分，并且可以展开这个功能是很重要的。

## 效果
![](https://pic.superbed.cn/item/5da83649451253d178f564a4.gif)

## 基本思路
利用`scaleType`的`matrix`属性以及直接改变图片的高度来实现图片的收起与展开。

## 过程
### 开始尝试
#### `scaleType`属性介绍
1. `center`：保持原图的大小，显示在`ImageView`的中心。当原图的`size`大于`ImageView`的`size`，超过部分裁剪处理；
2. `centerInside`：以原图完全显示为目的，将图片的内容完整居中显示，通过按比例缩小原图的`size`宽(高)等于或小于`ImageView`的宽(高)。如果原图的`size`本身就小于`ImageView`的`size`，则原图的`size`不作任何处理，居中显示在`ImageView`；
3. `centerCrop`：以填满整个`ImageView`为目的，将原图的中心对准`ImageView`的中心，等比例放大原图，直到填满`ImageView`为止（指的是`ImageView`的宽和高都要填满），原图超过`ImageView`的部分作裁剪处理；
4. `matrix`：不改变原图的大小，从`ImageView`的左上角开始绘制原图，原图超过`ImageView`的部分作裁剪处理；
5. `fitCenter`：把原图按比例扩大或缩小到`ImageView`的高度，居中显示；
6. `fitEnd`：把原图按比例扩大(缩小)到`ImageView`的高度，显示在`ImageView`的下部分位置；
7. `fitStart`：把原图按比例扩大(缩小)到`ImageView`的高度，显示在`ImageView`的上部分位置；
8. `fitXY`：把原图按照指定的大小在`View`中显示，拉伸显示图片，不保持原比例，填满`ImageView`

<span style="color: #ff0000;">根据以上属性介绍，可以知道matrix属性是我们要的。</span>

----
#### 基本布局
```xml
<ImageView
    android:id="@+id/iv_long_picture"
    android:layout_width="match_parent"
    android:layout_height="@dimen/dp_146"
    android:layout_below="@id/tv_main_content_question"
    android:adjustViewBounds="true"
    android:scaleType="matrix"
    android:src="@color/color_333333" />
<TextView
    android:id="@+id/tv_expand_collapse"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_below="@id/iv_long_picture"
    android:layout_marginBottom="@dimen/dp_16"
    android:layout_marginTop="@dimen/dp_10"
    android:drawableEnd="@drawable/down_icon"
    android:drawablePadding="@dimen/dp_7"
    android:text="@string/expand_all"
    android:textColor="@color/color_99"
    android:textSize="@dimen/sp_14"
    android:textStyle="bold"
    android:visibility="gone" />
```

----
#### 加载图片
使用`Glide`加载的图片，
```java
Glide.with(this)
        .load(mainContentBean.getAccessory().get(0))
        .into(ivLongPicture);
```

----
#### 点击事件
直接通过设置`imageView`的高度来实现图片的展开与收起，
```java
tvExpandCollapse.setOnClickListener(new View.OnClickListener() {
    boolean expanded = false;
    @Override
    public void onClick(View v) {
        if (expanded) {
            // 收起
            ViewGroup.LayoutParams params = ivLongPicture.getLayoutParams();
            params.width = RelativeLayout.LayoutParams.MATCH_PARENT;
            params.height = DensityUtil.dip2px(MainContentActivity.this, 146);
            ivLongPicture.setLayoutParams(params);
            expanded = false;
            tvExpandCollapse.setText(R.string.expand_all);
            tvExpandCollapse.setCompoundDrawablesRelativeWithIntrinsicBounds(0, 0, R.drawable.down_icon, 0);
            scMainContent.smoothScrollTo(0, 0);
        } else {
            // 展开
            ViewGroup.LayoutParams params = ivLongPicture.getLayoutParams();
            params.width = RelativeLayout.LayoutParams.MATCH_PARENT;
            params.height = RelativeLayout.LayoutParams.WRAP_CONTENT;
            ivLongPicture.setLayoutParams(params);
            expanded = true;
            tvExpandCollapse.setText(R.string.collapse_all);
            tvExpandCollapse.setCompoundDrawablesRelativeWithIntrinsicBounds(0, 0, R.drawable.upper_icon, 0);
        }
    }
});
```
----
### 遇到问题
根据以上的思路以及代码实现，普通的长图确实能够做到“展开”和“收起”功能。

<span style="color: #ff0000;">但是对于原图宽度超过手机宽度的图片来说，宽度并没有显示完全！</span>

对于`Glide`版本`4.0`以上，如果宽度过大，会等比例缩放至宽度等于`ImageView`的宽度，因此并不会有问题，但是我们的项目用`Glide`版本是`3.7`的，而且不容易升级，故此方法不可行。

----
### 解决
查阅了`Glide`的文档，了解了`Glide`可以在图片下载完成后对图片进行一些操作，操作完成之后的图片自然就成了`ImageView`认为的原图了。

因此，<span style="color: #ff0000;">可以在加载之前将宽度过大的图片等比例缩放，缩放完成后再加载到ImageView中去。</span>

#### 加载图片改进
```java
Glide.with(this)
            .load(mainContentBean.getAccessory().get(0))
            .asBitmap()
            .listener(new RequestListener<String, Bitmap>() {
                @Override
                public boolean onException(Exception e, String model, Target<Bitmap> target, boolean isFirstResource) {
                    return false;
                }

                @Override
                public boolean onResourceReady(Bitmap resource, String model, Target<Bitmap> target, boolean isFromMemoryCache, boolean isFirstResource) {
                    int imageWidth = resource.getWidth();
                    int imageHeight = resource.getHeight();

                    WindowManager manager = (WindowManager) MainContentActivity.this
                            .getSystemService(Context.WINDOW_SERVICE);

                    // 屏幕宽度减去margin值
                    int width = manager.getDefaultDisplay().getWidth() - DensityUtil.dip2px(MainContentActivity.this, 32);

                    float scaleRate = width * 1.0f / imageWidth;

                    //设置matrix
                    Matrix matrix = new Matrix();

                    //设置放缩比例
                    matrix.setScale(scaleRate, scaleRate);

                    ivLongPicture.setImageMatrix(matrix);

                    if (imageHeight * scaleRate > DensityUtil.dip2px(MainContentActivity.this, 146)) {
                        tvExpandCollapse.setVisibility(View.VISIBLE);
                    } else {
                        tvExpandCollapse.setVisibility(View.GONE);
                    }

                    return false;
                }
            })
            .into(ivLongPicture);
```

## 总结
+ `ImageView`的`scaleType`属性的各个属性值需要了解；
+ `Glide`版本之间的差异需要了解；
+ `ImageView`如何根据`scaleType`进行图片切割的需要了解（之后有时间阅读源码）；
+ `Glide`是一个庞然大物，也是一个很值得学习的框架，需要熟悉掌握（之后有时间阅读源码）

<span style="font-size: 18pt; background-color: #333333; color: #ffffff;">Android的优势在于开源，开源的好处在于易于学习，容易更改。对于开源的框架，仅仅是掌握是不够的，还需要好好的了解框架设计的一些设计模式，框架的优缺点等。</span>