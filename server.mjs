import express from 'express';
import next from 'next';
import * as http from 'http';
import * as socketio from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

/** @deprecated src/pages/api/socket/index.ts 에서 처리하도록 픽스 */

// express 서버로 분리한 뒤에 socket.io와 연동한 설정 
nextApp.prepare().then(() => {
	const app = express();
	const server = http.createServer(app);
	const io = new socketio.Server();
	io.attach(server);

	app.get('/', (req, res) => {
		return nextApp.render(req, res, '/');
	});

	io.on('connection', (socket) => {
		console.log('connection');

		socket.on('disconnect', () => {
			console.log('client disconnected');
		});
	});

	app.all('*', (req, res) => nextHandler(req, res));

	app.listen(3000, (err) => {
		if (err) throw err;
		console.log('> Ready on http://localhost:3000');
	});
});
