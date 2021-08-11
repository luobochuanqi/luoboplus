/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 * 
 * 
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *            佛祖保佑       永不宕机     永无BUG
 */


const { app, Menu, BrowserWindow, Tray, shell, BrowserView } = require('electron');
const path = require('path');
// var shell = require('shell')

let ipcMain = require('electron').ipcMain;//通信

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const showLoading = (cb) => {//加载动画
  loading = new BrowserWindow({
      show: false,
      frame: false, // 无边框（窗口、工具栏等），只包含网页内容
      width: 500,
      height: 300,
      resizable: false,
      transparent: true, // 窗口是否支持透明
      icon: 'src/image/playstore-icon.png',
  });

  loading.once("show", cb);
  loading.loadFile("src/loading.html");
  loading.show();
};


const createWindow = () => {
  // 创建浏览器窗口。
  // const appIcon = new Tray('./image/playstore-icon.png')
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    icon: 'src/image/playstore-icon.png',
    webPreferences: {
      nodeIntegration: true, // 是否集成 Nodejs
      enableRemoteModule: true,  // 这句必须要有,否则 require(electron).remote.BrowserWindow;是空
      contextIsolation: false
    },
    show: false,
  });

  setTimeout(() => {
    mainWindow.loadFile("src/index.html");  // 模拟启动准备时间
  }, 1500);
  mainWindow.once("ready-to-show", () => {
    loading.hide();
    loading.close();
    mainWindow.show();
  });

  // 打开管理员工具
  mainWindow.webContents.openDevTools();

  

  ////////////////////////////////////////////
  //接收最小化命令
  ipcMain.on('window-min', function() {
    mainWindow.minimize();
  })
  //接收最大化命令
  ipcMain.on('window-max', function() {
    if (mainWindow.isMaximized()) {
        mainWindow.restore();
    } else {
        mainWindow.maximize();
    }
  })
  //接收关闭命令
  ipcMain.on('window-close', function() {
    mainWindow.close();
  })
  ////////////////////////////////////////////

  require('./js/menu_main')
  let tray = null
  app.whenReady().then(() => {
    tray = new Tray('src/image/playstore-icon.ico')
    const contextMenu = Menu.buildFromTemplate([
      {
        label: '关注作者',
        click: () => {
          // const { shell } = require('electron')
          shell.openExternal('https://space.bilibili.com/500577206')}
      },
      {
        label:'全屏',
        accelerator: 'F11',
        click: () => {
          if(!mainWindow.isFullScreen()){
            mainWindow.setFullScreen(true)
          } else {
            mainWindow.setFullScreen(false)
          }
        }
        // role:'togglefullscreen'
      },
      {
        label:'重新加载程序',
        accelerator: 'ctrl+r',
        role: 'reload'
      },
      {
        label: '退出',
        accelerator: 'ctrl+q',
        role: 'quit'
      }
    ])
    tray.setToolTip('Luoboplus')
    tray.setContextMenu(contextMenu)
  })

  var view = new BrowserView()   //new出对象
  mainWindow.setBrowserView(view)   // 在主窗口中设置view可用
  view.setAutoResize({width: true,height: true})
  view.setBounds({x:0,y:30,width:800, height:600})  //定义view的具体样式和位置
  view.webContents.loadFile('src/files.html')  //wiew载入的页面
};



// 当Electron完成初始化时将调用此方法
// 并准备创建浏览器窗口。
// 有些api只能在事件发生后才能使用。
app.on("ready", () => {
  showLoading(createWindow);
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


// 启动python进程
// let pyProc = null
// let pyPort = null

// const createPyProc = () => {
//   let port = '4242'
//   let script = path.join(__dirname, 'py', 'api.py')
//   pyProc = require('child_process').spawn('python', [script, port])
//   if (pyProc != null) {
//     console.log('child process success')
//   }
// }


// const exitPyProc = () => {     // 退出python进程
//   pyProc.kill()
//   pyProc = null
//   pyPort = null
// }

// app.on('ready', createPyProc)
// app.on('will-quit', exitPyProc)