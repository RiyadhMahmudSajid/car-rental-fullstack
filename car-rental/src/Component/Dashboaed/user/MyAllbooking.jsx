import React, { useContext, useState } from 'react';
import useAxios from '../../Hook/useAxios';
import { useQuery } from '@tanstack/react-query';
import { AuthContex } from '../../../Contex/AuthProvider';
import { ModalContxt } from '../../../Contex/ModalProvider';
import Payment from '../../Payment/Payment';
import { FaCalendarAlt, FaCreditCard, FaTrashAlt, FaCar } from 'react-icons/fa';
import Loading from '../../Loading/Loading';

const MyAllbooking = () => {
    const { showModal, setShowModal } = useContext(ModalContxt);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const { user } = useContext(AuthContex);
    const axiosInstance = useAxios();

    const { data: bookings = [], refetch, isLoading } = useQuery({
        queryKey: ['my-booking', user?.email],
        queryFn: async () => {
            const result = await axiosInstance.get(`/my-booking?email=${user.email}`);
            return result.data;
        }
    });

    const handleId = (id) => {
        setSelectedBookingId(id);
    };

    const handleDelete = async (id) => {
     
        const result = await axiosInstance.delete(`/mybooking-cancle/${id}?email=${user.email}`);
        refetch();
    };

    if (isLoading) return <Loading></Loading>

    return (
        <div className="bg-background min-h-screen p-4 md:p-8 transition-colors duration-300">
          
            <div className="max-w-7xl mx-auto mb-10">
                <h1 className="text-3xl md:text-4xl font-extrabold text-text-base flex items-center gap-3">
                    <FaCar className="text-primary" /> My Bookings
                </h1>
                <p className="text-text-secondary mt-2">Manage your current and upcoming vehicle rentals</p>
            </div>

          
            <div className="max-w-7xl mx-auto bg-surface rounded-3xl border border-border shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-primary/5 border-b border-border">
                                <th className="p-5 text-sm font-bold text-text-base uppercase tracking-wider">Vehicle</th>
                                <th className="p-5 text-sm font-bold text-text-base uppercase tracking-wider">Duration</th>
                                <th className="p-5 text-sm font-bold text-text-base uppercase tracking-wider">Total Price</th>
                                <th className="p-5 text-sm font-bold text-text-base uppercase tracking-wider">Status</th>
                                <th className="p-5 text-sm font-bold text-text-base uppercase tracking-wider text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border/50">
                            {bookings.map((booking) => (
                                <tr key={booking._id} className="hover:bg-primary/5 transition-colors group">
                               
                                    <td className="p-5">
                                        <div className="flex items-center gap-4">
                                            <div className="relative overflow-hidden rounded-2xl w-24 h-16 md:w-32 md:h-20 shadow-sm border border-border">
                                                <img
                                                    src={booking.car.image}
                                                    alt={booking.car.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-text-base text-lg leading-tight">{booking.car.name}</h3>
                                                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md uppercase mt-1 inline-block">
                                                    {booking.car.brand}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                 
                                    <td className="p-5">
                                        <div className="flex flex-col gap-1 text-sm text-text-secondary font-medium">
                                            <div className="flex items-center gap-2">
                                                <FaCalendarAlt className="text-primary text-xs" />
                                                <span>{booking.pickupDate}</span>
                                            </div>
                                            <div className="flex items-center gap-2 italic opacity-70">
                                                to {booking.returnDate}
                                            </div>
                                        </div>
                                    </td>

                                  
                                    <td className="p-5">
                                        <div className="text-lg font-bold text-text-base">
                                            ${booking.car.pricePerDay}
                                            <span className="text-xs text-text-secondary font-normal ml-1">/day</span>
                                        </div>
                                    </td>

                                  
                                    <td className="p-5">
                                        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm
                                            ${booking.paymentStatus === "paid"
                                                ? "bg-green-500/10 text-green-600 border-green-200"
                                                : "bg-amber-500/10 text-amber-600 border-amber-200"
                                            }`}>
                                            <span className={`w-2 h-2 rounded-full mr-2 ${booking.paymentStatus === "paid" ? "bg-green-500" : "bg-amber-500"}`}></span>
                                            {booking.paymentStatus}
                                        </span>
                                    </td>

                                  
                                    <td className="p-5">
                                        <div className="flex gap-3 justify-center">
                                            {booking.paymentStatus === "pending" && (
                                                <button
                                                    onClick={() => { setShowModal(true); handleId(booking._id); }}
                                                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95"
                                                >
                                                    <FaCreditCard className="text-xs" /> Pay Now
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(booking._id)}
                                                className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl border border-transparent hover:border-red-100 transition-all group/btn"
                                                title="Cancel Booking"
                                            >
                                                <FaTrashAlt className="group-hover/btn:scale-110 transition-transform" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

              
                {bookings.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="bg-surface inline-block p-6 rounded-full mb-4">
                            <FaCar className="text-5xl text-border" />
                        </div>
                        <p className="text-text-secondary text-lg">You haven't booked any cars yet.</p>
                    </div>
                )}
            </div>

         
            {showModal && <Payment id={selectedBookingId} refetch={refetch} />}
        </div>
    );
};

export default MyAllbooking;