import express from "express";
import {
  createJob,
  getAllJob,
  getJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

import { ensureAuthenticated } from "../middleware/jobAuth.js";

const route = express.Router();
route.post("/createJob", ensureAuthenticated, createJob);
route.get("/getAllJob", ensureAuthenticated, getAllJob);
route.get("/getJob/:id", ensureAuthenticated, getJob);
route.put("/updateJob/:id", ensureAuthenticated, updateJob);
route.delete("/deleteJob/:id", ensureAuthenticated, deleteJob);

export default route;
