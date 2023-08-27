import app from "./app";
import mongoose from "mongoose";
import env from "./util/validate";

const port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("mongoose has connected")
        app.listen(port, () => {
            console.log("Server runing on 5000")
        });
    })
    .catch(console.error);


// Database password: sQ97Zk0BcDh89Z5N