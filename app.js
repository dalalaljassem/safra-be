const express = require("express");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
const cors = require("cors");
//routes
const groupsRoute = require("./apis/groups/groups.routes");
const authRouter = require("./apis/auth/auth.router");

//db
const connectDB = require("./database/connection");
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//route
app.use("/trips", groupsRoute);
app.use("/", authRouter);

// TODO: fix this and add it into an external file in middlewares folder
//Error Handling Middleware
app.use((err, req, res, next) => {
  console.log("🚀 ~ file: app.js ~ line 17 ~ app.use ~ err", err);
  res
    .status(err.status || 500)
    .json({ message: "Internal Server Error" || err });
});
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

connectDB();

const port = 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
