import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContex } from '../../Contex/AuthProvider';
import { FiHome, FiUser, FiLogOut, FiMenu, FiPlusCircle, FiSettings, FiDollarSign, FiStar, FiClipboard } from "react-icons/fi";
import { BsCarFrontFill } from "react-icons/bs";
import { IoCloseSharp } from 'react-icons/io5';
import { FaHome } from 'react-icons/fa';

import Loading from '../Loading/Loading';

const DashboardSidebar = ({ role }) => {

    const { logOut } = useContext(AuthContex);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate()




    const adminLinks = [
        { to: "/dashboard", icon: FiHome, label: "Overview" },
        { to: "/dashboard/manage-car", icon: BsCarFrontFill, label: "Manage Cars" },
        { to: "/dashboard/add-car", icon: FiPlusCircle, label: "Add Car" },
        { to: "/dashboard/booking", icon: FiClipboard, label: "Bookings" },
        { to: "/dashboard/users", icon: FiUser, label: "Users" },
        { to: "/dashboard/reviews", icon: FiStar, label: "Reviews" },
        { to: "/dashboard/settings", icon: FiSettings, label: "Settings" },
    ];


    const userLinks = [
        { to: "/dashboard", icon: FiHome, label: "Overview" },
        { to: "/dashboard/my-bookings", icon: FiClipboard, label: "My Bookings" },
        { to: "/dashboard/my-payments", icon: FiDollarSign, label: "My Payments" },
        { to: "/dashboard/my-reviews", icon: FiStar, label: "My Reviews" },
        { to: "/dashboard/my-profile", icon: FiSettings, label: "Settings" },

    ];



    let navLinks = role === "Admin" ? adminLinks : userLinks;
   
    const handleLogOut = async () => {
        try {
            await logOut();
            navigate('/');

        } catch (error) {
            //
        }
    };

    return (
        <>

            <button
                onClick={() => setSidebarOpen(true)}
                className="fixed top-4 left-4 z-40 p-3 bg-surface border rounded-lg shadow-lg hover:bg-border transition lg:hidden"
            >
                <FiMenu className="w-6 h-6" />
            </button>

            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                />
            )}

            <aside
                className={`
                    fixed top-0 left-0 z-50 h-full w-64
                    bg-surface border-r border-border shadow-xl 
                    p-6 flex flex-col
                    transform transition-transform duration-300
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >

                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-[var(--color-primary)] rounded-xl flex items-center justify-center text-white font-black text-xl">
                            C
                        </div>
                        <span className="text-2xl font-black text-[var(--color-text-base)] tracking-tight">
                            Car<span className="text-[var(--color-primary)]">Ease</span>
                        </span>
                    </div>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-1 lg:hidden text-text-base hover:text-red-500 transition"
                    >
                        <IoCloseSharp className="w-7 h-7" />
                    </button>
                </div>

                <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.to === "/dashboard"}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `
    flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition
    ${isActive
                                    ? "bg-primary text-white shadow-md"
                                    : "hover:bg-border hover:text-primary"
                                }
    `
                            }
                        >
                            <link.icon className="w-5 h-5" />
                            {link.label}
                        </NavLink>
                    ))}

                </nav>


                <div className="mt-auto pt-6 border-t border-border ">
                    <Link
                        to='/'
                        className="flex items-center gap-3 w-full mb-2 px-4 py-3 bg-primary 
                        text-white font-semibold rounded-xl hover:bg-red-600 
                        transition shadow"
                    >
                        <FaHome className="w-5 h-5" /> Home
                    </Link>

                    <button
                        onClick={handleLogOut}
                        className="flex items-center gap-3 w-full px-4 py-3 bg-red-500 
                        text-white font-semibold rounded-xl hover:bg-red-600 
                        transition shadow"
                    >
                        <FiLogOut className="w-5 h-5" /> Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default DashboardSidebar;
