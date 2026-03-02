import React from "react";
import { FaTrash, FaEye } from "react-icons/fa";
import useAxios from "../../../Hook/useAxios";
import toast from "react-hot-toast";

const ManageBookTable = ({ booking, bookibgId, refetch }) => {
    const axiosInstance = useAxios()
    const handleDelete = async () => {
        const res = await axiosInstance.delete(`/delete-booking/${bookibgId}`)
        
        if (res.data.deletedCount > 0) {
            toast.success("Booking deleted successfully!");
            refetch();
        }

    }
    return (
        <tr
            className="
                border-b border-border 
                hover:bg-surface/60 
                transition 
                text-black dark:text-white
            "
        >

            <td className="py-4 px-4 font-medium">{booking.name}</td>


            <td className="py-4 px-4 text-text-secondary">{booking.email}</td>


            <td className="py-4 px-4 font-semibold text-primary">
                {booking.car?.name}
            </td>

            <td className="py-4 px-4 text-text-secondary">
                {booking.pickupDate}
            </td>

            <td className="py-4 px-4 text-text-secondary">
                {booking.returnDate}
            </td>

            <td className="py-4 px-4">
                <span
                    className={`
                        px-3 py-1 rounded-full text-sm font-medium
                        ${booking.paymentStatus === "pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-600/20 text-green-400"
                        }
                    `}
                >
                    {booking.paymentStatus}
                </span>
            </td>

            <td className="py-4 px-4 flex gap-3">


                <button onClick={handleDelete} className="
                    flex items-center gap-2 
                    bg-red-600 text-white px-4 py-2 rounded-lg 
                    hover:bg-red-700 transition
                ">
                    <FaTrash /> Delete
                </button>
            </td>
        </tr>
    );
};

export default ManageBookTable;
