import { io } from "socket.io-client";
import { Paths } from "../../global/constants/api";

const socket = io(`http://${Paths.IPV4}:5002`);

export default socket;
