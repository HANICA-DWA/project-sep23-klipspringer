import { useEffect } from "react";
import { getWebSocket } from "../data/websockets";

export default function useWebsocket(onMessageCallback) {
  useEffect(() => {
    const socket = getWebSocket();

    const handleWebsocketMessage = (event) => {
      const data = JSON.parse(event.data);
      onMessageCallback(data);
    };

    socket.onmessage = handleWebsocketMessage;

  }, [onMessageCallback]);
}
