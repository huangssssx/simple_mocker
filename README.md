# simple_mocker
## 1.前言 
>最近在总结自己的知识结构所以需要编写一系列的项目来检查，这个过程中我发现mock数据的编写是个耗时耗力而且重复的工作，强迫症不能忍所以写了一个图形化的mocker用于管理自己的项目mock。

## 2.如何使用：
本项目仅提供源码，最终执行程序需要执行
- npm i
- npm run build:win32进行编译后在/build/mocker-win32-x64中获取
- 当然你可能只想看看效果那么执行：npm run dev

## 3.创建mock步骤描述
在项目中我基本将使用方式用tip的形式进行了描述，但是为了清晰我还是在这里总结一下：
1. 建立项目：由于mock数据是隶属于某个项目下的，所以你必须先创建个项目,在首页点击增加按钮即可进入【增加项目】界面。在此填写项目名称和项目描述即可。

2. 创建mock：在列表中点击刚创建的项目名称或者右侧的列表图标即可进入【项目mock列表】，点击【增加】按钮进入【增加项目Mock】页面，填写【路径名】【描述信息】以及【mock内容】即可增加一条新mock，注意：路径名即是你的访问地址，比如：你的项目名为"demo",路径为"examplePath",那么最终你的mock地址为"http://127.0.0.1:5001/mocks/demo/examplePath"(注意：路径一个字符不要带/，"/examplePath/xxx"是错误的，"examplePath/xxx"是正确的写法),

3. 输入地址测试吧：比如上面的例子你就可以在浏览器中输入"http://127.0.0.1:5001/mocks/demo/examplePath"测试数据，由于使用了静态服务器进行模拟所以直接在浏览器上输入地址会出现下载框，这是正常的，换成ajax访问就可以了。

> mock creater

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
