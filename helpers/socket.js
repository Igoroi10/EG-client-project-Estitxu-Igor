const { io } = require("socket.io-client");
import {SOCKET_URL} from '../constants/constants.js';

const socket = io(SOCKET_URL);
export default socket