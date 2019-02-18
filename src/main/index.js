import { app, BrowserWindow, ipcMain } from 'electron' // eslint-disable-line
// Require `server` process to boot app
import server_app from './server';
const Datastore = require('nedb');

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 690,
    useContentSize: true,
    width: 1160,
    maxWidth: 1160,
    minWidth: 1160,
    maxHeight: 690,
    minHeight: 690,
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

console.log('#############server setup###################');
const db = new Datastore({
  filename: 'system/config',
  autoload: true,
});

// 设置服务器listener
let server;
function setListener() {
  db.findOne({}, (err, doc) => {
    console.log(err, doc);
    const port = (doc && doc
      .port) || 5000;
    if (server) { server.close(); }
    server = server_app.listen(port, () => {
      const host = server.address().address;
      const port = server.address().port;
      console.log(`server launched: ${host}:${port}`);
    });
  });
}

// //注册设置端口监听
// ipcMain.on("setport-message", function (event, port) {
//   console.log("接到了port设置消息");
//   db.findOne({}, function(err,doc){
//     console.log(err,doc);
//     //没有设置项
//     if(Object.is(doc,null)){
//       db.insert({port});
//     }
//     else{
//       db.update({_id:doc._id},{port},{ upsert: true });
//     }

//     setListener();
//   });
// });


setListener();
