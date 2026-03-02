import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditCardataModal from "./EditCardataModal";
import useAxios from "../../../Hook/useAxios";
import toast from "react-hot-toast";

const ManageCarTable = ({ cars, refetch }) => {

    const [selectedCar, setSelectedCar] = useState(null);

    const CloseModal = () => setSelectedCar(null);
    const axiosInstance = useAxios()
    const handleDelete = async (carId) => {
        if (!window.confirm("Are you sure you want to delete this car?")) return;


        const res = await axiosInstance.delete(`/delete-car/${carId}`);
       
        if (res.data.deletedCount > 0) {
            toast.success("Car deleted successfully!");
            refetch(); 
        } else {
            toast.error("Failed to delete car!");
        }

    };
    return (
        <div className="overflow-x-auto bg-surface p-6 rounded-2xl shadow-lg border border-border">

            <table className="w-full text-left text-white">
                <thead>
                    <tr className="border-b border-border text-text-secondary">
                        <th className="py-3 px-4">Image</th>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Brand</th>
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Price/Day</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {cars.map((car) => (
                        <tr key={car._id} className="border-b border-border hover:bg-surface/60 transition text-black dark:text-white">

                            <td className="py-4 px-4">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-24 h-16 object-cover rounded-lg border border-border"
                                />
                            </td>

                            <td className="py-4 px-4">{car.name}</td>
                            <td className="py-4 px-4">{car.brand}</td>
                            <td className="py-4 px-4">{car.type}</td>

                            <td className="py-4 px-4 font-bold">
                                {car.currency} {car.pricePerDay}
                            </td>

                            <td className="py-4 px-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${car.available
                                        ? "bg-green-700/20 text-green-400"
                                        : "bg-red-700/20 text-red-400"
                                        }`}
                                >
                                    {car.available ? "Available" : "Unavailable"}
                                </span>
                            </td>


                            <td className="py-4 px-4 flex gap-3">

                                <button
                                    onClick={() => setSelectedCar(car)}
                                    className="flex items-center gap-2 text-white bg-primary px-4 py-2 rounded-lg hover:opacity-90 transition"
                                >
                                    <FaEdit /> Edit
                                </button>

                                <button onClick={() => handleDelete(car._id)} className="flex items-center gap-2 text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition">
                                    <FaTrash /> Delete
                                </button>


                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>


            {selectedCar && (
                <EditCardataModal
                    car={selectedCar}
                    CloseModal={CloseModal}
                    refetch={refetch}
                />
            )}
        </div>
    );
};

export default ManageCarTable;
