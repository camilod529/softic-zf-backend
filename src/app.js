import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileupload from "express-fileupload";

import {
  sessionRoutes,
  colaboratorRoutes,
  companyRoutes,
  tagRoutes,
  eventRoutes,
  commentRoutes,
  registerToEventRoutes,
  awardRoutes,
  pointsRoutes,
} from "./routes/index.js";

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);

// Routes
app.use(
  "/api",
  sessionRoutes,
  colaboratorRoutes,
  companyRoutes,
  tagRoutes,
  eventRoutes,
  commentRoutes,
  registerToEventRoutes,
  awardRoutes,
  pointsRoutes
);

export { app };
