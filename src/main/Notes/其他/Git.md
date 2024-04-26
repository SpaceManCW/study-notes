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

//没有合并过的分支无法删除，要删除的话
git branch -D 分支名

### 查看分支合并图
git log --graph

### 分支管理策略
通常，合并分支时，如果可能，Git会用Fast forward模式，但这种模式下，删除分支后，会丢掉分支信息。
如果要强制禁用Fast forward模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。

合并分支时，加上--no-ff参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并。
先切换到master分支然后执行    git merge --no-ff 自己的分支名

### 保存工作现场
当自己的分支有很多修改或者暂存区有很多未commit的修改时，不可以切换到其他分支，这种情况
可以用 git stash 命令将本地的修改隐藏起来，隐藏之后就可以切换分支了。
做完工作之后回到自己的分支想要找回之前隐藏的修改，可以先执行 git stash list 查看隐藏的内容然后
git stash pop    执行这条命令恢复隐藏的信息

### 将master分支的修改复制到自己的分支
git cherry-pick 需要复制的提交号

### 测试
### 拉取远程分支到本地
git checkout -b dev origin/dev  

## 上线合并流程
//更新本地master
git checkout master 
git pull 

//将master合并到自己分支
git checkout 自己的分支名
git merge master

//切换到上线分支
git checkout 上线分支
git pull

//将自己分支合并到上线分支
git merge 自己分支 --squash

//统一提交
git add .
git commit -m 'feat: 需求名称'
git push