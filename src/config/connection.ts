import mongoose from "mongoose";

const mongooseconnect : string | undefined = process.env.MONGO_URI
if(mongooseconnect){
    mongoose.set('strictQuery',false)
    mongoose.connect(mongooseconnect,(err):void=>{
        if(err) return console.log('error connetion'+err);
        console.log('Database connected');
    })
}
export default mongoose