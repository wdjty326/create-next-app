import { useEffect } from "react";
import io from "socket.io-client";

const socketInit = async () => {
  await fetch("/api/socket");
  const socket = io();
  socket.on("connect", () => {
    console.log("connected");
  });
};

const App = () => {
  useEffect(() => {
	socketInit();
  }, []);

  return <div>Hello Next.js</div>;
};
export default App;
