const WebSocket = require("ws");

function WebSocketUtils() {
  const wsu = {};
  var clients = [];

  wsu.setWebSocket = (server) => {
    console.log("Setting up WebSocket");
    const wss = new WebSocket.Server({ server });
    wss.on("connection", (ws) => {
      console.log("New Connection");
      clients.push(ws);
      console.log("Clients", clients.length);
    });
  };

  wsu.notifyAll = (data) => {
    console.log("notify all", clients.length);
    clients.forEach((ws) => ws.send(data));
  };
  return wsu;
}

module.exports = WebSocketUtils();
