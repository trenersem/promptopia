import mongoose from "mongoose";

let isConnected = false // track the connection
const MONGODB_URL = process.env.MONGODB_URL ?? '';

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('MongoDB is already connected');
        return
    }
    try {
        await mongoose.connect(MONGODB_URL, {
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true
         console.log('MongoDB is connected');
        
    } catch (error) {
        console.log(error)
    }
}