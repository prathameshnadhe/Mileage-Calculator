import { Vehicle } from "@/app/dashboard/page";
import { useState } from "react";
import EditVehicleModal from "@/app/components/EditVehicleModal";

interface VehicleProps {
  vehicle: Vehicle;
  onEdit: (vehicle: Vehicle) => void;
}

const VehicleCard: React.FC<VehicleProps> = ({ vehicle, onEdit }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-2">
        <h3 className="text-lg font-bold">{vehicle.name}</h3>
        <p className="text-sm text-gray-600">Type: {vehicle.vehicleType}</p>
        <p className="text-sm text-gray-600">
          Reg. Number:{" "}
          <span className="font-bold">{vehicle.registrationNumber}</span>
        </p>
        <p className="text-sm text-gray-600">
          Odometer:{" "}
          <span className="font-bold">{vehicle.initialOdometer} KM</span>
        </p>
        <button
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          onClick={handleEdit}
        >
          Edit
        </button>
      </div>
      {isEditModalOpen && (
        <EditVehicleModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={(updatedVehicle) => {
            onEdit(updatedVehicle);
            setIsEditModalOpen(false);
          }}
          initialData={vehicle}
        />
      )}
    </>
  );
};

export default VehicleCard;
