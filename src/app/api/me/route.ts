import { NextResponse } from "next/server";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  try {
    // Get token from Authorization header
    const token = request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ message: "Token not found" }, { status: 401 });
    }

    // Verify the token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // Fetch user data using the decoded user ID
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json({ user }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error verifying token:", error);
      return NextResponse.json(
        { message: "Invalid token", error: error.message },
        { status: 401 }
      );
    }
    // Handle case when error is not an instance of Error
    return NextResponse.json(
      { message: "Unknown error occurred from me", error: "Unknown error" },
      { status: 500 }
    );
  }
}
