import { io } from "socket.io-client";
import { Paths } from "../../global/constants/api";

const socket = io(`http://${Paths.IPV4}:${Paths.STREAMING_PORT}`);

export default socket;
