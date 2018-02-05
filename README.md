# youngdro
筹备中的个人网站，基于使用next.js的react服务端渲染框架，three.js操手实践。

实现了以下功能：
- [x] webpack，包括开发环境下的热更新等功能，以及部署环境下的打包功能
- [x] babelrc配置
- [x] 支持scss
- [x] 支持next-router
- [x] 支持redux
- [x] 支持图片格式文件
- [x] 支持axios
- [x] 支持gzip

**1、 安装依赖包**
```text
npm install
```

**2、运行项目**
有3个可执行命令，作用都不相同。

在开发环境下，执行：
```text
npm run dev
```
在生产环境下，执行：
```text
npm run build //先打包

npm start //最后运行，你也可以增加pm2的配置
```
