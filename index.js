const express = require("express");
const { fileRouter } = require("./src/router/fileRouter.js");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 4040;

app.use(express.json());
app.use(cors());

app.use("/files", fileRouter);
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use("/src/uploads", express.static(uploadDir));
app.use("/", (req, res) => {
  res.send("Welcome to files/images uploader");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
