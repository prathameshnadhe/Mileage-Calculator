import { NextResponse } from "next/server";
import Vehicle from "@/models/Vehicle";
import { connect } from "@/dbconfig/dbconfig";
import mongoose from "mongoose";
import { authenticateToken } from "@/utils/authMiddleware";

// Helper function to connect to the MongoDB database
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await connect();
};

// POST /api/vehicles
export async function POST(req: Request) {
  try {
    await connectDB();

    const user = await authenticateToken();

    const { name, registrationNumber, vehicleType, initialOdometer } =
      await req.json();

    const checkVehicle = await Vehicle.findOne({ registrationNumber });

    if (checkVehicle) {
      return NextResponse.json(
        { message: "A vehicle with this registration number already exists." },
        { status: 400 } // You can use 400 for client errors like this
      );
    }

    const vehicle = new Vehicle({
      userId: user.userId,
      name,
      registrationNumber,
      vehicleType,
      initialOdometer,
    });

    await vehicle.save();

    return NextResponse.json({
      message: "Vehicle added successfully",
      vehicle,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error creating vehicle:", error);
      return NextResponse.json(
        { message: "Failed to add vehicle", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Unknown error occurred while adding vehicle",
        error: "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET /api/vehicles
export async function GET(req: Request) {
  try {
    await connectDB();

    const user = await authenticateToken();

    // Fetch vehicles belonging to the authenticated user
    const vehicles = await Vehicle.find({ userId: user.userId });
    return NextResponse.json(vehicles);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Failed to fetch vehicles", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Unknown error occurred while getting vehicles",
        error: "Unknown error",
      },
      { status: 500 }
    );
  }
}
