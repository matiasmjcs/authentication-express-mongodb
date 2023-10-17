import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    image: {type: String, require: true},
})

export const Category = mongoose.model("category",categorySchema)