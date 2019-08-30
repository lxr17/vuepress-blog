# 第九周ARTS总结
## Algorithm
- [Container With Most Water](https://leetcode.com/problems/container-with-most-water/)
> 207ms | 15.11% Run time  
> 38.4MB | 99.95% Memory
```java
public int maxArea(int[] height) {
    int max = 0;

    for (int i = 0; i < height.length - 1; i++) {
        for (int j = i + 1; j < height.length; j++) {
            int temp = (j - i) * Math.min(height[i], height[j]);
            if (temp > max) {
                max = temp;
            }
        }
    }

    return max;
}
```

## Review
- [What 2 Years of Android Development Have Taught Me the Hard Way](https://blog.aritraroy.in/what-my-2-years-of-android-development-have-taught-me-the-hard-way-52b495ba5c51)  
>note:
>1. Don’t Reinvent the Wheel
>2. Choose Libraries Wisely
>3. Sit, Take a Cup of Coffee and Read More Code
>4. For God’s Sake, Maintain Proper Coding Standards
>5. You Need ProGuard, Yes, You Need It!
>6. Use a Proper Architecture
>7. User Interface Is like a Joke, If You Have to Explain It, It’s Bad
>8. Analytics Is Your Best Friend
>9. Be a Marketing Ninja
>10. It’s Time to Optimize Your App
>11. Save More Than 5 Hours Every Week with Gradle Builds
>12. Test, Test and When You Are Done, Test Again!
>13. Android Fragmentation is a Devil in Disguise
>14. Start using Git, Today!
>15. Make it Difficult for the Hackers
>16. Develop On a Low-End Device
>17. Invest in Learning Design Patterns
>18. It’s Time to Give Back

## Tip
+ 可通过一个常量来一键切换正式、测试环境。只需要环境中的每一个常量都依赖于这个常量即可。该常量推荐使用枚举类型

## Share