const express = require('express');
const app = new express();
const path = require('path');
console.log('###################################require.main.filename:');
// const rootPath = path.dirname(require.main.filename);

// 设置跨域访问
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// 增加静态托管目录
app.use('/mocks', express.static('mocks'));

export default app;
