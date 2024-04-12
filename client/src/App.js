import React, { useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3003');

export default function App() {
  const [message, setMessage] = useState(''); // 메시지 상태

  // 입력 필드의 값이 변경될 때마다 메시지 상태 업데이트
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  // "메시지 전송" 버튼을 클릭했을 때 실행될 함수
  const sendMessage = () => {
    if (message) {
      socket.emit('message', message); // 메시지를 서버로 전송
      setMessage(''); // 메시지 상태 초기화
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        placeholder="메시지를 입력하세요"
      />
      <button onClick={sendMessage}>메시지 전송</button>
    </div>
  );
}
