# Docker Node MongoDB TypeScript Example
Use MongoDB with Docker to create Node service with TypeScript.

使用Docker、MongoDB和TypeScript构建Node服务，简化开发设置。

## Quick Start

### Use MongoDB with Docker

```bash
# Run in Docker
docker-compose up
# use -d flag to run in background

# Tear down
docker-compose down

# To re-build
docker-compose build
```

### Install
```bash
npm install
```

### Develop
```bash
npm run dev

# Visit in localhost
http://localhost:3000/
```

### Debug
Support for debugging Node services using VS Code.
支持使用VS Code调试Node服务。
```bash
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Server",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "program": "${workspaceFolder}/src/server.ts",
      "preLaunchTask": "npm: debug",
      "outFiles": [
        "${workspaceFolder}/dist/**/*.js"
      ]
    }
  ]
}
```

### Build
```bash
npm run build
```

### Deploy
```bash
npm run deploy
```

### Docker
#### 构建Docker镜像
进入到 Dockerfile 所在的那个目录中，运行以下命令构建 Docker 镜像。开关符 -t 让你标记你的镜像，以至于让你以后很容易地用 `docker image ls` 找到它。

```bash
docker build -t <your username>/<app name> .
```

构建好后使用`docker image ls`查看镜像列表。

#### 运行Docker镜像
```bash
docker run -p 8080:3000 -d <your username>/<app name>
```