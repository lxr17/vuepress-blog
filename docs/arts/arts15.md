# 第十五周ARTS总结
## Algorithm
- [4Sum](https://leetcode.com/problems/4sum/)

## Review
- [Improving build speed in Android Studio](https://medium.com/androiddevelopers/improving-build-speed-in-android-studio-3e1425274837)

## Tip
+ `FragmnetPageAdapter`在每次切换页面时，只是将`Fragment`进行分离，适合页面较少的`Fragment`使用以保存一些内存，对系统内存不会多大影响
+ `FragmentPageStateAdapter`在每次切换页面的时候，是将`Fragment`进行回收，适合页面较多的`Fragment`使用，这样就不会消耗更多的内存
+ `fragment`不通过构造函数进行传值的原因是因为横屏切换的时候获取不到值
+ `Viewpager`配合`fragment`使用，默认加载前两个`fragment`。很容易造成网络丢包、阻塞等问题。因此对于`Fragment`多的可采用懒加载

## Share