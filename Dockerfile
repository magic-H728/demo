FROM nginx #拉取nginx镜像
COPY ./dist/ /usr/share/nginx/html/  #将dist目录下内容拷贝到容器中的/usr/share/nginx/html/目录
COPY nginx.conf /etc/nginx/nginx.conf  #将nginx.conf配置文件拷贝到容器中