# sphmall-client

> 商城前台部分
>
> API 根路径: http://gmall-h5-api.atguigu.cn/

## 项目初始化

```
npm install
```

### 编译并运行开发环境代码

```
npm run serve --open
```

### 编译并打包生产环境代码

```
npm run build
```

## 项目上线小技巧

1. 首先 `npm run build` 生成生产环境代码

2. 利用 `Node.js + express` 快速搭建 HTTP 服务器

    - 在根路径下创建 `server/server.js`

      ```js
      // Run this file with:
      // node sever/server.js
      // OR nodemon server/server.js
      const express = require('express');
      const path = require('path');
      const cors = require('cors');
      const history = require('connect-history-api-fallback');
      
      
      const app = express();
      app.use(history());
      // noinspection JSCheckFunctionSignatures
      app.use(cors());
      app.use(express.static(path.resolve(__dirname, '../dist')));
      
      
      const PORT = 4744;
      app.listen(PORT, () => {
          console.log('Server is running on port ' + PORT);
          console.log('http://localhost:' + PORT);
      });
      ```

    - 然后安装相关依赖

      ```bash
      npm install --save-dev express cors connect-history-api-fallback
      ```

    - 然后运行 `server/server.js`

      ```bash
      # 建议使用 nodemon
      nodemon server/server.js
      ```

3. 购买内网穿透服务，例如：https://natapp.cn/

   ```bash
   # 下面以 natapp 举例
   # 1. 购买套餐
   # 2. 设定自己的域名，例如我的是：http://lucaswang474.natapp1.cc	
   # 3. 设定监听本地的端口，例如我的是 4744 端口。注意：这个端口号就是 server/server.js 中监听的端口
   # 4. 开启 natapp 服务
   ```

总结：

```bash
# 大概就一下两步
natapp -authtoken=xxxxxxxxxxxxxxx
nodemon server/server.js

# 然后访问你设定的域名就 OK 了
```
