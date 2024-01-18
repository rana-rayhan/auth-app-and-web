const app = require("./app");
const dbConnection = require("./configs/db");
const { port } = require("./secrect");

app.listen(port, () => {
  dbConnection();
  console.log(`app is running at http://localhost:${port}`);
});
