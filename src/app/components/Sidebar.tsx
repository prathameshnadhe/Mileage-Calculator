"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Bar from "@/utils/images/white_bar.png";
import Image from "next/image";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  toggleSidebar,
}) => {
  const router = useRouter();

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
      console.error("Logout Error:", error.message);
      toast.error(error.message || "Error logging out");
    }
  };

  return (
    <div
      className={`fixed inset-y-0 w-[20rem] left-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex flex-col justify-between h-full transition-transform duration-300 shadow-xl rounded-lg ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:block`}
    >
      <div>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Mileage Calculator
          </h1>
          <button
            className="lg:hidden px-4 py-2 bg-indigo-700 text-white shadow-lg rounded-lg hover:bg-indigo-800 focus:outline-none"
            onClick={toggleSidebar}
          >
            <Image src={Bar} width={50} height={50} alt="Toggle Sidebar" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <ul className="space-y-6 text-center">
          <li
            className={`text-xl cursor-pointer font-semibold hover:bg-indigo-500 px-4 py-2 rounded-lg transition duration-300 ease-in-out ${
              activeTab === "vehicles" ? "bg-indigo-500" : "hover:bg-indigo-400"
            }`}
            onClick={() => setActiveTab("vehicles")}
          >
            <span>Home</span>
          </li>
          <li
            className={`text-xl cursor-pointer font-semibold hover:bg-indigo-500 px-4 py-2 rounded-lg transition duration-300 ease-in-out ${
              activeTab === "analytics"
                ? "bg-indigo-500"
                : "hover:bg-indigo-400"
            }`}
            onClick={() => setActiveTab("analytics")}
          >
            <span>Analytics</span>
          </li>
          <li
            className={`text-xl cursor-pointer font-semibold hover:bg-indigo-500 px-4 py-2 rounded-lg transition duration-300 ease-in-out ${
              activeTab === "settings" ? "bg-indigo-500" : "hover:bg-indigo-400"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <span>Settings</span>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          className="lg:absolute lg:bottom-8 w-[17rem] text-xl font-semibold px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-4 transition-all duration-300"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
