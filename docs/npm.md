# 整理 npm
> NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题

-----------------------------------------------------------

## 初始化项目
``` bash
$ npm init -y
```

## 全局安装cnpm
``` bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

# 删除全局
``` bash
npm rm --global gulp
npm uninstall --global gulp
```
## 将mongodb安装为windows服务并开启的命令：
``` bash
$ mongod -dbpath d:mongodb/data -logpath d:/mongodb/log/mongo.log -logappend -install -serviceName "MongoDB"
$ net start MongoDB

```

>总结：mongoDB无需安装，只需要创造服务器的启动环境即可：需要的是bin文件夹(存放的是mongoDB的一些命令)、指定数据库的位置和日志位置、建立一个日志文件。有了这些，mongoDB服务器端就可以启动了。

mongoDB服务器启动后，就可以通过mongoDB客户端操作数据库了。mongoDB客户端包括：

         1. shell控制台

         2. java、php等驱动程序

         3. mongoVUE是一个可视化工具，相当于我们熟悉的plSql，不过也可以执行对数据库的操作   

  通过shell客户端，我们可以很方便的练习mongoDB的curd操作，不过，在开发中，还是通过相应的驱动程序由编程语言来操作。
