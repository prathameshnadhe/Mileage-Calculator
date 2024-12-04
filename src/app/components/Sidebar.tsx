"use client";
import React from "react";
import { useState } from "react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
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
  );
};

export default Sidebar;
