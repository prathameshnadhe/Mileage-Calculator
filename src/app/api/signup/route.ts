import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/User";
import bcryptjs from "bcryptjs";

// Utility function to validate email
const validateEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

// Utility function to validate password strength
const validatePassword = (password: string) => {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*\.?])(?=.*[A-Z])[A-Za-z\d!@#$%^&*\.?]{8,}$/;
  return regex.test(password);
};

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  // Check if all fields are provided
  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  // Validate email format
  if (!validateEmail(email)) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 }
    );
  }

  // Validate password strength
  if (!validatePassword(password)) {
    return NextResponse.json(
      {
        message:
          "Password must be at least 8 characters, include a number, an uppercase letter, and a special character.",
      },
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
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

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
