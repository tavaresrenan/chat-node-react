const WebSocket = require('ws');
const serverWs = new WebSocket.Server({port:3030});
serverWs.on('connection', function connection(ws) {
    ws.on ('message', function incoming(data) { 
      serverWs.clients.forEach(function each(client) { 
          if (client !== ws && client.readyState === WebSocket.OPEN) { 
            client.send(data); 
          } 
        }); 
      }); 
})
