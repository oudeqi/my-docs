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

## 拉取远程资源
``` bash
$ git pull origin master
```

## 上传到远程仓库
``` bash
$ git push origin master
```

## 查看远程分支
``` bash
$ git branch -a 
```

## 查看本地分支
``` bash
$ git branch 
```

## 创建分支
``` bash
$ git branch dev
```

## 把分支推到远程分支
``` bash
$ git push origin dev
```

## 切换到分支
``` bash
$ git checkout dev
```

## 删除本地分支
``` bash
$ git branch -d dev
```

## 查看远端库的分支情况
``` bash
$ git branch -r
```

## 建新的分支,并切换到该分支
``` bash
$ git checkout -b dev
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