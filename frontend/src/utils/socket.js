import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Only connect when explicitly initialized to avoid unused connections
export const socket = io(SOCKET_URL, {
  autoConnect: false,
});
