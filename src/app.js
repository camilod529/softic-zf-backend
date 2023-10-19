import express from "express";
import cors from "cors";

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
