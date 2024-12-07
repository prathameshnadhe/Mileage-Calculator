import { useState } from "react";
import { NewVehicle, Vehicle } from "@/app/dashboard/page";

interface EditVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedVehicle: Vehicle) => void;
  initialData: Vehicle;
}

const EditVehicleModal: React.FC<EditVehicleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<NewVehicle>({
    name: initialData.name,
    vehicleType: initialData.vehicleType,
    registrationNumber: initialData.registrationNumber,
    initialOdometer: initialData.initialOdometer,
  });

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, vehicleType: e.target.value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...initialData, ...formData });
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
      <div className="bg-white p-8 rounded-lg shadow-xl w-11/12 sm:w-1/3 relative transition-all transform">
        <h3 className="text-3xl font-bold mb-4 text-center text-blue-600">
          Edit Vehicle
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              value={formData.vehicleType}
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

          <div className="mb-6 relative group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Registration Number
            </label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:ring-gray-300 transition duration-200"
              required
              placeholder="MH12AB1234"
              readOnly
            />
            <div className="absolute left-1/2 w-[20rem] text-center transform -translate-x-1/2 -bottom-7 bg-gray-700 text-white text-xs rounded-md px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              We’ve filled this for you. No changes necessary!
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Current Odometer (KM)
            </label>
            <input
              type="number"
              name="initialOdometer"
              value={formData.initialOdometer}
              onChange={(e) => {
                const noSpacesValue = e.target.value.replace(/\s+/g, "");
                setFormData({
                  ...formData,
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
              Save Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVehicleModal;
