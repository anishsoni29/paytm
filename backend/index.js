const cors = require("cors");
const express = require("express");
const mainRouter = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json()); //--> this is used to parse json data as the body-parser --> no need to require the body-parser.

app.use("/api/v1", mainRouter);

module.exports = router;

app.listen(3000);
//we are bootstraping our application as such
//the requests which we send on the /api/v1 route
//will go to the mainRouter which takes the data
//from the routes folder.

//app.use is a middleware.
// /api/v1 --> all reqs will start with this.

//adding the cors middlewares
