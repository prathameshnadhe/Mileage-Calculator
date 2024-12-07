"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "@/app/components/Sidebar";
import VehicleModal from "@/app/components/VehicleModal";
import VehicleCard from "@/app/components/VehicleCard";
import Bar from "@/utils/images/black_bar.png";
import Image from "next/image";

export interface Vehicle {
  _id: string;
  name: string;
  vehicleType: string;
  registrationNumber: string;
  initialOdometer: string;
}

export interface NewVehicle {
  name: string;
  vehicleType: string;
  registrationNumber: string;
  initialOdometer: string;
}

const Dashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("vehicles");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("/api/vehicles", {
          withCredentials: true,
        });

        setVehicles(response.data);
      } catch (error: unknown) {
        toast.error("Failed to fetch vehicles");
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  const handleAddVehicle = async (vehicle: NewVehicle) => {
    try {
      const response: AxiosResponse<Vehicle> = await axios.post(
        "/api/vehicles",
        vehicle,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setVehicles((prevVehicles) => [...prevVehicles, response.data]);
        setIsModalOpen(false);
        toast.success("Vehicle added successfully");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message || "Failed to add vehicle");
      } else {
        toast.error(error.message || "Failed to add vehicle");
      }
      console.error("Error adding vehicle:", error.message);
    }
  };

  const handleEditVehicle = async (updatedVehicle: Vehicle) => {
    try {
      const response = await axios.put(
        `/api/vehicles/${updatedVehicle.registrationNumber}`,
        updatedVehicle,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setVehicles((prevVehicles) =>
          prevVehicles.map((v) =>
            v._id === updatedVehicle._id ? { ...v, ...updatedVehicle } : v
          )
        );
        toast.success("Vehicle updated successfully");
      }
    } catch (error: any) {
      if (error.response && error.response.status === "404") {
        toast.error(error.response.data.error || "Failed to update vehicle");
      } else {
        toast.error("Failed to update vehicle");
      }
      console.error("Error updating vehicle:", error.message);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-200 to-blue-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-lg mt-10 mx-4 lg:mx-10 overflow-y-auto">
        <Toaster />
        <button
          className="lg:hidden px-4 py-2 bg-gray-300 shadow-lg hover:bg-gray-400 rounded-lg mb-4"
          onClick={toggleSidebar}
        >
          <Image src={Bar} width={50} height={50} alt="Sidebar Toggle" />
        </button>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Dashboard
          </h2>
          <div className="flex items-center space-x-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              Add Vehicle
            </button>
          </div>
        </div>

        {/* Vehicle Section */}
        {activeTab === "vehicles" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-700">
                Vehicles
              </h3>
            </div>

            {vehicles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle._id}
                    vehicle={vehicle}
                    onEdit={handleEditVehicle}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-700">
                  No vehicles available. Please add some!
                </p>
              </div>
            )}
          </div>
        )}
        {/* Modal for Adding Vehicle */}
        <VehicleModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddVehicle}
        />
      </div>
    </div>
  );
};

export default Dashboard;
