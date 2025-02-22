const next = require('next');
const http = require('http');

const port = process.env.PORT || 3000;  // 🔥 確保使用環境變數 PORT
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    http.createServer((req, res) => {
        handle(req, res);
    }).listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});
