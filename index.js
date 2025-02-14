import express from "express";
import { fileRouter } from "./src/router/fileRouter.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const app = express();
const port = process.env.PORT || 3000;

app.use("/", (req, res) => {
  res.send("Welcome to files/images uploader");
});
app.use("files", fileRouter);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use("/src/uploads", express.static(uploadDir));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
