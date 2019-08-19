module.exports = {
    base: '/vuepress-blog/',
    title: '博客',
    description: 'Vuepress blog demo',

    themeConfig: {
        // 你的GitHub仓库，请正确填写
        repo: 'https://github.com/lxr17',

        // 自定义仓库链接文字。
        repoLabel: 'GitHub',

        // 导航栏
        nav: [
            {text: '首页', link: '/vuepress-blog/'},
            {text: '第一篇博客', link: '/blog/FirstBlog.md'}
        ],

        // 侧边栏
        sidebar: [
            ['/blog/FirstBlog.md', '我的第一篇博客'],
            ['/blog/Blog2.md', '我的第二篇博客']
        ]
    }
}