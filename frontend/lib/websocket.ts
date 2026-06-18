export const connectWebSocket =
(
  onMessage: (
    data: any
  ) => void
) => {

  const ws =
    new WebSocket(
      "ws://localhost:8000/ws"
    );

  ws.onopen = () => {
    console.log(
      "WebSocket Connected"
    );
  };

  ws.onmessage = (
    event
  ) => {

    const data =
      JSON.parse(
        event.data
      );

    onMessage(data);
  };

  ws.onerror = (
    error
  ) => {

    console.error(
      error
    );
  };

  return ws;
};