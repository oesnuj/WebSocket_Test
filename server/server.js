const http = require('http');
const express = require('express'); // Express 추가
const socketIo = require('socket.io');
const cors = require('cors'); // CORS 미들웨어 추가

const app = express(); // Express 앱 생성
app.use(cors()); // 모든 라우트에 대해 CORS 허용

// Express를 사용하여 HTTP 서버 생성
const server = http.createServer(app);

// 웹 소켓 서버 생성, CORS 옵션 추가
const io = socketIo(server, {
    cors: {
        origin: "*", // 모든 출처에서의 접근을 허용
        methods: ["GET", "POST"] // 허용할 HTTP 메소드
    }
});

io.on('connection', (socket) => {
    console.log('클라이언트가 연결되었습니다.');

    socket.on('message', (message) => {
        console.log('클라이언트로부터 받은 메시지:', message);
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('클라이언트가 연결을 종료했습니다.');
    });
});

// 서버를 3003번 포트에서 실행
server.listen(3003, () => {
    console.log('웹 소켓 서버와 HTTP 서버가 3003번 포트에서 실행되었습니다.');
});
