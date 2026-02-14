"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function TestSocketPage() {
  const [connected, setConnected] = useState(false);
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const socket = io(process.env.NEXTAUTH_URL);
  }, []);
  console.log("socket", io);

  return (
    <div>
      <h1>Socket.io Connection Test</h1>
    </div>
  );
}
