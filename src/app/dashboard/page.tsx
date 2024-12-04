"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "@/app/components/Sidebar";
import VehicleModal from "@/app/components/VehicleModal";

interface Vehicle {
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
      toast.error(error.message);
    }
  };

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

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 p-8">
        <Toaster />

        <div className="flex justify-between items-center mb-8">
          <div className="text-xl font-semibold">Welcome to the Dashboard</div>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>

        {activeTab === "vehicles" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Vehicles</h3>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => setIsModalOpen(true)}
              >
                Add Vehicle
              </button>
            </div>
            {vehicles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 cursor-pointer">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle._id}
                    className="bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-2"
                  >
                    <h3 className="text-lg font-bold">{vehicle.name}</h3>
                    <p className="text-sm text-gray-600">
                      Type: {vehicle.vehicleType}
                    </p>
                    <p className="text-sm text-gray-600">
                      Reg. Number:{" "}
                      <span className="font-bold">
                        {vehicle.registrationNumber}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Odometer:{" "}
                      <span className="font-bold">
                        {vehicle.initialOdometer} KM
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p>No vehicles available. Please add some!</p>
              </div>
            )}
          </div>
        )}

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
