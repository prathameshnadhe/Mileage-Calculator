"use client";

import React, { useState } from "react";
import { NewVehicle } from "@/app/dashboard/page";

interface VehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (vehicle: NewVehicle) => void;
}

const VehicleModal: React.FC<VehicleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [vehicleData, setVehicleData] = useState({
    name: "",
    vehicleType: "Car", // Default to Car
    registrationNumber: "",
    initialOdometer: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVehicleData({ ...vehicleData, vehicleType: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(vehicleData);
    setVehicleData({
      name: "",
      vehicleType: "Car",
      registrationNumber: "",
      initialOdometer: "",
    });
    onClose();
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-overlay"
      onClick={handleClickOutside}
    >
      <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 sm:w-1/2 md:w-1/3 relative transition-all transform">
        <h3 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Add Vehicle
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={vehicleData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
              placeholder="Enter vehicle name"
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Model
            </label>
            <select
              name="vehicleType"
              value={vehicleData.vehicleType}
              onChange={handleModelChange}
              className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="Bike">Bike</option>
              <option value="Car">Car</option>
              <option value="Other">Other</option>
            </select>
            {/* Custom Arrow */}
            <div className="absolute top-2/3 right-3 transform -translate-y-1/2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Registration Number
            </label>
            <input
              type="text"
              name="registrationNumber"
              value={vehicleData.registrationNumber}
              onChange={(e) => {
                const noSpacesValue = e.target.value.replace(/\s+/g, "");
                setVehicleData({
                  ...vehicleData,
                  registrationNumber: noSpacesValue.toUpperCase(),
                });
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
              placeholder="MH12AB1234"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Current Odometer (KM)
            </label>
            <input
              type="number"
              name="initialOdometer"
              value={vehicleData.initialOdometer}
              onChange={(e) => {
                const noSpacesValue = e.target.value.replace(/\s+/g, "");
                setVehicleData({
                  ...vehicleData,
                  initialOdometer: noSpacesValue,
                });
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
              placeholder="Enter odometer value"
            />
          </div>
          <div className="flex justify-between items-center mt-6 space-x-4 flex-wrap">
            <button
              type="button"
              className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all duration-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleModal;
