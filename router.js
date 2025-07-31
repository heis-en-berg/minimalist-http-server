import fs from 'fs';

function router(urlPath) {
    let data;
    if (urlPath === '/' || urlPath === '/index' || urlPath === '/home' || urlPath === '/index.html') {
        data = readFile('index.html');
    } else if (urlPath === '/about' || urlPath === '/about.html') {
        data = readFile('about.html');
    } else {
        data = readFile('404.html');
    }

    return createHTTPResponse(data, 'text/html');
}

function readFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.error('Error reading file:', err);
        return 'File not found';
    }
}

function createHTTPResponse(data, contentType, statusCode = 200) {
    return `HTTP/1.1 ${statusCode} OK\r\n` +
           `Content-Type: ${contentType}\r\n` +
           `Content-Length: ${Buffer.byteLength(data, 'utf8')}\r\n` +
           '\r\n' +
           data;
}

export { router };
