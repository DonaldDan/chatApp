import { io } from 'socket.io-client';


const API= import.meta.env.VITE_SERVER_URL || 'http://localhost:5000' ;

const socket = io(API, {
    auth:{
        token: "UserToken"
    }
    });