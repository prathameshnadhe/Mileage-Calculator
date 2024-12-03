// app/api/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/User";
import bycryptjs from "bcryptjs";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    await connect();

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password before saving
    const salt = await bycryptjs.genSalt(10);
    const hashedPassword = await bycryptjs.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating user:", error);
      return NextResponse.json(
        { message: "Error creating user", error: error.message },
        { status: 500 }
      );
    }
    // Handle case when error is not an instance of Error
    return NextResponse.json(
      { message: "Unknown error occurred from signup", error: "Unknown error" },
      { status: 500 }
    );
  }
}
