import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const response = NextResponse.json(
      { message: "Logout successful", success: true },
      { status: 200 }
    );

    // Clear the 'token' cookie by setting it to an expired date
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set 'secure' in production
      sameSite: "strict", // Ensure CSRF protection
      path: "/", // Ensure the cookie is removed globally
      expires: new Date(0), // Expiry date in the past to delete it
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Error logging out", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        message: "Unknown error occurred during logout",
        error: "Unknown error",
      },
      { status: 500 }
    );
  }
}
