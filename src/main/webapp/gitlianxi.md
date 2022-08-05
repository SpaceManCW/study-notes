### 合并分支
master 改动 改动

practice-space改动

回退测试

### 打印日志
git log
简介版本 git log --pretty=oneline

### 版本回退
回到上一个版本 git reset --hard HEAD^
去到指定版本，也可以回复 git reset --hard 版本号
如果已经推到远程仓库，本地版本回退将无法Push，因为本地版本落后
可以使用git push -f强制推到远程仓库

这样的话其他所有人都要用远程master覆盖本地master，当然还有更好的回退方式

git revert -n 要重做的版本号   使用这个命令可以只撤销指定版本的提交，注意是提交，使用这个方法
回滚后会有冲突，解决下即可

### 记录每一次命令
窗口关闭但是想回到指定版本可以使用这个命令查看所有命令记录  git reflog

### 删除分支
// 删除本地分支
git branch -d 分支名

// 删除远程分支
git push origin --delete 分支名

### 查看分支合并图
git log --graph

### 分支管理策略
通常，合并分支时，如果可能，Git会用Fast forward模式，但这种模式下，删除分支后，会丢掉分支信息。
如果要强制禁用Fast forward模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。

