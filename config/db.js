import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoDB = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const url = `${mongoDB.connection.host}:${mongoDB.connection.port}`
        console.log(`MongoDB connected in: ${url}`);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;