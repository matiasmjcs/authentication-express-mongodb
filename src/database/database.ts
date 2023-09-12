import mongoose from "mongoose";
import { config } from 'dotenv'; 
config();
export async function connect ( ) {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('connected',() => {
            console.log('mongoDb connected successfully')
        })

        connection.on('error',(err) => {
            console.log(err)
            process.exit()
        })
    } catch (error) {
        console.log('a ocurrido un error')
        console.log(error)
    }
}