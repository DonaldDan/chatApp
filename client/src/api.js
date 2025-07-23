import { io } from 'socket.io-client';


const API = 'http://localhost:5000/api';

const socket = io(API, {
    auth:{
        token: "UserToken"
    }
    });