import jwt, { JwtPayload } from "jsonwebtoken";
import User from "@/models/User";
import { AuthenticatedUser } from "./types";
import { NextResponse } from "next/server";

export const authenticateToken = async (
  req: Request
): Promise<AuthenticatedUser> => {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    throw new Error("No token provided");
  }

  try {
    // Verify the token and assert the type as JwtPayload
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
      userId: string;
    };

    // Check if the token contains a valid userId
    if (!decoded?.userId) {
      throw new Error("Invalid token: missing userId");
    }

    // Find the user in the database
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error("Unauthorized User");
    }

    // Return the user details as an AuthenticatedUser
    return decoded as AuthenticatedUser;
  } catch (error) {
    console.error("Error authenticating token:", error);
    throw new Error("Invalid or expired token");
  }
};
