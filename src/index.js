import http from 'http';
import {getItems, getItemsById, postItem} from './items.js';
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log('request', req.method, req.url);
  const {method, url} = req;
  const reqParts = url.split('/');

  if (method === 'GET' && url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Welcome to my API</h1>');
    res.write('<p>documentation comes here</p>');
    res.end();
  } else if (method === 'GET' && reqParts[1] === 'items' && reqParts[2]) {
    console.log('GETting item with id', reqParts[2]);
    getItemsById(res, reqParts[2]);
  } else if (method === 'GET' && reqParts[1] === 'items') {
    console.log('GETting all items');
    getItems(res);
  } else if (method === 'POST' && reqParts[1] === 'items') {
    console.log('POSTing a new item');
    postItem(req, res);
  } else if (method === 'PUT' && reqParts[1] === 'items') {
    console.log('PUTting an item');
    putItem(req, res);
  } else if (method === 'DELETE' && reqParts[1] === 'items') {
    console.log('DELETEing an item');
    deleteItem(req, res);
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end('{"message": "404 Resource not found!"}');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
