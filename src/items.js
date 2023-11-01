const items = [
  {id: 5, name: 'porkkana'},
  {id: 6, name: 'omena'},
  {id: 19, name: 'appelsiini'},
];

const getItems = res => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  const jsonItems = JSON.stringify(items);
  res.end(`{"message": "All items", "items": ${jsonItems}}`);
};

const getItemsById = (res, id) => {
  console.log('getItemsById', id);
  const item = items.find(element => element.id == id);
  if (item) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(item));
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end('{"message": "Item not found."}');
  }
};

const postItem = (req, res) => {
  let body = [];
  req
    .on('error', err => {
      console.error(err);
    })
    .on('data', chunk => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      console.log('req body', body);
      body = JSON.parse(body);
      if (!body.name) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(`{"message": "Missing data."}`);
        return;
      }
      const newId = items[items.length - 1].id + 1;
      items.push({id: newId, name: body.name});
      res.writeHead(201, {'Content-Type': 'application/json'});
      res.end(`{"message": "New item added."}`);
    });
};

const putItem = (req, res) => {
  let body = [];
  req
    .on('error', err => {
      console.error(err);
    })
    .on('data', chunk => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      console.log('req body', body);
      body = JSON.parse(body);
      if (!body.name) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(`{"message": "Missing data."}`);
        return;
      }
      const newId = items[items.length - 1].id + 1;
      items.push({id: newId, name: body.name});
      res.writeHead(201, {'Content-Type': 'application/json'});
      res.end(`{"message": "New item added."}`);
    });
};

const deleteItem = (req, res) => {
  let body = [];
  req
    .on('error', err => {
      console.error(err);
    })
    .on('data', chunk => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      console.log('req body', body);
      body = JSON.parse(body);
      if (!body.name) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(`{"message": "Missing data."}`);
        return;
      }
      const newId = items[items.length - 1].id + 1;
      items.push({id: newId, name: body.name});
      res.writeHead(201, {'Content-Type': 'application/json'});
      res.end(`{"message": "New item added."}`);
    });
};

export {getItems, getItemsById, postItem, putItem, deleteItem};
