# Android 属性动画实战
## 什么是属性动画？
属性动画可以通过直接更改`View`的属性来实现`View`动画。例如：
1. 通过不断的更改`View`的坐标来实现让`View`移动的效果；
2. 通过不断的更改`View`的背景来实现让`View`的背景渐变的效果；
3. 通过不断的更改`View`的宽高来实现让`View`变形的效果；
4. ...

由此可见，利用属性动画几乎可以处理任何的涉及到`View`的动画效果。

## 实战
具体的细节就不多说了，网上相应的教程也不少。这篇博客主要是来实现类似于美团外卖购物车的效果。

### 分析
首先分析购物车动画具体的细节：在滑动过程中，“购物车”**向右移动**，直至一半隐藏到右侧；在手指停留在屏幕中时，“购物车”还隐藏在右侧；当手指离开屏幕，“购物车”在**一定时间**后重新**移动回来**。

以上的动画细节可以分析出和`RecycleView`的滚动事件息息相关，因此动画就应该在`RecycleView`的滚动事件中实现。

----
### 实现基本布局
![](https://he_jhua.gitee.io/image-hosting/2019/10/21/15-1.png)

上图的蓝色图片既是我们要处理的`View`。

----
### 给RecycleView加上滚动事件
接下来给`RecycleView`加上滚动事件，滑动或者飞翔时图片消失，当停止滑动时图片显示。

```java
// 给rv加上滚动事件
rv.addOnScrollListener(new RecyclerView.OnScrollListener() {
    @Override
    public void onScrollStateChanged(@NonNull RecyclerView recyclerView, int newState) {
        switch (newState) {
            case RecyclerView.SCROLL_STATE_DRAGGING:// 滚动中
            case RecyclerView.SCROLL_STATE_SETTLING:// 飞翔中
                iv.setVisibility(View.GONE);
                break;
            case RecyclerView.SCROLL_STATE_IDLE:// 停止滚动
                iv.setVisibility(View.VISIBLE);
                break;
        }
    }
});
```

效果图：  
![](https://he_jhua.gitee.io/image-hosting/2019/10/21/15-2.gif)

----
### 实现消失的动画
根据上面的图可以发现触发时机基本是没问题了，接下来要做的是让消失不突兀，加上消失的动画。

消失的实质是`View`的`x`坐标从当前位置一直往右直到变为隐藏了一半，下面让我们来实现这个效果：
```java
// 消失动画的基本属性（从iv当前的x坐标一直到出了屏幕右侧一半）
disappearAnimator = ValueAnimator.ofFloat(iv.getX(), (float) (Utils.getScreenWidth(this) - iv.getWidth() / 2.0));
disappearAnimator.setDuration(400);// 动画持续时间
disappearAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
    @Override
    public void onAnimationUpdate(ValueAnimator animation) {// Value更新事件
        float curValue = (float) animation.getAnimatedValue();
        iv.setX(curValue);
    }
});

// 给rv加上滚动事件
rv.addOnScrollListener(new RecyclerView.OnScrollListener() {
    @Override
    public void onScrollStateChanged(@NonNull RecyclerView recyclerView, int newState) {
        switch (newState) {
            case RecyclerView.SCROLL_STATE_DRAGGING:// 滚动中
            case RecyclerView.SCROLL_STATE_SETTLING:// 飞翔中
                disappearAnimator.start();
                break;
            case RecyclerView.SCROLL_STATE_IDLE:// 停止滚动
                iv.setVisibility(View.VISIBLE);
                break;
        }
    }
});
```

然而发现实际上动画是这样的：
![](https://he_jhua.gitee.io/image-hosting/2019/10/21/15-3.gif)

发现他是从最左边一直移动到了最右边，与我们的需求不符。

经调试发现，在 **onCreate 的时候`iv`尚未初始化完毕，因此宽高以及坐标都还不能获取到。** 所以获取到的坐标以及宽度都是`0`。

所以可以在滚动事件中获取`iv`的坐标以及宽高，更改后的代码如下：
```java
// 给rv加上滚动事件
rv.addOnScrollListener(new RecyclerView.OnScrollListener() {
    @Override
    public void onScrollStateChanged(@NonNull RecyclerView recyclerView, int newState) {
        // 获取iv的坐标以及宽高
        if (0 == originX) {
            originX = iv.getX();
            ivWidth = iv.getWidth();
        }

        switch (newState) {
            case RecyclerView.SCROLL_STATE_DRAGGING:// 滚动中
            case RecyclerView.SCROLL_STATE_SETTLING:// 飞翔中
                // 消失动画的基本属性（从iv当前的x坐标一直到出了屏幕右侧一半）
                if (disappearAnimator == null) {
                    disappearAnimator = ValueAnimator.ofFloat(originX, (float) (screenWidth - ivWidth / 2.0));
                    disappearAnimator.setDuration(400);// 动画持续时间
                    disappearAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
                        @Override
                        public void onAnimationUpdate(ValueAnimator animation) {// Value更新事件
                            float curValue = (float) animation.getAnimatedValue();
                            iv.setX(curValue);
                        }
                    });
                }

                disappearAnimator.start();
                break;
            case RecyclerView.SCROLL_STATE_IDLE:// 停止滚动
                iv.setVisibility(View.VISIBLE);
                break;
        }
    }
});
```

效果如下图：  
![](https://he_jhua.gitee.io/image-hosting/2019/10/21/15-4.gif)

----
### 实现出现的动画
既然已经实现了消失的动画，那出现的动画也就不难了。出现的实质是`View`的`x`坐标从右侧一半一直运动到原始位置。
```java
case RecyclerView.SCROLL_STATE_IDLE:// 停止滚动
    // 出现动画的基本属性（从屏幕右侧一半到原始位置）
    if (appearAnimator == null) {
        appearAnimator = ValueAnimator.ofFloat((float) (screenWidth - ivWidth / 2.0), originX);
        appearAnimator.setDuration(400);// 动画持续时间
        appearAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator animation) {// Value更新事件
                float curValue = (float) animation.getAnimatedValue();
                iv.setX(curValue);
            }
        });
    }

    appearAnimator.start();
    break;
```

效果图如下：  
![](https://he_jhua.gitee.io/image-hosting/2019/10/21/15-5.gif)

但是发现如果频繁的滑动暂停的话动画会冲突，因此需要做一些判定，如果动画正在运行则不再重新开始动画。改动后的代码如下：
```java
switch (newState) {
    case RecyclerView.SCROLL_STATE_DRAGGING:// 滚动中
    case RecyclerView.SCROLL_STATE_SETTLING:// 飞翔中
        // 消失动画的基本属性（从iv当前的x坐标一直到出了屏幕右侧一半）
        if (disappearAnimator == null) {
            disappearAnimator = ValueAnimator.ofFloat(originX, (float) (screenWidth - ivWidth / 2.0));
            disappearAnimator.setDuration(400);// 动画持续时间
            disappearAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
                @Override
                public void onAnimationUpdate(ValueAnimator animation) {// Value更新事件
                    float curValue = (float) animation.getAnimatedValue();
                    iv.setX(curValue);
                }
            });
        }

        // 如果消失动画还未开始执行并且iv的位置在原始位置，则执行
        if (!disappearAnimator.isStarted() && originX == iv.getX()) {
            disappearAnimator.start();
        }
        break;
    case RecyclerView.SCROLL_STATE_IDLE:// 停止滚动
        // 出现动画的基本属性（从屏幕右侧一半到原始位置）
        if (appearAnimator == null) {
            appearAnimator = ValueAnimator.ofFloat((float) (screenWidth - ivWidth / 2.0), originX);
            appearAnimator.setDuration(400);// 动画持续时间
            appearAnimator.setStartDelay(700);// 延迟时间
            appearAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
                @Override
                public void onAnimationUpdate(ValueAnimator animation) {// Value更新事件
                    float curValue = (float) animation.getAnimatedValue();
                    iv.setX(curValue);
                }
            });
        }

        // 如果出现动画还未开始执行，则执行
        if (!appearAnimator.isStarted()) {
            appearAnimator.start();
        }
        break;
}
```

但是发现还是会有冲突，经检测，发现是出现动画和消失动画互相干扰的缘故。**当滑动已暂停但出现动画还未执行完毕，此时重新滑动会触发消失动画。**

因此需要给出现动画加一个延迟，并且如果处于非暂停状态需要取消出现动画。（也许美团外卖暂停一段时间才开始出现的原因就是防止用户不停的滑动暂停吧。）

修改后的代码如下：
```java
case RecyclerView.SCROLL_STATE_DRAGGING:// 滚动中
case RecyclerView.SCROLL_STATE_SETTLING:// 飞翔中
    // 消失动画的基本属性（从iv当前的x坐标一直到出了屏幕右侧一半）
    if (disappearAnimator == null) {
        disappearAnimator = ValueAnimator.ofFloat(originX, (float) (screenWidth - ivWidth / 2.0));
        disappearAnimator.setDuration(400);// 动画持续时间
        disappearAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator animation) {// Value更新事件
                float curValue = (float) animation.getAnimatedValue();
                iv.setX(curValue);
            }
        });
    }

    // 如果此时出现动画已开始，则取消
    if (appearAnimator != null && appearAnimator.isStarted()) {
        appearAnimator.cancel();
    }

    // 如果消失动画还未开始执行并且iv的位置在原始位置，则执行
    if (!disappearAnimator.isStarted() && originX == iv.getX()) {
        disappearAnimator.start();
    }
    break;
```

最终效果如图所示：
![](https://he_jhua.gitee.io/image-hosting/2019/10/21/15-6.gif)

## 总结
+ 如果要实现其他的效果，例如淡入淡出等同理就可以实现；
+ 多个动画对统一个`View`做变换时一定要注意动画之间的冲突；
+ 属性动画+函数方程可以实现一些丰富多变的效果，待研究；
+ 本文的实现还是比较简陋，最好的效果是动画可以被打断，由于比较麻烦，所以没有实现。

## Github地址：[属性动画初战](https://github.com/lxr17/property_animation)

<Vssue title="Android 属性动画实战" />