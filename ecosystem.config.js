module.exports = {
  apps: [
    {
      name: 'blog',
      script: 'server.js',
      args: 'start',
      instances: '2',  // 使用兩個核心測試
      exec_mode: 'cluster',  // Cluster模式
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    }
  ]
};
