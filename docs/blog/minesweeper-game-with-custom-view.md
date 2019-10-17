# 利用自定义View实现扫雷游戏

## 游戏规则
简单版的扫雷事实上就是一个`9×9`的矩阵，其中有十个点是雷，非雷方块的数字代表该方块周围八个方块中雷的个数。通过长按某一方块（方块会变红）认定该方块为玩家认为的雷，通过短按某一方块来“展开”该方块。

展开：如果该方块为雷，则游戏失败；如果该方块下为非零数字，则将该方块的数字告诉玩家；如果该方块下的数字为零，则展开该方块周围区域，直到展开到数字或者雷为止。

## 实现难点
+ 如何生成不重复的十个雷
+ 如何生成非雷区域的数字
+ 如何实现“展开”

## 基本思路
首先定义两个`9×9`的矩阵，其中一个矩阵用来存放各个方块下的数字（`-1`代表雷），另一个用来存放该方块的颜色（`0`代表灰色，即默认色；`1`代表白色，即普通展开；`2`代表红色，即认定的雷）。

通过自定义`View`来实现。并且该自定义`View`的宽高设置为固定的`901px`（小方格的边长为`100px`，线的宽度为`1px`）。

每点击一次方块都会调用`view`的`invalidate`方法，进而会触发`onDraw`方法。在点击事件中更改颜色矩阵的值，并在`onDraw`方法中根据两个矩阵的值进行重绘。

## 代码展示
+ 布局文件
```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android = "http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <com.example.lanxingren.minesweeping.MineSweepingView
        android:layout_width= "901px"
        android:layout_height="901px"
        android:layout_centerInParent="true"/>
</RelativeLayout>
```
+ 主活动
```java
package com.example.lanxingren.minesweeping;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
}
```

+ 自定义View
```java
package com.example.lanxingren.minesweeping;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Point;
import android.graphics.Typeface;
import android.util.AttributeSet;
import android.view.GestureDetector;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Toast;

import java.util.Random;


public class MineSweepingView extends View {

    //    private MineSweepingView (Context context) {
    //        super(context);
    //    }

    Context myContext;


    // 触摸方块左上角的点
    Point leftTop;

    // 默认背景画笔
    Paint strokePaint = new Paint();

    // 涂色画笔，红色代表玩家认为的雷，白色代表展开该方块
    Paint whitePaint = new Paint();
    Paint redPaint = new Paint();

    //绘制数字的画笔
    Paint textPaint = new Paint();

    // 代表每个坐标的颜色，其中0代表银灰色，1代表白色，2代表红色
    int[][] colors;
    // 代表每个坐标的数字，其中-1代表雷
    int[][] numbers;

    //小格子边长
    final int width = 100;

    //一行格子数
    final int rowCount = 9;

    //雷的个数
    final int mineCount = 10;

    //手势操作监听器
    private GestureDetector.OnGestureListener onGestureListener = new GestureDetector.OnGestureListener() {
        //防止其他事件不执行，所以返回true
        @Override
        public boolean onDown(MotionEvent e) {
            return true;
        }

        @Override
        public void onShowPress(MotionEvent e) {

        }

        //短按事件
        @Override
        public boolean onSingleTapUp(MotionEvent e) {
            leftTop = findLeftTop(e.getX(), e.getY());

            if (numbers[leftTop.x][leftTop.y] == -1) {
                Toast.makeText(myContext, "你输了！", Toast.LENGTH_SHORT).show();
                reset();
                MineSweepingView.this.invalidate();
            } else {
                expand(leftTop.x, leftTop.y);
                MineSweepingView.this.invalidate();
            }

            return true;
        }

        //根据扫雷逻辑展开小方块
        private void expand(int x, int y) {
            //如果是雷
            if (numbers[x][y] == -1) {
                return;
            } else if (numbers[x][y] == 0 && colors[x][y] == 0) {
                colors[x][y] = 1;

                //左上
                if (x - 1 >= 0 && y - 1 >= 0) {
                    expand(x - 1, y - 1);
                }
                //上
                if (y - 1 >= 0) {
                    expand(x, y - 1);
                }
                //右上
                if (x + 1 < rowCount && y - 1 >= 0) {
                    expand(x + 1, y - 1);
                }
                //右
                if (x + 1 < rowCount) {
                    expand(x + 1, y);
                }
                //右下
                if (x + 1 < rowCount && y + 1 < rowCount) {
                    expand(x + 1, y + 1);
                }
                //下
                if (y + 1 < rowCount) {
                    expand(x, y + 1);
                }
                //左下
                if (x - 1 >= 0 && y + 1 < rowCount) {
                    expand(x - 1, y + 1);
                }
                //左
                if (x - 1 >= 0) {
                    expand(x - 1, y);
                }
            } else {
                colors[x][y] = 1;
            }

        }

        @Override
        public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX, float distanceY) {
            return false;
        }

        //长按事件
        @Override
        public void onLongPress(MotionEvent e) {
            leftTop = findLeftTop(e.getX(), e.getY());

            if (colors[leftTop.x][leftTop.y] != 1) {
                colors[leftTop.x][leftTop.y] = 2;
                MineSweepingView.this.invalidate();
            }
        }

        @Override
        public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX, float velocityY) {
            return false;
        }
    };

    private GestureDetector detector = new GestureDetector(onGestureListener);

    public MineSweepingView(Context context, AttributeSet attributeSet) {
        super(context, attributeSet);

        myContext = context;

        strokePaint.setColor(Color.BLACK);
        strokePaint.setStrokeWidth(1);

        whitePaint.setStyle(Paint.Style.FILL_AND_STROKE);
        whitePaint.setColor(Color.WHITE);

        redPaint.setStyle(Paint.Style.FILL_AND_STROKE);
        redPaint.setColor(Color.RED);

        textPaint.setColor(Color.BLACK);
        textPaint.setTextAlign(Paint.Align.CENTER);
        textPaint.setTextSize(50);
        Typeface typeface = Typeface.createFromAsset(context.getAssets(), "fonts/consola.ttf");
        textPaint.setTypeface(typeface);
        textPaint.setStyle(Paint.Style.FILL);

        reset();
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        canvas.drawColor(Color.GRAY);

        for (int i = 0; i <= canvas.getWidth(); i += width) {
            canvas.drawLine(i, 0, i, canvas.getHeight(), strokePaint);
        }

        for (int j = 0; j <= canvas.getHeight(); j += width) {
            canvas.drawLine(0, j, canvas.getWidth(), j, strokePaint);
        }

        Paint.FontMetrics fontMetrics = textPaint.getFontMetrics();
        float top = fontMetrics.top;
        float bottom = fontMetrics.bottom;

        int grayCount = 0;
        int redCount = 0;

        for (int x = 0; x < rowCount; x++) {
            for (int y = 0; y < rowCount; y++) {
                switch (colors[x][y]) {
                    //宽高各缩减一单位是为了防止把细线也给覆盖了
                    case 1://白色
                        canvas.drawRect(x * width + 1, y * width + 1, (x + 1) * width - 1, (y + 1) * width - 1, whitePaint);
                        if (numbers[x][y] != -1 && numbers[x][y] != 0) {
                            canvas.drawText(Integer.toString(numbers[x][y]), x * width + 50, y * width + 50 - top / 2 - bottom / 2, textPaint);
                        } else if (numbers[x][y] == -1) {
                            canvas.drawRect(x * width + 1, y * width + 1, (x + 1) * width - 1, (y + 1) * width - 1, redPaint);
                        }
                        break;
                    case 2://红色
                        canvas.drawRect(x * width + 1, y * width + 1, (x + 1) * width - 1, (y + 1) * width - 1, redPaint);
                        redCount++;
                        break;
                    case 0://灰色
                        grayCount++;
                        break;
                    default:
                        break;
                }
            }
        }

        if(grayCount == 0 && redCount == 10) {
            Toast.makeText(myContext, "你赢了！", Toast.LENGTH_LONG).show();
        }
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
//        super.onTouchEvent(event);
//
//        if (event.getAction() == MotionEvent.ACTION_DOWN) {
//            leftTop = findLeftTop(event.getX(), event.getY());
//            colors[leftTop.x][leftTop.y] = 1;
//            this.invalidate();
//        }
//
//        return true;

        //使用手势触摸
        return detector.onTouchEvent(event);
    }

    //找到触点所在的小方块
    private Point findLeftTop(float touchX, float touchY) {
        Point point = new Point();

        for (int i = 0; i < rowCount; i++) {
            if (touchX - i * width > 0 && touchX - i * width < width) {
                point.x = i;
            }
            if (touchY - i * width > 0 && touchY - i * width < width) {
                point.y = i;
            }
        }

        return point;
    }

    //重置游戏
    private void reset() {
        colors = new int[rowCount][rowCount];
        numbers = new int[rowCount][rowCount];

        createMines();
    }

    private void createMines() {
        int x;
        int y;
        int minesCount = 0;
        Random random = new Random();

        //藏雷
        while (minesCount < mineCount) {
            x = random.nextInt(rowCount);
            y = random.nextInt(rowCount);

            if (numbers[x][y] != -1) {
                numbers[x][y] = -1;
                minesCount++;
                plusNumber(x, y);
            }
        }
    }

    //填充雷附近的数字
    private void plusNumber (int x, int y) {
        //左上
        if (x - 1 >= 0 && y - 1 >= 0 && numbers[x - 1][y - 1] != -1) {
            numbers[x - 1][y - 1]++;
        }
        //上
        if (y - 1 >= 0 && numbers[x][y - 1] != -1) {
            numbers[x][y - 1]++;
        }
        //右上
        if (x + 1 < rowCount && y - 1 >= 0 && numbers[x + 1][y - 1] != -1) {
            numbers[x + 1][y - 1]++;
        }
        //右
        if (x + 1 < rowCount && numbers[x + 1][y] != -1) {
            numbers[x + 1][y]++;
        }
        //右下
        if (x + 1 < rowCount && y + 1 < rowCount && numbers[x + 1][y + 1] != -1) {
            numbers[x + 1][y + 1]++;
        }
        //下
        if (y + 1 < rowCount && numbers[x][y + 1] != -1) {
            numbers[x][y + 1]++;
        }
        //左下
        if (x - 1 >= 0 && y + 1 < rowCount && numbers[x - 1][y + 1] != -1) {
            numbers[x - 1][y + 1]++;
        }
        //左
        if (x - 1 >= 0 && numbers[x - 1][y] != -1) {
            numbers[x - 1][y]++;
        }
    }
}
```

接下来主要讲一讲自定义`View`内部的代码。

这里是通过`GestureDetector`来实现的区分短按和长按事件，具体实现步骤为：
1. 实现`GestureDetector.OnGestureListener`接口
2. 创建`GestureDetector`对象（该对象参数为上一步实现类的对象）
3. 在`onTouchEvent`中调用`GestureDetector`的`onTouchEvent`方法

下面说一下监听类的各个方法：
```java
private GestureDetector.OnGestureListener onGestureListener = new GestureDetector.OnGestureListener() {
        //防止其他事件不执行，所以返回true
        @Override
        public boolean onDown(MotionEvent e) {
            return true;
        }

        @Override
        public void onShowPress(MotionEvent e) {

        }

        //短按事件
        @Override
        public boolean onSingleTapUp(MotionEvent e) {
            leftTop = findLeftTop(e.getX(), e.getY());

            if (numbers[leftTop.x][leftTop.y] == -1) {
                Toast.makeText(myContext, "你输了！", Toast.LENGTH_SHORT).show();
                reset();
                MineSweepingView.this.invalidate();
            } else {
                expand(leftTop.x, leftTop.y);
                MineSweepingView.this.invalidate();
            }

            return true;
        }

        //根据扫雷逻辑展开小方块
        private void expand(int x, int y) {
            //如果是雷
            if (numbers[x][y] == -1) {
                return;
            } else if (numbers[x][y] == 0 && colors[x][y] == 0) {
                colors[x][y] = 1;

                //左上
                if (x - 1 >= 0 && y - 1 >= 0) {
                    expand(x - 1, y - 1);
                }
                //上
                if (y - 1 >= 0) {
                    expand(x, y - 1);
                }
                //右上
                if (x + 1 < rowCount && y - 1 >= 0) {
                    expand(x + 1, y - 1);
                }
                //右
                if (x + 1 < rowCount) {
                    expand(x + 1, y);
                }
                //右下
                if (x + 1 < rowCount && y + 1 < rowCount) {
                    expand(x + 1, y + 1);
                }
                //下
                if (y + 1 < rowCount) {
                    expand(x, y + 1);
                }
                //左下
                if (x - 1 >= 0 && y + 1 < rowCount) {
                    expand(x - 1, y + 1);
                }
                //左
                if (x - 1 >= 0) {
                    expand(x - 1, y);
                }
            } else {
                colors[x][y] = 1;
            }

        }

        @Override
        public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX, float distanceY) {
            return false;
        }

        //长按事件
        @Override
        public void onLongPress(MotionEvent e) {
            leftTop = findLeftTop(e.getX(), e.getY());

            if (colors[leftTop.x][leftTop.y] != 1) {
                colors[leftTop.x][leftTop.y] = 2;
                MineSweepingView.this.invalidate();
            }
        }

        @Override
        public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX, float velocityY) {
            return false;
        }
    };
```

主要的是`onSingleTapUp`方法以及`onLongPress`方法，前者是短按事件，后者是长按事件。

先说长按事件，`findLeftTop`方法用于找到触点所在小方块左上角定点坐标，然后直接把该小方块的颜色改为红色，然后调用`invalidate`方法用于触发`onDraw`方法。

短按事件，首先找到触点所在小方块左上角坐标。然后判断该小方块是否为雷，如果是雷，直接重置游戏。否则的话，根据`expand`的逻辑来展开方块。

`expand`的逻辑：如果要展开的小方块下为大于零的数字，则展开该方块；如果要展开的小方块下为`-1`（也就是雷），则直接返回；如果要展开的小方块的数字为零，则展开该方块并将盖方块周围的方块执行`expand`逻辑。

通过`expand`方法，就实现了扫雷“展开”的逻辑。

下面说一下`onDraw`方法：
```java
protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        canvas.drawColor(Color.GRAY);

        for (int i = 0; i <= canvas.getWidth(); i += width) {
            canvas.drawLine(i, 0, i, canvas.getHeight(), strokePaint);
        }

        for (int j = 0; j <= canvas.getHeight(); j += width) {
            canvas.drawLine(0, j, canvas.getWidth(), j, strokePaint);
        }

        Paint.FontMetrics fontMetrics = textPaint.getFontMetrics();
        float top = fontMetrics.top;
        float bottom = fontMetrics.bottom;

        int grayCount = 0;
        int redCount = 0;

        for (int x = 0; x < rowCount; x++) {
            for (int y = 0; y < rowCount; y++) {
                switch (colors[x][y]) {
                    //宽高各缩减一单位是为了防止把细线也给覆盖了
                    case 1://白色
                        canvas.drawRect(x * width + 1, y * width + 1, (x + 1) * width - 1, (y + 1) * width - 1, whitePaint);
                        if (numbers[x][y] != -1 && numbers[x][y] != 0) {
                            canvas.drawText(Integer.toString(numbers[x][y]), x * width + 50, y * width + 50 - top / 2 - bottom / 2, textPaint);
                        } else if (numbers[x][y] == -1) {
                            canvas.drawRect(x * width + 1, y * width + 1, (x + 1) * width - 1, (y + 1) * width - 1, redPaint);
                        }
                        break;
                    case 2://红色
                        canvas.drawRect(x * width + 1, y * width + 1, (x + 1) * width - 1, (y + 1) * width - 1, redPaint);
                        redCount++;
                        break;
                    case 0://灰色
                        grayCount++;
                        break;
                    default:
                        break;
                }
            }
        }

        if(grayCount == 0 && redCount == 10) {
            Toast.makeText(myContext, "你赢了！", Toast.LENGTH_LONG).show();
        }
    }
```

具体的步骤为：
1. 用灰色充当背景色，涂色
2. 画好竖线以及横线，实现了`9×9`的矩阵
3. 根据小方块颜色来涂色

根据小方块颜色涂色的逻辑为：如果颜色是白色，则先把小方块变成白色，然后在小方块上画上小方块内要显示的数字（如果是零，则不显示）；如果颜色是红色，则把小方块颜色涂成红色。

涂色之后可以获取到灰色小方块的个数以及红色小方块的个数。当灰色小方块的个数为零并且红色小方块的个数为十的时候证明游戏成功！

接下来说一下`reset`方法，该方法生成了雷以及雷周围的数字：
```java
    //重置游戏
    private void reset() {
        colors = new int[rowCount][rowCount];
        numbers = new int[rowCount][rowCount];

        createMines();
    }

    private void createMines() {
        int x;
        int y;
        int minesCount = 0;
        Random random = new Random();

        //藏雷
        while (minesCount < mineCount) {
            x = random.nextInt(rowCount);
            y = random.nextInt(rowCount);

            if (numbers[x][y] != -1) {
                numbers[x][y] = -1;
                minesCount++;
                plusNumber(x, y);
            }
        }
    }

    //填充雷附近的数字
    private void plusNumber (int x, int y) {
        //左上
        if (x - 1 >= 0 && y - 1 >= 0 && numbers[x - 1][y - 1] != -1) {
            numbers[x - 1][y - 1]++;
        }
        //上
        if (y - 1 >= 0 && numbers[x][y - 1] != -1) {
            numbers[x][y - 1]++;
        }
        //右上
        if (x + 1 < rowCount && y - 1 >= 0 && numbers[x + 1][y - 1] != -1) {
            numbers[x + 1][y - 1]++;
        }
        //右
        if (x + 1 < rowCount && numbers[x + 1][y] != -1) {
            numbers[x + 1][y]++;
        }
        //右下
        if (x + 1 < rowCount && y + 1 < rowCount && numbers[x + 1][y + 1] != -1) {
            numbers[x + 1][y + 1]++;
        }
        //下
        if (y + 1 < rowCount && numbers[x][y + 1] != -1) {
            numbers[x][y + 1]++;
        }
        //左下
        if (x - 1 >= 0 && y + 1 < rowCount && numbers[x - 1][y + 1] != -1) {
            numbers[x - 1][y + 1]++;
        }
        //左
        if (x - 1 >= 0 && numbers[x - 1][y] != -1) {
            numbers[x - 1][y]++;
        }
    }
```

`reset`方法首先重置了颜色矩阵和数字矩阵。

接下来通过随机数的方式随机生成一个雷，并把数字矩阵下该坐标所对应的值改为`-1`；接着把该雷周围一圈数字都加一；然后生成第二个雷。

这样循环了十个雷之后雷以及数字就生成完毕。

## 效果图
[![](https://pic.superbed.cn/item/5da7df43451253d178e6a14e.png)](https://pic.superbed.cn/item/5da7df43451253d178e6a14e.png)
[![](https://pic.superbed.cn/item/5da7df43451253d178e6a150.png)](https://pic.superbed.cn/item/5da7df43451253d178e6a150.png)
[![](https://pic.superbed.cn/item/5da7df43451253d178e6a152.png)](https://pic.superbed.cn/item/5da7df43451253d178e6a152.png)

以上就是通过自定义`View`的方式实现的一个简易版扫雷。

第一次写博客，比较生疏。如有建议，欢迎评论~

