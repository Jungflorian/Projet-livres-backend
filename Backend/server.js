const http = require('http');
const app = require('./app');

const port = process.env.PORT || 4000;
app.set('port', port);
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});