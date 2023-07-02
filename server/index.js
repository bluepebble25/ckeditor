const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer'); // (1)
const path = require('path');
const mime = require('mime-types');
const { v4: uuid } = require('uuid');

// config
require('dotenv').config({ path: './.env' });
const port = process.env.PORT;

// middleware
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // server의 uploads라는 폴더에 파일 저장
  },
  filename: (req, file, cb) => {
    cb(null, `${uuid()}.${mime.extension(file.mimetype)}`);
  },
});

const upload = multer({
  // (6)
  storage,
  fileFilter: (req, file, cb) => {
    if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype))
      cb(null, true);
    else cb(new Error('해당 파일의 형식을 지원하지 않습니다.'), false);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  // file이라는 key로 파일 전송받음
  res.status(200).json(req.file);
});

app.use('/uploads', express.static(path.join(__dirname, '/uploads'))); // client가 uploads라는 경로로 이미지 파일 받아올 수 있게 static으로 설정
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
