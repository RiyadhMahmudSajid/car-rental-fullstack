import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../../Hook/useAxios';
import ManageBookTable from './ManageBookTable';
import Loading from '../../../Loading/Loading';

const MangeBooking = () => {
    const axiosInstance = useAxios();

    const { isPending, data: bookings = [], refetch } = useQuery({
        queryKey: ['allbooking'],
        queryFn: async () => {
            const res = await axiosInstance.get('/booking');

            return res.data;
        }
    });

    if (isPending) {
        return <Loading></Loading>
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-4xl font-extrabold text-text-base mb-6">
                Manage Bookings
            </h2>

            <div className="overflow-x-auto bg-surface p-6 rounded-2xl shadow-lg border border-border">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-border text-text-secondary">
                            <th className="py-3 px-4">User</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Car</th>
                            <th className="py-3 px-4">Pickup</th>
                            <th className="py-3 px-4">Return</th>
                            <th className="py-3 px-4">Payment</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-10 text-text-secondary text-xl">
                                    No bookings found
                                </td>
                            </tr>
                        ) : (
                            bookings.map((booking) => (
                                <ManageBookTable
                                    key={booking._id}
                                    bookibgId={booking._id}
                                    refetch={refetch}
                                    booking={booking}
                                />
                            ))
                        )}

                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default MangeBooking;
