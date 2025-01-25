import mongoose from 'mongoose'

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL).then(
        () => {
            console.log('Connected to mongoDB');
        }
    ).catch((error) => {
        console.log(`Error connecting with mongoDB: ${error.message}`);
        process.exit(1);
    });
}
export default connectDB;