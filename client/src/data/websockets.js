const hostname = `ws://${import.meta.env.VITE_BACKEND_HOST}`

let socket;

export function createWebSocket() {
    if (socket)
        socket.close();
        
    socket = new WebSocket(hostname);
    return socket;
}

export function getWebSocket() {
    if (socket)
        return socket;

    return createWebSocket()
}