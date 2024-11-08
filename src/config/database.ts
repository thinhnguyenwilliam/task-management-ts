import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const dbURI = process.env.MONGO_URI || "mongodb://localhost:27017/your-database-name";
        await mongoose.connect(dbURI);
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit process if unable to connect
    }
};

export default connectDB;
