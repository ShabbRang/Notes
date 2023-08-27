import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRouter from "./routes/notesRoute";
import userRoutes from "./routes/users";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validate";
import MongoStore from "connect-mongo";
import { requireAuth } from "./middleware/auth";

const app = express();

app.use(morgan("dev")); // gives information on endpoints does not affect the code just for additional information

app.use(express.json());

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60* 60* 1000
    },
    rolling: true,
    store: MongoStore.create ({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }) 
}))


app.use("/api/users", userRoutes)
app.use("/api/notes", requireAuth, notesRouter)

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint does not exist"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) =>{
    console.error(error);
        let errorMessage = "An Unknown Error Has Occurred";
        let statuscode = 500;
        if(isHttpError(error)){
            statuscode = error.status;
            errorMessage = error.message;
        }
        res.status(statuscode).json({error: errorMessage})
})

export default app;