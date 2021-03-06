const http = require('http');
const https = require('https');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config({ path: "./.env"});

const mainRouter = require('./routes/search.js');

const app = express();
/*app use CORS*/
app.use(cors({
	origin: ["https://woog2roid.github.io", "https://service.woog2roid.dev", "https://seoul.woog2roid.dev"],
}));

/* SSL option */
const option =
	process.env.NODE_ENV === 'production'
		? {
				key: fs.readFileSync(process.env.PRIVKEY, "utf8"),
				cert: fs.readFileSync(process.env.CERT, "utf8"),
				ca: fs.readFileSync(process.env.CA, "utf8"),
		  }
		: undefined;
const PORT = process.env.PORT || 3000;

// production 모드에서는 https 서버를,
// development 모드에서는 http 서버를 사용합니다
option
	? https.createServer(option, app).listen(PORT, () => {
			console.log(`Server is running at port ${PORT}`);
	  })
	: http.createServer(app).listen(PORT, () => {
			console.log(`Server is running at port ${PORT}`);
	  });

//routing(라우터 추가할 예정 없음 => index:search.js)
app.use('/', mainRouter); //주차장 검색 기능
