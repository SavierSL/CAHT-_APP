/* eslint-disable import/no-anonymous-default-export */
import express from "express";
import { Res, Req } from "./TS/types";
const router = express.Router();

router.get("/", (req: Req, res: Res) => {
  res.send("Server is running");
});

export default { router };
