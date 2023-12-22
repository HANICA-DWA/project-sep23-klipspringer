const urlObject = new URL(import.meta.env.VITE_BACKEND_HOST);
const hostname = `ws://${urlObject.host}`;

let socket;

export function createWebSocket() {
  if (socket) socket.close();

  socket = new WebSocket(hostname);
  return socket;
}

export function getWebSocket() {
  if (socket) return socket;

  return createWebSocket();
}

export function closeWebSocket() {
  if (socket) socket.close();
}