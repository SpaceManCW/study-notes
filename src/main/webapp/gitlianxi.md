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
<!-- 如果已经推到远程仓库，本地版本回退将无法Push，因为本地版本落后
可以使用git push -f强制推到远程仓库 -->

### 记录每一次命令
窗口关闭但是想回到指定版本可以使用这个命令查看所有命令记录  git reflog

如果已经推到远程仓库，本地版本回退将无法Push，因为本地版本落后
可以使用git push -f强制推到远程仓库

如果已经推到远程仓库，本地版本回退将无法Push，因为本地版本落后
可以使用git push -f强制推到远程仓库