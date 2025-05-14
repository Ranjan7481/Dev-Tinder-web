import io from "socket.io-client";
import { BASEURL } from "./constant";
 
 export const createSocketConnection = () => {
   if (location.hostname === "localhost") {
     return io(BASEURL);
   } else {
     return io("/", { path: "/api/socket.io" });
   }
 };