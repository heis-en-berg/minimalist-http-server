import net from 'net';
import { router } from './router.js';

const PORT = 83;

const server = net.createServer();

server.on('connection', handleConnection);

function handleConnection(socket) {
    let remoteAddress = socket.remoteAddress + ':' + socket.remotePort;
    console.log('New connection from: ', remoteAddress);

    socket.on('data', handleData);
    socket.on('error', (err) => {
        console.error('Socket error: ', err);
    });

    socket.on('close', () => {
        console.log('Connection closed from: ', remoteAddress);
    });

    function handleData(data) {
        // add routing
        // understand http headers
        // understand tls https
        // understand http status codes
        // response body
        // read more about web servers in java and javascript
        // mime types

        console.log('Received data: ', data.toString());
        const [requestLine] = data.toString().split('\r\n');
        const [method, urlPath, httpProtocol] = requestLine.split(' ');
        socket.write(router(urlPath));
        socket.end();
    }
}

server.listen(PORT, () => {
    console.log('Minimalist HTTP server is running on PORT: ', PORT);
})