import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// Define the IUser interface extending mongoose's Document
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true, // Unique constraint on email
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
});

// Create or use existing model
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
