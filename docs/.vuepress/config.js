module.exports = {
    base: '/',

    // 语言
    lang: 'zh-CN',

    // 标题
    title: '懒星人的主页',

    // 描述
    description: '欢迎访问我的主页',

    // markdown显示行号
    markdown: {
        lineNumbers: true
    },

    // 自定义favicon
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}],
        ['meta', {name: 'google-site-verification', content: 'H_dV-heaDwkOiptgjG8PsPpn5oQaNGqVoO2i309k_og'}]
    ],

    // 设置ga
    plugins: [
        ['@vuepress/google-analytics', {
            ga: 'UA-146806630-1'
        }],
        ['@vuepress/back-to-top'],
        ['@vuepress/medium-zoom'],
        ['@vssue/vuepress-plugin-vssue', {// 评论功能
            // 设置 `platform` 而不是 `api`
            platform: 'github',

            // 其他的 Vssue 配置
            owner: 'lxr17',
            repo: 'vuepress-blog',
            clientId: '0da0e6be8c8536aefe51',
            clientSecret: '87756d598597898ce181db26e677c32da8df0857',

            // 语言
            locale: 'zh',

            // issue标题的前缀
            prefix: '[评论]',
        }]
    ],

    themeConfig: {
        // 你的GitHub仓库，请正确填写
        repo: 'lxr17/vuepress-blog',

        // 自定义仓库链接文字。
        repoLabel: 'GitHub',

        // 最后更新时间
        lastUpdated: '更新时间',

        // 刷新弹窗
        serviceWorker: {
            updatePopup: true,// Boolean | Object, 默认值是 undefined.
            // 如果设置为 true, 默认的文本配置将是:
            updatePopup: {
                message: "有新内容",
                buttonText: "刷新"
            }
        },

        // 导航栏
        nav: [
            {text: '博客', link: '/blog/'},
            {text: 'ARTS总结', link: '/arts/'},
            {text: '碎碎念', link: '/thought/'},
            {text: '关于', link: '/about/about'}
        ],

        // 侧边栏
        sidebar: {
            '/blog/': require('../blog/sidebar'),
            '/arts/': require('../arts/sidebar'),
            '/thought/': require('../thought/sidebar')
        }
    }
}