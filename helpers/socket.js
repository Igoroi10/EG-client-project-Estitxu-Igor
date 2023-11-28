import socketio from 'socket.io-client';
import {SOCKET_URL} from '../constants/constants';

export const socket = socketio.connect(SOCKET_URL);