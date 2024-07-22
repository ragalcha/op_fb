import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
);


app.use(bodyParser.urlencoded({
    extended: true
  }));
  
app.use(bodyParser.json());
app.use(cookieParser());

// Debugging middleware to log incoming requests
app.use((req, res, next) => {
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

// import routes
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/user", userRouter);

export { app };
