# 整理 git
> Git是一款免费、开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。

------------------------------------------------------------------------------

## 初始化仓库
``` bash
$ git init
```

## 查看远程仓库
``` bash
$ git remote -v
```

## 关联远程仓库
``` bash
$ git remote remove origin # 删除关联
$ git remote add origin git@github.com:oudeqi/my-docs.git
```

## 查看变化
``` bash
$ git status
```

## 提交修改
``` bash
$ git add .
$ git commit -m "注释"
```

## 推送分支
``` bash
$ git push origin master
```

## 拉取分支
``` bash
$ git pull origin master
```

## 查看分支
``` bash
$ git branch # 查看本地分支
$ git branch -r # 查看远程分支
$ git branch -a # 查看所有分支（远程、本地）
# 查看本地远程分支记录，是用红色的字表示的。实际上是曾经的远程分支，当前可能已经被删掉
```

## 创建分支
``` bash
$ git branch dev
```

## 切换到分支
``` bash
$ git checkout dev
```

## 创建分支，并切换到该分支
``` bash
$ git checkout -b dev # 建新的分支,并切换到该分支
```

## 删除分支
``` bash
$ git branch -d dev # 删除本地分支
$ git push origin -d dev # 删除远程分支
```

## 将其他分支合并到当前分支
``` bash
$ git checkout master # 切换到主分支
$ git merge dev # 将dev合并到主分支
```

## 同步远程所有分支
``` bash
$ git fetch # 将某个远程主机的更新，全部取回本地
```

## git 撤销，放弃本地修改，放弃已提交修改
``` bash

# 还没有加入到缓存区（未使用 git add 缓存代码）
# 内容修改会被删除。但是此命令不会删除掉刚新建的文件。
# 因为刚新建的文件还没已有加入到 git 的管理系统中。
# 所以对于git是未知的。自己手动删除就好了
git checkout . # 放弃所有文件修改
git checkout -- readme.md # 放弃readme的修改

# 已经加入到本地缓存区（已经使用了 git add 缓存代码）
git reset HEAD . # 放弃所有的缓存
git reset HEAD readme.md # 放弃readme的缓存

# 已经用 git commit 提交了代码
git reset HEAD~
git reset --hard HEAD^ # 回退到上一次commit的状态
```

------------------------------------------------------------------------------

# 本地有新分支，远程仓库没有
``` bash
$ git push origin master # 将本地分支推送到远程仓库即可
```

# 远程仓库有新分支，本地没有
``` bash
$ git branch # 查看本地分支
$ git branch -r # 查看远程分支

# 发现本地没有某个远程分支，原因是现在本地上的分支，是克隆仓库时当时的远程分支记录

$ git fetch # 将某个远程主机的更新，全部取回本地
$ git branch -a # 查看远程和本地的分支，已经可以看到本地没有的分支
$ git checkout test # 如果是直接克隆整个仓库，可以直接切换到分支。因为克隆时候已经有远程所有的分支记录。

# 但若之前已经克隆过，后来其他电脑新push一个分支，此时是无法切换到新分支的。需要用到以下命令
$ git checkout -b test origin/test # 拉取远程分支到本地，原理是在本地新建一个分支和远程分支关联起来
```

# 本地删除了分支，远程也想删除
``` bash
$ git branch -d test # 删除本地分支
$ git push origin -d test # 删除远程分支
$ git branch -a # 发现本地、远程分支已经不存在了

# 或者
$ git branch -d test # 先删除本地分支
# 然后直接到gitlab/github进行删除

```

# 只想删除远程分支，本地分支保留
``` bash
$ git push origin -d test
# 或者直接到gitlab/github进行删除
```

# 远程删除了分支，本地也想删除
1. 本地使用`git branch -a`查看远程分支，实际上是曾经的远程分支，叫做本地远程分支。
2. 假如直接到gitlab/github删除了某个分支，发现本地远程分支依然存在，并且可以切换到对应的本地分支使用。
3. 我想删除本地远程分支记录。
``` bash
$ git branch -a # 查看远程分支，红色的是本地远程分支记录
$ git remote show origin # 查看远程分支和本地分支的对应关系，会看到远程分支已经不存在
$ git remote prune origin # 删除远程已经删除过的分支
$ git branch -a # 验证结果，可以看到本地远程分支记录已经没有了被删除的远程分支

```

------------------------------------------------------------------------------

## 关于SSH
> SSH协议，可以连接和验证远程服务器和服务。使用SSH密钥，可以连接到GitHub，而无需在每次访问时提供用户名或密码。

## 检测是否生成过 SSH key
``` bash
$ cd ~/.ssh
// 如果返回 No such file or directory 说明没有生成过，否则说明之前已经生成过
```

## 查看 SSH key
``` bash
$ ls -al ~/.ssh
// 应该会得到 id_rsa 和 id_rsa.pub两个文件，默认情况下公钥的文件名是id_rsa.pub
```

## 生成新的SSH key
``` bash
$ ssh-keygen -t rsa -C "496997374@qq.com"
```

## 找到文件所生成的地方
``` bash
$ ~/.ssh
```
会得到 `bash: /c/Users/49699/.ssh: Is a directory`  

1. `cd ~/.ssh` 然后 `ls`，或者手动打开文件资源管理器
2. id_rsa.pub 文件里存放的就是要使用的key
3. 打开后ctrl+A 全选，复制key到github的里面settings里面

## 测试是否配置成功
``` bash
$ ssh -T git@github.com
```
## 配置成功标志
``` bash
Hi oudeqi! You've successfully authenticated,but Gitub does not provide shell access 
```

------------------------------------------------------------------------------

## 配置账户
``` bash
$ git config --global user.name "your_username"  //设置用户名
$ git config --global user.email "your_registered_github_Email"  //设置邮箱地址
```