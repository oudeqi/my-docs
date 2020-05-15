# 什么是`Nginx`?
是一种web服务器软件

# `Nginx`的功能
1. 高性能的HTTP服务器，发布网站
2. 反向代理服务器，负载均衡的功能，减少服务器压力
3. 作为邮件服务器实现收发邮件功能

# `Nginx`的优点
1. 轻量级
2. 高并发
3. 跨平台
4. 内存消耗少

# 如何在`Linux`系统中搭建`Nginx`服务器
1. 去官网下载安装包
2. 进入到下载目录，解压`tar -zxvf nginx-1.8.0.tar.gz`
3. 进入解压后的文件夹，执行`./configure`，发生错误1。
4. 解决错误1后，再次进入解压后的文件夹，执行`./configure`，发生错误2。
5. 解决错误2后，再次进入解压后的文件夹，执行`./configure`，发生错误3。
6. 解决错误3后，再次进入解压后的文件夹，执行`./configure`，顺利完成后，执行`make`。
7. `make` 完成以后，执行`make install`，进行Nginx安装。
8. 进入`cd /usr/local`，如果该目录下面有`nginx`文件夹，则说明`nginx`安装成功
``` bash
==============================================
# 错误1
./configure error: C compiler cc is not found

cd / # 回到根目录
su # 进入管理员权限
yum -y install gcc gcc-c++ autoconf automake # 安装 gcc gcc-c++

==============================================
# 错误2
./configure error: the HTTP rewrite module requires the PCRE library

su # 进入管理员权限
yum -y install pcre pcre-devel # 在解压后的文件夹里安装PCRE库

==============================================
# 错误3
./configure error: the HTTP gzip module requires the zlib library

su # 进入管理员权限
yum -y install zlib zlib-devel # 在解压后的文件夹里安装zlib库

==============================================

# 进入安装目录`cd /usr/local/nginx`，有四个文件夹：

# conf 存放各种nginx的配置文件
# html 存放网页程序
# logs 存放日志文件
# sbin 存放nginx的可执行文件
```

# 操作系统的选择
适合`nginx`服务器的操作系统是`Linux`，实测在`Linux`操作系统上使用`nginx`服务器比在window上使用效率更高。

# 查看`nginx`的进程号
``` bash
# 可以看到主进程号，和工作进程号
ps -ef|grep nginx
```

# `nginx`的启动
``` bash
# nginx可执行文件路径 -c nginx配置文件路径
/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
```

# `nginx`的停止
``` bash

# 从容停止
kill -QUIT nginx主进程号

# 快速停止
kill -TERM nginx主进程号
# 或者
kill -INT nginx主进程号

# 强制停止-即使因为某些情况不能停止，也要强制停止
pkill -9 nginx

```

# `nginx`的重启
当修改了`nginx`的配置文件，想让配置文件生效，就需要进行重启
``` bash

# 验证配置文件的正确性
cd /usr/local/nginx/sbin
./nginx -t
# 或者： nginx可执行文件路径 -t -c nginx配置文件路径
/usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf

# 重启nginx
cd /usr/local/nginx/sbin
./nginx -s reload
# 或者： kill -HUP nginx主进程号

```

# `nginx`的常见信号控制命令
1. HUP：重启
2. QUIT：从容关闭
3. INT：从容关闭
4. TERM：快读关闭
5. USR1：切换日志文件
6. USR2：平滑升级执行进程，在不影响旧进程运行的情况下，来升级新进程。
7. WINCH：从容关闭工作进程，关闭work进程，服务器就不能处理请求
``` bash
# 对主进程的日志文件进行切割
kill -USR1 nginx主进程号

# 平滑升级执行进程
kill -USR2 nginx主进程号

# 从容关闭对应的工作进程
kill -WINCH nginx主进程号
```

# 切换日志文件，切割日志文件

# `nginx`的平滑升级
1. 不会停掉正在运行中的进程，这些进程会继续处理请求，但是不会接受新的请求。
2. 老进程在处理完毕正在处理的请求之后就会停止。
3. 新开的进程处理新的请求。
4. 相对于强制升级来说，强制升级会停掉正在运行的进程。
``` bash
# 查看nginx版本
cd /usr/local/nginx/sbin
./nginx -V # nginx version: nginx/1.8.0

# 备份老版本可执行文件
cd /usr/local/nginx/sbin
cp nginx nginx.old # 权限不够要进入root模式

# 去官网下载 nginx-1.9.2
# 解压下载的压缩文件
tar -zxvf nginx-1.9.2.tar.gz

# 进入解压后的目录
cd nginx-1.9.2
./configure # 等待完成
make # 等待完成

# 复制新版本的nginx可执行文件到老版本的可执行文件的文件夹下
cp -rfp objs/nginx /usr/local/nginx/sbin

# 验证是否平滑升级成功
cd /usr/local/nginx/sbin
./nginx -V # nginx version: nginx/1.9.2

# 删除新版本的压缩文件，以及新版本的解压文件
rm -f nginx-1.9.2.tar.gz
rm -rf nginx-1.9.2/

```

# `nginx`配置文件总览
``` bash
# ======================================
# cd /usr/local/nginx/conf
# vi nginx.conf
# ======================================

#设置能够使用这个nginx的用户，nobody是一个低权限的用户，设置该选项可以让系统更安全
#user  nobody;

#工作衍生进程数，不可缺少的选项，最佳值为cpu的核数，或者cpu核数的两倍
worker_processes  1;

#设置错误文件存放路径
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#设置pid存放路径（pid是控制系统中重要文件）
#pid        logs/nginx.pid;

#设置最大并发连接数
events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #开启gzip压缩
    #gzip  on;

    server {
        listen       80;
        server_name  localhost;
        #设置字符
        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
}
```

# `nginx`配置文件的大致包含的部分
``` bash

worker_processes  1;

events {
  worker_connections  1024;
}

http {
  server {

  }
  server {
    
  }
  ...
}
```

# `nginx`虚拟主机的配置
1. 为了让一台服务器能够供更多用户使用，将一个服务器从软件上分成多个子服务器，把每一个子服务器叫做虚拟主机。
2. 这些虚拟主机是根据虚拟化技术分出来的，每个虚拟主机是相互独立的，可以独立为被用户使用。
3. nginx中配置虚拟主机的步骤：一是配置分设备IP地址，二是绑定分设备IP地址与虚拟主机。  

配置分设备IP地址
``` bash
# 查看网卡现有IP地址信息 网卡eth0、网卡lo
ifconfig

# 配置网卡(eth0)IP地址
# ifconfig 网卡名 指定的IP netmask 子网掩码
# 权限不够，进入超级管理员模式： su
ifconfig eth0 192.169.1.9 netmask 255.255.255.0

# 查看刚刚配置的IP地址是否生效
# 网卡eth0 对应的IP已经变成了192.169.1.9
ifconfig

# 从eth0，分出第一个分设备（eth0:1）并且配置IP地址
# ifconfig 网卡:分设备 指定的IP broadcast 网卡broadcast netmask 网卡子网掩码
ifconfig eth0:1 192.169.1.7 broadcast 192.168.1.255 netmask 255.255.255.0 

# 从eth0，分出第二个分设备（eth0:2）并且配置IP地址
# ifconfig 网卡:分设备 指定的IP broadcast 网卡broadcast netmask 网卡子网掩码
ifconfig eth0:2 192.169.1.17 broadcast 192.168.1.255 netmask 255.255.255.0 

# 查看分设备IP地址是否生效
ifconfig
# eth0 192.169.1.9
# eth0:1 192.169.1.7
# eth0:2 192.169.1.17
# lo
```

绑定分设备IP与虚拟主机，最好不要在nginx自带的配置文件里面配置，而是新建一个配置文件，然后加载这个配置文件
``` bash
# 打开配置文件夹
cd /usr/local/nginx/conf 

# 新建一个配置文件
touch xnzj.conf

# 编辑这个配置文件
# vi xnzj.conf

user  nobody;
worker_processes  4;
events {
  worker_connections  1024;
}
http {
  server {
    listen 192.168.1.7:80; #服务器监听的IP端口
    server_name 192.168.1.7; #给虚拟主机取名
    #日志文件存放位置，combined代表日志文件默认格式
    access_log log/server1.access.log combined; 
    location / 
    { #定义虚拟主机的目录
      root html/server1 #定义根目录
      index index.html index.htm #定义默认首页
    }
  }
  server {
    listen 192.168.1.17:80;
    server_name 192.168.1.17;
    access_log log/server2.access.log combined; 
    location / 
    {
      root html/server2
      index index.html index.htm
    }
  }
}

# 保存
按Esc键
:wq!

# 新建虚拟主机根目录
cd /usr/local/nginx/html
mkdir server1
mkdir server2

# 新建虚拟主机首页
cd /usr/local/nginx/html/server1
touch index.html
cd /usr/local/nginx/html/server2
touch index.html

# 使用新配置文件启动nginx
/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/xnzj.conf

# 虚拟主机除了可以通过IP地址来访问，还可以使用指定的域名来访问
# 指定域名之前，需要在nginx上进行dns的配置
http {
  server {
    listen www.xxx.com; #服务器监听的IP端口
    server_name www.xxx.com; #给虚拟主机取名
    #日志文件存放位置，combined代表日志文件默认格式
    access_log log/server1.access.log combined; 
    location / 
    { #定义虚拟主机的目录
      root html/server1 #定义根目录
      index index.html index.htm #定义默认首页
    }
  }
}
```

# `nginx`日志文件的配置
1. `nginx`服务器在运行的时候，会有各种操作这些关键的操作信息会记录到文件中，这些文件叫做日志文件。
2. `nginx`的日志文件是有格式的，可以用系统默认的格式去记录，也可以自定义日志文件格式。
3. 可以使用`log_format`指令来设置`nginx`服务器日志文件的记录格式。

## `nginx`日志文件格式的配置
``` bash
# 日志文件的配置就在nginx的主配置文件里
cd /usr/local/nginx/conf
vi nginx.conf

# 默认配置
# $remote_addr 客户端的IP地址
# $remote_user 客户端的用户名
# $request 客户端请求的URL
# $status 请求状态
# $body_bytes_send 发送给客户端的子字节数
# $http_referer 客户端请求的原网页地址（从哪里访问过来的）
# $http_user_agent 客户端浏览器信息
# $http_x_forwarded_for 客户端的IP地址，和$remote_addr差不多
http {
  log_format combined '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_send "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
}
```


## `nginx`日志文件存储路径的配置
``` bash
http {
  log_format combined '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_send "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
  #access_log off; # 关闭日志，不记录日志
  access_log logs/access.log  main; 
  # 日志的存储路径从 nginx 的安装目录开始，nginx从0.7.4版本开始，日志的存储地址可以通过变量来表示
}
```

## `nginx`日志文件的切割（定期切割：按天）

为了使`nginx`日志文件的存储更加合理有序需要将日志文件进行切割存储，可以按时间来切割

``` bash
# =====================================
# 手动切割

# 进入日志文件存储目录
cd /usr/local/nginx/logs 

# 旧的日志文件从access.log种分离出来，新的日志文件继续存在于access.log中
mv access.log 20191231.log # 权限不够请进入root模式： su
ls # 发现 access.log 变成了 20191231.log 

# 新开一个配置文件
ps -ef|grep nginx # 查看nginx运行进程号
kill -USR1 nginx运行主进程号

# =====================================
# 自动切割
# 把切割文件的操作代码写入批处理文件中，每天定时执行这个批处理文件

# 新建批处理文件
cd /usr/local/nginx/logs 
touch cutlog.sh
vi cutlog.sh

#定时执行批处理文件
crontab -e # 以文件的形式编辑定时执行的命令
23 59 *** /bin/bash /usr/local/nginx/logs/cutlog.sh 
# 每天的23点59分定时执行批处理文件
```

`cutlog.sh` 内容
``` bash
D=$(date +%Y%m%d)
mv /usr/local/nginx/logs/access.log $(D).log
kill -USR1 $(cat /usr/local/nginx/nginx.pid)
```


# `nginx`的缓存配置，以及其他配置
## `nginx`的缓存配置详解
1. 浏览网页的时候浏览器通常会吧某些不会改变的资源（比如图片）存在本地
2. 下次浏览网页的时候，这个网页上的这个资源就会从本地加载，这样打开网页的速度就会快很多。
3. 存在本地的这些资源，叫做缓存，为了避免缓存过大，或者资源已经过期，所以需要定时清理缓存。
4. `nginx`中，缓存是可以配置的。
``` bash
# 缓存配置就在nginx的主配置文件里
cd /usr/local/nginx/conf
vi nginx.conf

http {
  server {
    listen www.xxx.com; #服务器监听的IP端口
    server_name www.xxx.com; #给虚拟主机取名
    access_log log/server1.access.log combined; 
    location / {
      root html/server1 #定义根目录
      index index.html index.htm #定义默认首页
    }
    location ~.*\.(jpg|png|swf|gif)$ {
      expires 30d; # 30天自动清除缓存文件
    }
    location ~.*\.(css|js)$ {
      expires 1h; # 1小时过期
    }
  }
}
```

## `nginx`的其他配置-压缩功能配置

通过`gzip`压缩技术可以使原来网页内容大小压缩成原来的 30%，或者更小。用户在访问网页的时候，由于传输数据很小，故访问速度会快很多。`nginx`服务器支持`gzip`，但是默认关闭，需要配置才能开启。

``` bash
cd /usr/local/nginx/conf
vi nginx.conf

http {
  gzip on; # 设置为off，或者注释掉这行，都会关闭 gzip
  gzip_min_lenth 1k; # 小于多大的文件不使用gzip压缩，推荐1k
  # gzip压缩后的结果是存在于内存中的，此项设置为gzip压缩申请的内存资源，推荐为4个16k数据流
  gzip_buffers 4 16k; 
  # 设置使用gzip压缩的http协议版本，推荐http1.1，不是http1.1就不使用gzip压缩
  gzip_http_version 1.1; 
  # gzip压缩需要双向支持，除了服务端，浏览器端也要支持，gzip才能生效
  # 开启判断客户端浏览器是否支持gzip，如果结果是客户端不支持gzip，那么服务端也不会使用gzip处理
  gzip_vary on;
}
```

## `nginx`的其他配置-自动列目录配置
服务端某一文件夹下没有`index.html`之类的默认首页，但是有其他html文件，在服务端配置好自动列目录功能后，客户端访问这个文件夹时，可以看到该文件夹下面所有文件的一个列表。实现自动列目录需要两个条件：
1. 访问的文件夹下没有`index.html`之类的默认首页文件。
2. 服务器配置了自动列目录的功能。

``` bash
# 删除默认的首页文件
cd /usr/local/nginx/html
rm -f index.html 

# 访问 127.0.0.1，访问不到首页资源，403 forbidden
# 配置自动列目录
vi /usr/local/nginx/conf/nginx.conf 
server {
  listen       80;
  server_name  localhost;
  location / {
    root   html;
    index  index.html index.htm;
    autoindex on; # 开启自动列目录
  }
}

# 保存退出
:wq!

# 从新加载配置文件
/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf

# 访问 127.0.0.1
# 可以看到 /usr/local/nginx/html 文件夹下所有资源
```

