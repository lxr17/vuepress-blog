(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{315:function(t,s,n){"use strict";n.r(s);var a=n(10),e=Object(a.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"第三十二周arts总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#第三十二周arts总结"}},[t._v("#")]),t._v(" 第三十二周ARTS总结")]),t._v(" "),s("h2",{attrs:{id:"algorithm"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#algorithm"}},[t._v("#")]),t._v(" Algorithm")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://leetcode.com/problems/count-and-say/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Count and Say"),s("OutboundLink")],1)])]),t._v(" "),s("blockquote",[s("p",[t._v("1ms | 99.69% Run time"),s("br"),t._v("\n34.1MB | 100.00% Memory")])]),t._v(" "),s("div",{staticClass:"language-java line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("countAndSay")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("n "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 获取n-1返回的值")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" lastAns "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("countAndSay")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("n "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("StringBuilder")]),t._v(" ans "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("StringBuilder")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 初始化两个局部变量")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("char")]),t._v(" num "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" lastAns"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("charAt")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" count "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 遍历字符串，得到需要的字符串")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" lastAns"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("length")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("lastAns"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("charAt")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" num"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("count "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                    ans"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("append")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("char")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token char"}},[t._v("'0'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" count"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("append")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("num"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n                "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n                num "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" lastAns"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("charAt")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n                count "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                num "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" lastAns"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("charAt")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n                count"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n            "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 处理结束了的情况")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" lastAns"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("length")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                ans"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("append")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("char")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token char"}},[t._v("'0'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" count"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("append")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("num"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" ans"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br"),s("span",{staticClass:"line-number"},[t._v("19")]),s("br"),s("span",{staticClass:"line-number"},[t._v("20")]),s("br"),s("span",{staticClass:"line-number"},[t._v("21")]),s("br"),s("span",{staticClass:"line-number"},[t._v("22")]),s("br"),s("span",{staticClass:"line-number"},[t._v("23")]),s("br"),s("span",{staticClass:"line-number"},[t._v("24")]),s("br"),s("span",{staticClass:"line-number"},[t._v("25")]),s("br"),s("span",{staticClass:"line-number"},[t._v("26")]),s("br"),s("span",{staticClass:"line-number"},[t._v("27")]),s("br"),s("span",{staticClass:"line-number"},[t._v("28")]),s("br"),s("span",{staticClass:"line-number"},[t._v("29")]),s("br"),s("span",{staticClass:"line-number"},[t._v("30")]),s("br"),s("span",{staticClass:"line-number"},[t._v("31")]),s("br"),s("span",{staticClass:"line-number"},[t._v("32")]),s("br"),s("span",{staticClass:"line-number"},[t._v("33")]),s("br"),s("span",{staticClass:"line-number"},[t._v("34")]),s("br"),s("span",{staticClass:"line-number"},[t._v("35")]),s("br"),s("span",{staticClass:"line-number"},[t._v("36")]),s("br")])]),s("h2",{attrs:{id:"review"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#review"}},[t._v("#")]),t._v(" Review")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://jorgecastillo.dev/dependency-inversion-on-android-theming",target:"_blank",rel:"noopener noreferrer"}},[t._v("Dependency Inversion on Android Theming"),s("OutboundLink")],1),t._v(" "),s("blockquote",[s("p",[t._v("注：可通过自定义不同的theme来实现切换主题的功能。所有的样式都得通过"),s("code",[t._v("?attr/colorSurface")]),t._v("的形式使用，而不是直接引用具体的色值等。")])])]),t._v(" "),s("li",[s("a",{attrs:{href:"https://scottyab.com/2019/10/androidx-security-library/",target:"_blank",rel:"noopener noreferrer"}},[t._v("AndroidX: Security library"),s("OutboundLink")],1),t._v(" "),s("blockquote",[s("p",[t._v("注：一种基于"),s("code",[t._v("AndroidX")]),t._v("的安全库，主要针对于"),s("code",[t._v("SharedPreference")]),t._v("和"),s("code",[t._v("File")]),t._v("的加密。")])])])]),t._v(" "),s("h2",{attrs:{id:"tip"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#tip"}},[t._v("#")]),t._v(" Tip")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("SnapHelper")]),t._v("：用于辅助"),s("code",[t._v("RecyclerView")]),t._v("在滚动结束时将"),s("code",[t._v("item")]),t._v("对齐到某个位置。特别是列表横向滑动时，很多时候不会让列表滑到任意位置，而是会有一定的规则限制。\n"),s("ul",[s("li",[t._v("LinearSnapHelper")]),t._v(" "),s("li",[t._v("PagerSnapHelper")])])]),t._v(" "),s("li",[s("code",[t._v("ViewFlipper")]),t._v("："),s("code",[t._v("ViewAnimator")]),t._v("的子类，而"),s("code",[t._v("ViewAnimator")]),t._v("又是继承自"),s("code",[t._v("FrameLayout")]),t._v("，而"),s("code",[t._v("FrameLayout")]),t._v("就是平时基本上只显示一个子视图的布局，由于"),s("code",[t._v("FrameLayout")]),t._v("下不好确定子视图的位置，所以很多情况下子视图之前存在相互遮挡，这样就造成了很多时候我们基本上只要求"),s("code",[t._v("FrameLayout")]),t._v("显示一个子视图，然后通过某些控制来实现切换。正好，"),s("code",[t._v("ViewFlipper")]),t._v("帮我们实现了这个工作，我们需要做的就是，选择恰当的时机调用其恰当的方法即可。")]),t._v(" "),s("li",[t._v("注解：注解使得我们能够以将由编译器来测试和验证的格式，存储有关程序的额外信息。注解可以用来生成描述符文件。甚至是新的类定义，并且有助于减轻编写样板代码的负担。\n"),s("ul",[s("li",[t._v("元注解\n"),s("ul",[s("li",[s("code",[t._v("@Target")]),t._v("：配置该注解可以用在什么地方")]),t._v(" "),s("li",[s("code",[t._v("@Retention")]),t._v("：配置该注解在什么级别下被保存")]),t._v(" "),s("li",[s("code",[t._v("@Documented")]),t._v("：将注解包含在"),s("code",[t._v("JavaDoc")]),t._v("中")]),t._v(" "),s("li",[s("code",[t._v("@Inherited")]),t._v("：允许子类继承父类红的注解")]),t._v(" "),s("li",[s("code",[t._v("@Repeatable")]),t._v("：允许同一个地方多次使用同一种注解类型（jdk1.8后加入）")])])]),t._v(" "),s("li",[t._v("注解的使用\n"),s("ol",[s("li",[t._v("定义注解")]),t._v(" "),s("li",[t._v("使用注解")]),t._v(" "),s("li",[t._v("利用反射获取注解信息并做处理")])])])])]),t._v(" "),s("li",[s("code",[t._v("APT")]),t._v("工具："),s("code",[t._v("APT")]),t._v("是"),s("code",[t._v("javac")]),t._v("中提供的一种编译时扫描和处理注解的工具，它会对源代码文件进行检查，并找出其中的注解，然后根据用户自定义的注解处理方法进行额外的处理。"),s("code",[t._v("APT")]),t._v("工具不仅能解析注解，还能根据注解生成其他的源文件，最终将生成的新的源文件与原来的源文件共同编译"),s("code",[t._v("（注意：APT并不能对源文件进行修改操作，只能生成新的文件，例如在已有的类中添加方法）")]),t._v("。\n"),s("ul",[s("li",[s("code",[t._v("APT")]),t._v("项目构建三部分：\n"),s("ul",[s("li",[t._v("注解处理器库(包含我们的注解处理器)")]),t._v(" "),s("li",[t._v("注解声明库(用于存储声明的注解)")]),t._v(" "),s("li",[t._v("实际使用"),s("code",[t._v("APT")]),t._v("的"),s("code",[t._v("Android/Java")]),t._v("项目")])])]),t._v(" "),s("li",[t._v("使用步骤：\n"),s("ol",[s("li",[t._v("注解处理器的声明")]),t._v(" "),s("li",[t._v("注册注解处理器")]),t._v(" "),s("li",[t._v("注解处理器的扫描")]),t._v(" "),s("li",[t._v("文件生成（利用"),s("code",[t._v("JavaPoet")]),t._v("）")])])])])]),t._v(" "),s("li",[s("code",[t._v("Dagger")]),t._v("核心知识点\n"),s("ul",[s("li",[s("code",[t._v("Inject")]),t._v("：标注目标类的依赖和依赖的构造函数")]),t._v(" "),s("li",[s("code",[t._v("Component")]),t._v("：它是一个桥梁，一端是目标类，另一端是目标类所依赖类的实例，它也是注入器（"),s("code",[t._v("Injector")]),t._v("）负责把目标类所依赖类的实例注入到目标类中，同时它也管理"),s("code",[t._v("Module")])]),t._v(" "),s("li",[s("code",[t._v("Module")]),t._v("和"),s("code",[t._v("Provides")]),t._v("：是为解决第三方类库而生的，"),s("code",[t._v("Module")]),t._v("是一个简单工厂模式，"),s("code",[t._v("Module")]),t._v("可以包含创建类实例的方法，这些方法用"),s("code",[t._v("Provides")]),t._v("来标注")]),t._v(" "),s("li",[t._v("总的来说："),s("code",[t._v("Component")]),t._v("相当于注射器，"),s("code",[t._v("Module")]),t._v("是注射液，"),s("code",[t._v("Inject")]),t._v("是被注射体中的目标")])])]),t._v(" "),s("li",[s("code",[t._v("Dagger")]),t._v("的使用：\n"),s("ul",[s("li",[t._v("简单使用\n"),s("ol",[s("li",[t._v("用"),s("code",[t._v("@Inject")]),t._v("标注于构造方法，告诉"),s("code",[t._v("Dagger2")]),t._v("可以实例化这个类")]),t._v(" "),s("li",[t._v("使用注解"),s("code",[t._v("@Component")]),t._v("定义"),s("code",[t._v("注射器")]),t._v("，其中类名、方法名随意，方法参数为被注射类")]),t._v(" "),s("li",[t._v("编译项目，自动生成"),s("code",[t._v("DaggerComponent")]),t._v("类，类名为"),s("code",[t._v("Dagge+我们定义的Component的名字")])]),t._v(" "),s("li",[t._v("在被注射类中调用"),s("code",[t._v("DaggerXXX.create().injectTo(this);")]),t._v(",即"),s("code",[t._v("打针")])]),t._v(" "),s("li",[t._v("在被注射类中直接使用"),s("code",[t._v("注射液")])])])]),t._v(" "),s("li",[t._v("带"),s("code",[t._v("@Module")]),t._v("的使用\n"),s("ol",[s("li",[t._v("用"),s("code",[t._v("@Module")]),t._v("标注"),s("code",[t._v("Module类")]),t._v("，用"),s("code",[t._v("@Provides")]),t._v("标注方法的返回值，即我们需要"),s("code",[t._v("@Inject")]),t._v("的类型")]),t._v(" "),s("li",[t._v("用"),s("code",[t._v("@Component(modules = AModule.class)")]),t._v("指定"),s("code",[t._v("注射器")]),t._v("的"),s("code",[t._v("注射液")])]),t._v(" "),s("li",[t._v("接下来与"),s("code",[t._v("简单使用")]),t._v("的步骤"),s("code",[t._v("3~5")]),t._v("一致")])])]),t._v(" "),s("li",[t._v("通过"),s("code",[t._v("Module")]),t._v("传参（主要用于"),s("code",[t._v("Module")]),t._v("类的构造方法带参且被使用的情况）\n"),s("ol",[s("li",[t._v("用"),s("code",[t._v("@Module")]),t._v("标注"),s("code",[t._v("Module类")]),t._v("，用"),s("code",[t._v("@Provides")]),t._v("标注方法的返回值，即我们需要"),s("code",[t._v("@Inject")]),t._v("的类型。其中方法的返回值可能与"),s("code",[t._v("Module")]),t._v("构造方法的参数有关")]),t._v(" "),s("li",[t._v("用"),s("code",[t._v("@Component(modules = AModule.class)")]),t._v("指定"),s("code",[t._v("注射器")]),t._v("的"),s("code",[t._v("注射液")])]),t._v(" "),s("li",[t._v("编译项目，自动生成"),s("code",[t._v("DaggerComponent")]),t._v("类，类名为"),s("code",[t._v("Dagge+我们定义的Component的名字")])]),t._v(" "),s("li",[t._v("在被注射类中调用"),s("code",[t._v('DaggerXXX.builder().aModule(new AModule("xxx")).build().injectTo(this);')]),t._v(",即"),s("code",[t._v("打针")]),t._v("。"),s("strong",[t._v("注：此时的"),s("code",[t._v("Module")]),t._v("需要手动传入")])]),t._v(" "),s("li",[t._v("在被注射类中直接使用"),s("code",[t._v("注射液")])])])]),t._v(" "),s("li",[t._v("自定义"),s("code",[t._v("Builder")]),t._v("（上述使用的"),s("code",[t._v("Builder")]),t._v("是"),s("code",[t._v("APT")]),t._v("自动生成的，现在来自定义"),s("code",[t._v("Builder")]),t._v("）\n"),s("ol",[s("li",[t._v("与上述的"),s("code",[t._v("1~2")]),t._v("步骤一致")]),t._v(" "),s("li",[t._v("自定义一个接口类，并用"),s("code",[t._v("@Component.Builder")]),t._v("标注。其中有两个方法："),s("strong",[t._v("返回值为本身的方法+返回值为"),s("code",[t._v("XXXComponent")]),t._v("的方法")]),s("br"),t._v("\n例："),s("div",{staticClass:"language-java line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Component")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("modules "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AModule")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("TestComponent")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n \n     "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("injectTo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MainActivity")]),t._v(" mainActivity"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n \n     "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Component.Builder")]),t._v("\n     "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Builder")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n         "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Builder")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("aModule")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AModule")]),t._v(" aModule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n \n         "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("TestComponent")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("build")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n     "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br")])])]),t._v(" "),s("li",[t._v("接下来与上述的"),s("code",[t._v("3~5")]),t._v("一致")])])]),t._v(" "),s("li",[t._v("使用"),s("code",[t._v("@BindsInstance")]),t._v("（为了精简"),s("code",[t._v("Builder")]),t._v("中"),s("code",[t._v("aModule")]),t._v("方法）\n"),s("ol",[s("li",[t._v("改造"),s("code",[t._v("Module")]),t._v("，将构造方法中的参数变为方法的形参")]),t._v(" "),s("li",[t._v("修改"),s("code",[t._v("Component")]),t._v("，将返回值为"),s("code",[t._v("Builder")]),t._v("的方法参数作修改")]),t._v(" "),s("li",[s("code",[t._v("打针")]),t._v("的时候输入的参数作精简\n"),s("strong",[t._v("注：目的是为了在"),s("code",[t._v("打针")]),t._v("的时候不用手动"),s("code",[t._v("new")]),t._v("一个对象，而是直接传入对象所需要的参数值")])])])]),t._v(" "),s("li",[t._v("使用"),s("code",[t._v("dependencies")]),t._v("实现"),s("code",[t._v("Component")]),t._v("依赖"),s("code",[t._v("Component")]),t._v(" "),s("ol",[s("li",[s("code",[t._v("Module")]),t._v("类正常，不改变")]),t._v(" "),s("li",[t._v("父注射器要把注入类返回")]),t._v(" "),s("li",[t._v("子注射器需要依赖父注射器，通过"),s("code",[t._v("dependencies")])]),t._v(" "),s("li",[t._v("子注射器"),s("code",[t._v("打针")]),t._v("的时候需要父注射器的实例")])])]),t._v(" "),s("li",[t._v("使用"),s("code",[t._v("@subComponent")]),t._v("实现"),s("code",[t._v("Component")]),t._v("依赖"),s("code",[t._v("Component")])]),t._v(" "),s("li",[t._v("使用"),s("code",[t._v("@Subcomponent.Builder")]),t._v("实现"),s("code",[t._v("Component")]),t._v("依赖"),s("code",[t._v("Component")])])])]),t._v(" "),s("li",[s("code",[t._v("Dagger2")]),t._v("中常见的注解：\n"),s("ul",[s("li",[s("code",[t._v("@Named")]),t._v("：用于标识不同的初始化路径")]),t._v(" "),s("li",[s("code",[t._v("@Qualifier")])]),t._v(" "),s("li",[s("code",[t._v("@Singleton")]),t._v("：作用域单例（与该"),s("code",[t._v("DaggerComponent")]),t._v("的生命周期一致）")]),t._v(" "),s("li",[s("code",[t._v("@Scope")])]),t._v(" "),s("li",[s("code",[t._v("Provider")]),t._v("：一种工厂模式的容器")]),t._v(" "),s("li",[s("code",[t._v("Lazy")]),t._v("：懒加载容器，只有调用"),s("code",[t._v("get()")]),t._v("的时候才会生成实例，并且实例只有一份")])])])]),t._v(" "),s("h2",{attrs:{id:"share"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#share"}},[t._v("#")]),t._v(" Share")]),t._v(" "),s("p",[t._v("暂无内容")])])}),[],!1,null,null,null);s.default=e.exports}}]);