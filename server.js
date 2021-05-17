/*
 * 
 * name:Jianbo Ning
 * email: ningj@oregonstate.edu
 */

var fs = require('fs');
var http = require('http');
var path = require('path');
var hostname = '127.0.0.1';
var port = process.env.PORT || 3000;
var dir = path.join(__dirname, 'public');
var mime = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript'
};
var filesData = {};

fs.readdir(dir, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function (fileName) {
        var file =  dir + '/' + fileName;
        if( ( fileName in filesData ) == false )
        {
            filesData[fileName] = {
                "file": fileName,
                "path": file,
                "content": fs.createReadStream(file)
            };
        }
    });
});

var server = http.createServer((req, res) => {
    var reqpath = req.url.toString().split('?')[0];
    var file = path.join(dir, reqpath.replace(/\/$/, '/index.html'));
    if (file.indexOf(dir + path.sep) !== 0) {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Access Denied');
    }
    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    var fileName = reqpath.toString().split('/')[1];
    if( !fileName ) { fileName = "index.html"; }
    
    if( ( fileName in filesData ) == false )
    {
        var s = fs.createReadStream(file);
        filesData[fileName] = {
            "file": fileName,
            "path": file,
            "content": s
        };
    } else { var s = filesData[fileName].content; }
    var s = fs.createReadStream(file);
    s.on('open', function () {
        res.setHeader('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        var errFile = path.join(dir, '404.html');
        var e = fs.createReadStream(errFile);
        e.on('open', function () {
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 404;
            e.pipe(res);
        });
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});