module.exports = {
    base: '/vuepress-blog/',

    // 标题
    title: '懒星人的学习笔记',

    // 描述
    description: '欢迎访问我的学习笔记',

    // markdown显示行号
    markdown: {
        lineNumbers: true
    },

    // 自定义favicon
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}]
    ],

    themeConfig: {
        // 你的GitHub仓库，请正确填写
        repo: 'lxr17',

        // 自定义仓库链接文字。
        repoLabel: 'GitHub',

        // 最后更新时间
        lastUpdated: '更新时间',

        // 导航栏
        nav: [
            {text: '积累', link: '/blog/'},
            {text: '学习', link: '/blog/study.md'},
            {text: '关于', link: '/blog/about.md'}
        ],

        // 侧边栏
        sidebar: [
            ['/blog/FirstBlog.md', '我的第一篇博客'],
            ['/blog/Blog2.md', '我的第二篇博客']
        ]
    }
}