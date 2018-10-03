import io from 'socket.io-client';

const socket = process.env.NODE_ENV === 'production' ? io() : io('http://localhost:5000');
export default socket;
