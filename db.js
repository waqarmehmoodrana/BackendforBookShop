import mongoose from "mongoose";
import Colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://waqarmehmoodrana54:OHFxpmiBlsP1jY9h@cluster0.twadwji.mongodb.net/BookDB?retryWrites=true&w=majority"
    );
    console.log(`Connected to MongoDB ${conn.connection.host}`.bgMagenta.white);
  } catch (error) {
    console.log(`Error in connecting MongoDB ${error}`.bgRed.white);
  }
};

export default connectDB;
