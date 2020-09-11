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
npm start

# Visit in localhost
http://localhost:3000/
```

### Debu
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