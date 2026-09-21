import mongoose from "mongoose"
const bookTypes =new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            unique:true
        },
        author:{
            type:String

        },
        year:{
            type:Number
        },
        genres:{
            type:String
        }
    },
    {
        collation:"books"

    }
);
const book=mongoose.model("book",bookTypes)