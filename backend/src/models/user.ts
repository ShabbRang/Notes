import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, select: false, unique: true}, // select: false prevents the retrieval of email and data from the database on default
    password: {type: String, required: true, select: false}
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);