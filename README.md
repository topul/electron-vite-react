# 如何创建electron-vite-react

## 创建vite应用

```bash
yarn create @vitejs/app electron-vite-react --template react

cd electron-vite-react

yarn
```

## 安装electron打包工具

```bash
yarn add --dev @electron-forge/cli
```

当打包工具安装完成后，我们设置一下electron打包配置，然后我们就可以通过electron-forge进行electron打包了。

```bash
yarn electron-forge import
```

## 编辑package.json

我们还需要安装两个依赖：

```bash
concurrently
cross-env
```

安装方法：

```bash
yarn add -D concurrently cross-env
```

当依赖安装完成后，我们修改package.json文件，添加打包脚本：

```json
"script": {
  "start": "npm run build && npm run electron:start",
  "dev": "concurrently -k \"vite\" \"npm run electron:dev\"",
  "build": "vite build",
  "preview": "vite preview",
  "electron:start": "cross-env IS_DEV=false electron-forge start",
  "electron:dev": "cross-env IS_DEV=true electron-forge start",
  "package": "electron-forge package",
  "make": "electron-forge make"
}
```

变量IS_DEV也可以改为其它名字，如NODE_ENV

我们还需要添加三个配置：

```json
"main": "app/index.js",
"description": "electron-vite-react",
"license": "MIT",
```

接下来编写electron-vite-react的主要代码，我们可以在app/index.js中添加一个简单的组件：

```js
const path = require('path')
const { app, BrowserWindow } = require('electron')

if (require('electron-squirrel-startup')) {
  app.quit()
}

const isDev = process.env.IS_DEV === 'true'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    }
  })
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}
```

现在就可以通过npm run dev或者npm run start来进行体验了
