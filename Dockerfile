# Select node version | 选择Node版本号
FROM node:latest

# Create app directory | 在镜像中创建一个文件夹存放应用程序代码，这将是当前应用程序的工作目录
WORKDIR /usr/src/app

# Install app dependencies | 安装项目依赖
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source | 在 Docker 镜像中使用 COPY 命令绑定你的应用程序
COPY . .

EXPOSE 3000

CMD ["npm", "run", "deploy"]