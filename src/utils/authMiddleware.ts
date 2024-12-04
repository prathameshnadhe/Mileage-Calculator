import jwt, { JwtPayload } from "jsonwebtoken";
import User from "@/models/User";
import { AuthenticatedUser } from "./types";
import { connect } from "@/dbconfig/dbconfig";
import { cookies } from "next/headers"; // Use next/headers for accessing cookies in the app directory

export const authenticateToken = async (): Promise<AuthenticatedUser> => {
  const cookieStore = cookies(); // Get the cookie store
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    throw new Error("No token provided"); // If no token is found in cookies
  }

  try {
    await connect(); // Connect to the database

    // Verify the token and assert the type as JwtPayload with additional userId field
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

    // Return the decoded user information
    return decoded as AuthenticatedUser;
  } catch (error) {
    console.error("Error authenticating token:", error);
    throw new Error("Invalid or expired token");
  }
};
