const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const cors = require("cors");
const passport = require("passport");
require("./config/passport")(passport);

mongoose
  .connect("connect to mongodb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to mongodb atlas.");
  })
  .catch((err) => {
    console.log(err);
  });

//  middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/user", authRoute);
// app.use("/api/courses", courseRoute);
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
);

// app.use(cors());
// app.get("/", function (req, res) {
//   res.send("Hello World");
// });

app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});
