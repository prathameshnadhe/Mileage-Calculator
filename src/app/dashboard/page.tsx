"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/logout");

      if (response.status === 200) {
        toast.success(response.data.message || "User logged out successfully");
        router.push("/login");
      } else {
        toast.error(response.data.message || "Error logging out");
      }
    } catch (error: any) {
      console.log("Logout Error: ", error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-blue-600 text-white p-4">
        <h2 className="text-2xl font-semibold mb-8 text-center">Dashboard</h2>
        <ul className="space-y-4">
          <li
            className={`cursor-pointer hover:bg-blue-500 px-4 py-2 rounded ${
              activeTab === "home" ? "bg-blue-500" : ""
            }`}
            onClick={() => setActiveTab("home")}
          >
            Home
          </li>
          <li
            className={`cursor-pointer hover:bg-blue-500 px-4 py-2 rounded ${
              activeTab === "analytics" ? "bg-blue-500" : ""
            }`}
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </li>
          <li
            className={`cursor-pointer hover:bg-blue-500 px-4 py-2 rounded ${
              activeTab === "settings" ? "bg-blue-500" : ""
            }`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-xl font-semibold">Welcome to the Dashboard</div>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === "home" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Home</h3>
            <p>
              This is your home dashboard. You can see the overall statistics
              here.
            </p>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Analytics</h3>
            <p>
              This is the analytics section. Here you can view charts and data.
            </p>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Settings</h3>
            <p>
              This is where you can change your profile settings, password, etc.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
