import net from 'net';
import fs from 'fs';

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

        console.log('Received data: ', data.toString());
        socket.write('HTTP/1.1 200 OK\r\n');
        socket.write('Content-Type: text/html\r\n');
        const responseBody = readFile('index.html');
        socket.write(`Content-Length: ${Buffer.byteLength(responseBody, 'utf8')}\r\n`);
        socket.write('\r\n');
        socket.write(responseBody);
        socket.end();
    }
}

function readFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.error('Error reading file:', err);
        return 'File not found';
    }
}

server.listen(PORT, () => {
    console.log('Minimalist HTTP server is running on PORT: ', PORT);
})