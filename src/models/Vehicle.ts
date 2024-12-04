import mongoose, { Document, Schema } from "mongoose";

// Define a TypeScript interface for the Vehicle document
interface IVehicle extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  registrationNumber: string;
  vehicleType: "Car" | "Bike" | "Other";
  initialOdometer: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema
const vehicleSchema = new mongoose.Schema<IVehicle>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  vehicleType: {
    type: String,
    enum: ["Car", "Bike", "Other"],
    required: true,
  },
  initialOdometer: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to normalize the `registrationNumber`
vehicleSchema.pre<IVehicle>("save", function (next) {
  this.registrationNumber = this.registrationNumber.toUpperCase();
  next();
});

const Vehicle =
  mongoose.models.Vehicle || mongoose.model<IVehicle>("Vehicle", vehicleSchema);

export default Vehicle;
