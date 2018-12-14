# vuepress
webpack4 + express + vue2 + pug + stylus

## 使用说明
### 安装
git clone https://github.com/WalleWawo/vuepress.git
cd vuepress
yarn install

### 使用
dev 开发环境
build 打包，部分大模块采用dllPlugin打包，这些模块修改后需要先运行build:dll
build:dll dll打包,大模块采用dllPlugin打包
analysis 分析模式
start 生产环境

### 配置说明
#### 按需加载配置文件
项目会按照process.env.DEPLOY_ENV的参数加载对应的`config/config.${process.env.DEPLOY_ENV}.js`文件
config/config.${process.env.DEPLOY_ENV}.js文件中配置的route对象可以修改当前项目的端口号(port)和二级目录(prefix)
process.env.DEPLOY_ENV的默认值为default，也就是默认加载config/config.default.js文件
--deploy可以修改process.env.DEPLOY_ENV的值

#### 打包优化
DllPlugin，对应的配置文件为build/webpack.dll.config.js
happypack,多线程打包
