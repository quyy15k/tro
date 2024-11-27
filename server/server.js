import express from "express";
require("dotenv").config();
import cors from "cors";
import initRouter from "./src/routes";
import connectDatabase from "./src/config/connectDatabase";

const app = express();
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

initRouter(app);
connectDatabase();

const port = process.env.PORT || 8888;
const listener = app.listen(port, () => {
  console.log(`server is running on the port ${listener.address().port}`);
});
