const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');


// Sample data
let users_db = [
  { "id": 1, "username": "123456", "password": "123456" },
  { "id": 2, "username": "123", "password": "123" }
];

// Middleware to parse request body as JSON
server.use(bodyParser.json());
server.use(middlewares);

// Custom routes
server.post('/login', (req, res) => {
  const { username, password } = req.body;
  const foundUser = users_db.find(user => user.username === username && user.password === password);
  if (foundUser) {
    res.json({ success: true, token: "qwert", user: "Wang" });
  } else {
    res.status(401).json({ success: false, message: "Login failed" });
  }
});

server.get('/people', (req, res) => {
  const peopleData = require('./db.json').people;
  res.json(peopleData);
});

server.get('/series', (req, res) => {
  const seriesData = require('./db.json').series;
  res.json(seriesData);
});

server.get('/users', (req, res) => {
  const usersData = require('./db.json').users;
  res.json(usersData);
});

server.post('/download', (req, res) => {
  const data = req.body;
  const selected_values = data.selected_values || [];
  const csvData = "SelectedValue\n" + selected_values.join("\n");
  
  // Convert CSV data to a buffer
  const buffer = Buffer.from(csvData, 'utf-8');
  
  // Set response headers for CSV download
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=example.csv');
  res.setHeader('Content-Length', buffer.length);
  
  // Send the buffer as the response
  res.status(200).send(buffer);
});

// Use default JSON Server router
server.use(middlewares);
server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});
