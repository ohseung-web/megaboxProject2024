const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

// 데이터 파일 경로
const dataFilePath = path.join(__dirname, 'db.json');

// CORS 설정
app.use(cors({
  origin: 'http://localhost:000', // 클라이언트의 출처
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// SSE 엔드포인트
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // 클라이언트에게 데이터를 전송하는 함수
  const sendData = () => {
    try {
      const data = fs.readFileSync(dataFilePath, 'utf-8');
      const jsonData = JSON.parse(data); // 데이터가 JSON 형식인지 확인
      res.write(`data: ${JSON.stringify(jsonData)}\n\n`); // JSON.stringify를 사용하여 문자열로 변환
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.write(`data: {}\n\n`); // 빈 객체를 전송
    }
  };

  // 데이터 전송
  sendData();

  // 데이터 변경 감지
  const watcher = fs.watch(dataFilePath, (eventType) => {
    if (eventType === 'change') {
      sendData();
    }
  });

  // 연결 종료 시 정리 작업
  req.on('close', () => {
    watcher.close();
  });
});

app.listen(port, () => {
  console.log(`SSE server listening at http://localhost:${port}`);
});