"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import openEye from "@/utils/images/open_eye.png";
import closedEye from "@/utils/images/closed_eye.png";
import Image from "next/image";

const SignUp = () => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        toast.success(response.data.message || "Sign up successful");
        router.push("/login");
      } else {
        setFormErrors({
          ...formErrors,
          general: response.data.message || "Error signing up",
        });
        toast.error(response.data.message || "Signup failed");
      }
    } catch (error: any) {
      if (error.response) {
        setFormErrors({
          ...formErrors,
          general: error.response.data.message || "Signup failed",
        });
        toast.error(error.response.data.message || "Signup failed");
      } else {
        setFormErrors({
          ...formErrors,
          general: "An error occurred during signup",
        });
        toast.error("An error occurred during signup");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl max-sm:m-2">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-5 py-3 border rounded-lg focus:outline-none ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 ${
                formErrors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
              } transition duration-200`}
              placeholder="Enter your email"
            />
            {formErrors.email && (
              <p className="text-sm text-red-500">{formErrors.email}</p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-5 py-3 border ${
                formErrors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 ${
                formErrors.password
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-500"
              } transition duration-200`}
              placeholder="Choose a strong password"
            />
            {formData.password && (
              <div
                onClick={togglePasswordVisibility}
                className={`absolute right-4 top-2/3 transform -translate-y-1/2 cursor-pointer opacity-[0.7]`}
              >
                <Image
                  src={isPasswordVisible ? closedEye : openEye}
                  alt="eye"
                  width={20}
                  height={20}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
