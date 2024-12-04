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
      <div className="bg-white p-8 rounded-lg shadow-xl w-1/3 relative transition-all transform scale-95 hover:scale-100">
        <h3 className="text-2xl font-semibold mb-6 text-center text-blue-600">
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
              className="w-full border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
              required
              placeholder="Enter vehicle name"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Model
            </label>
            <select
              name="vehicleType"
              value={vehicleData.vehicleType}
              onChange={handleModelChange}
              className="w-full border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
            >
              <option value="Bike">Bike</option>
              <option value="Car">Car</option>
              <option value="Other">Other</option>
            </select>
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
              className="w-full border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
              required
              placeholder="ABC1234"
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
              className="w-full border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
              required
              placeholder="Enter odometer value"
            />
          </div>
          <div className="flex justify-between items-center mt-6 space-x-4">
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
