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

export async function GET(
  req: Request,
  { params }: { params: { vehicleId: string } }
) {
  try {
    const user = await authenticateToken(req);

    await connectDB();

    const vehicle = await Vehicle.findOne({
      registrationNumber: params.vehicleId,
      userId: user.userId,
    });

    if (!vehicle) {
      return NextResponse.json(
        { message: "Vehicle not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(vehicle);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to fetch vehicle", details: error.message },
        { status: 500 }
      );
    }
    // Handle case when error is not an instance of Error
    return NextResponse.json(
      {
        message: "Unknown error occurred while getting vehicle",
        error: "Unknown error",
      },
      { status: 500 }
    );
  }
}

// PUT - Update vehicle by ID (registrationNumber)
export async function PUT(
  req: Request,
  { params }: { params: { vehicleId: string } }
) {
  try {
    const user = await authenticateToken(req);

    const { name, vehicleType, initialOdometer } = await req.json();

    // Validate the incoming data (basic validation)
    if (!name || !vehicleType || !initialOdometer) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    // Update the vehicle with the provided `vehicleId` (registrationNumber)
    const updatedVehicle = await Vehicle.findOneAndUpdate(
      { registrationNumber: params.vehicleId, userId: user.userId },
      { name, vehicleType, initialOdometer, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedVehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Vehicle updated successfully",
      updatedVehicle,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to update vehicle", details: error.message },
        { status: 500 }
      );
    }
    // Handle case when error is not an instance of Error
    return NextResponse.json(
      {
        message: "Unknown error occurred while updating vehicle",
        error: "Unknown error",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete vehicle by ID (registrationNumber)
export async function DELETE(
  req: Request,
  { params }: { params: { vehicleId: string } }
) {
  try {
    const user = await authenticateToken(req);

    await connectDB();

    const deletedVehicle = await Vehicle.findOneAndDelete({
      registrationNumber: params.vehicleId,
      userId: user.userId,
    });

    if (!deletedVehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Vehicle deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Failed to delete vehicle", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Unknown error occurred while deleting vehicle",
        error: "Unknown error",
      },
      { status: 500 }
    );
  }
}
