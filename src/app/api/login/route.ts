import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connect } from "@/dbconfig/dbconfig";

export async function POST(request: Request) {
  try {
    await connect();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    console.log(email, password);

    const user = await User.findOne({ email });
    console.log("user", user);
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "12h" }
    );

    const response = NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true, // Makes the cookie inaccessible via JavaScript
      secure: process.env.NODE_ENV === "production", // Ensure this is secure in production
      sameSite: "strict", // Prevents CSRF attacks
      path: "/", // Available across the entire site
      maxAge: 60 * 60 * 12, // 12 hours in seconds
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during login:", error);
      return NextResponse.json(
        { message: "Internal server error", error: error.message },
        { status: 500 }
      );
    }
    // Handle case when error is not an instance of Error
    return NextResponse.json(
      { message: "Unknown error occurred from login", error: "Unknown error" },
      { status: 500 }
    );
  }
}
