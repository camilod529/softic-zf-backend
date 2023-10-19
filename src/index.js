import { config } from "dotenv";

import { app } from "./app.js";

// Config environment variables
config();

// Sockets

// Start the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
