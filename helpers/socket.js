const { io } = require("socket.io-client");
import {SOCKET_URL} from '../constants/constants.js';

export const socket = io(SOCKET_URL);
