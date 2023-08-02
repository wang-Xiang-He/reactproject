const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

// 模擬 POST 請求的端點
server.post("/login", (req, res) => {

  const { username, password } = req.body;

  const users = router.db.get("users").value();
  
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    console.log(req.body);
    res.json({ success: true,token:"qwert" });
  } else {
    console.log(req.body);
    res.json({ success: false });
  }
});

server.use(router);
server.listen(3001, () => {
  console.log("JSON Server is running on port 3001");
});
