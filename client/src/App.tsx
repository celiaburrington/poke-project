import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { HashRouter } from "react-router";
import { PokeProjectSocket } from "./types/types";
import PokeProject from "./pages/PokeProject";
import "./main.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [socket, setSocket] = useState<PokeProjectSocket | null>(null);

  const serverURL = import.meta.env.VITE_REMOTE_SERVER_URL;

  if (serverURL === undefined) {
    throw new Error(
      "Environment variable 'VITE_REMOTE_SERVER_URL' must be defined"
    );
  }

  useEffect(() => {
    if (!socket) {
      setSocket(io(serverURL));
    }

    return () => {
      if (socket !== null) {
        socket.disconnect();
      }
    };
  }, [socket, serverURL]);

  return (
    <HashRouter>
      <PokeProject />
    </HashRouter>
  );
}
