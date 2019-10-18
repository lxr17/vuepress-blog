# Git学习笔记
## Git配置命令
```bash
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```
设置全局的名称和Email地址。

## 初始化Git仓库
```bash
git init
```
初始化一个Git仓库。

## 添加文件到Git仓库
```bash
git add <file>
```
将文件添加到Git仓库，可重复执行，并且也可以直接将`<file>`替换成`.`来将所有修改文件添加到Git仓库。

## 提交文件到Git仓库
```bash
git commit -m <message>
```
提交已添加的文件，其中`<message>`为提交日志信息。

## 掌握工作区的状态
```bash
git status
```
查看仓库当前的状态。

## 查看修改内容
```bash
git diff
```
查看文件的修改内容。

## 查看日志信息
```bash
git log --pretty=oneline
```
查看提交日志记录。

## 版本回退
```bash
git reset --hard HEAD^
```
回退到上一个版本。其中`HEAD`代表当前版本，`HEAD^`代表上一个版本，`HEAD^^`代表上两个版本，`HEAD~100`代表上100个版本。

----
```bash
git reset --hard commit_id
```
回退到指定提交id所对应的版本，其中`commit_id`不需要写全。

## 查看命令历史
```bash
git reflog
```
查看你执行过的每一次命令

## 暂存区的概念
通过`git add`命令将文件放入暂存区，通过`git commit -m "xxx"`把文件放入当前分支，此时暂存区就没东西了。

一般的工作过程都是如此，工作区→暂存区→当前分支。

## 撤销修改
```bash
git checkout -- <file>
```
撤销工作区的修改。总之就是让文件回到上一次`commit`或者`add`时的状态。

----
```bash
git reset HEAD <file>
```
撤销暂存区的修改。

## 删除文件
```bash
git rm <file>
```
将版本库中的文件删除。如果先将工作区的文件手动删除了，那么和`add`命令一致。

## 远程仓库
```bash
ssh-keygen -t rsa -C "youremail@example.com"
```
创建自己的SSH key，一般存在于用户主目录的`.ssh`文件夹中，里面有`id_rsa`和`id_rsa.pub`两个文件，这两个就是SSH Key的秘钥对，`id_rsa`是私钥，不能泄露出去，`id_rsa.pub`是公钥，可以放心地告诉任何人。

创建完自己的SSH key之后，就可以在GitHub、码云之类的远程仓库平台上添加上你的公钥，然后你就可以在该机器上进行推送了。

----
```bash
git remote add origin git@github.com:lxr17/learngit.git
```
将本地仓库与远程仓库相关联，其中`origin`为远程仓库的名字，也可以改成其他名字。

## 推送至远程库
```bash
git push -u origin master
```
把本地库`master`分支的内容推送到远程库`origin`，`-u`命令会把本地`master`分支和`origin`远程仓库的`master`分支关联起来，之后可以简化命令。

----
```bash
git push origin master
```
把本地库`master`分支的内容推送到远程库`origin`的`master`分支上。

## 仓库克隆
```bash
git clone git@github.com:lxr17/learngit.git
```
从远程克隆一个仓库到本地。

## 创建分支
```bash
git checkout -b dev
```
创建一条`dev`分支并切换到`dev`分支上，其中`-b`表示创建并切换。

----
```bash
git branch dev
```
创建一条`dev`分支。
```bash
git checkout dev
```
切换到`dev`分支上。

## 查看当前分支
```bash
git branch
```
查看当前分支。

## 合并分支
```bash
git merge dev
```
将`dev`分支合并到当前分支上。

`Fast-forward`的意思是表示此次合并为“快进模式”，也就是直接把`master`分支指向`dev`的当前提交，所以合并速度非常快。

当git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。

解决冲突就是把git合并失败的文件手动编辑为我们希望的内容，再提交。

## 删除分支
```bash
git branch -d dev
```
删除`dev`分支。

## 查看分支合并图
```bash
git log --graph
```

## Fast-forward模式
`Fast forward`模式在删除分之后会丢掉分支信息。如果要强制禁用`Fast-forward`模式，Git就会在`merge`时生成一个新的`commit`，这样，从分支历史上就可以看出分支信息。

----
```bash
git merge --no-ff -m "message" dev
```
禁用`Fast forward`模式下的合并分支，将`dev`分支合并到当前分支，由于会创建一次新的`commit`，所以要加上`-m`参数。

合并分支时，加上`--no-ff`参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而`Fast forward`合并就看不出来曾经做过合并。

## 储藏
```bash
git stash
```
可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作。

----
```bash
git stash list
```
可以获取到“储藏”的工作现场。

----
```bash
git stash apply
```
用于恢复工作现场。

----
```bash
git stash drop
```
用于删除stash内容。

----
```bash
git stash pop
```
用于恢复工作现场的同时删除stash内容。

----
```bash
git stash apply stash@{0}
```
恢复至指定的`stash`。

## 强制删除分支
```bash
git branch -D dev
```
强制删除`dev`分支，用于丢弃一个没有被合并过的分支。

## 查看远程库信息
```bash
git remote -v
```
查看远程库详细信息。

----
```bash
git remote
```
查看远程库信息。

## 推送分支
```bash
git push origin dev
```
将本地的`dev`分支推送到远程库`origin`上。

当从远程库`clone`时，默认情况下会将本地的`master`分支与远程的`master`分支相关联。

## 创建分支并关联
```bash
git checkout -b dev origin/dev
```
创建一个本地分支`dev`，并与远程库`origin`的`dev`分支相关联。

## 将本地分支与远程分支相关联
```bash
git branch --set-upstream-to=origin/dev dev
```
将本地分支`dev`与远程库`origin`的`dev`分支相关联。

## 变基
```bash
git rebase
```
把本地未`push`的分叉提交历史整理成直线。<span style="color: #ff0000;">（不是很明白）</span>

## 标签
就是一个让人容易记住的有意义的名字，它跟某个`commit`绑在一起。

## 创建标签
```bash
git tag v1.0
```
在最新提交的`commit`上打标签。

----
```bash
git tag v0.9 f52cb63
```
给某次commit打标签。

----
```bash
git tag -a v0.1 -m "version 0.1 released" 1094adb
```
创建带有说明的标签。

## 查看标签
```bash
git tag
```
查看所有标签。

----
```bash
git show v0.9
```
查看标签的详细信息。

## 删除标签
```bash
git tag -d v0.1
```
用于删除某个标签。

## 推送标签
```bash
git push origin v1.0
```
将标签推送到远程库。

----
```bash
git push origin --tags
```
将本地所有标签推送到远程库。

## 删除远程标签
```bash
git push origin :refs/tags/v0.9
```
用于删除一个远程标签。

## 忽略特殊文件
在Git工作区的根目录下创建一个特殊的`.gitignore`文件，然后把要忽略的文件名填进去，Git就会自动忽略这些文件。

检验`.gitignore`的标准是`git status`命令是不是说`working directory clean`。

## 配置别名
```bash
git config --global alias.st status
```
告诉Git，以后用`st`代替`status`。


