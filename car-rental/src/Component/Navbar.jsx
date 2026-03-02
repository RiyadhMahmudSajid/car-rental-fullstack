import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { ThemeContext } from '../Contex/ThemeProvider';
import { LuSun } from "react-icons/lu";
import { FaRegMoon } from "react-icons/fa";
import { IoCloseSharp } from 'react-icons/io5';
import { FiMenu } from 'react-icons/fi';
import { AuthContex } from '../Contex/AuthProvider';
import { CgProfile } from 'react-icons/cg';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user, logOut, loading } = useContext(AuthContex);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItem = [
        { name: "Home", path: '/' },
        { name: "Cars", path: '/all-car' },
        { name: 'My Booking', path: '/my-booking' },
        { name: 'Contact', path: '/contact' }
    ];

    const handleLogOut = () => {
        toast.success("Logout Successful");
        logOut();
    };

    const Logo = () => (
        <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl">
                C
            </div>
            <span className="text-2xl font-black text-text-base tracking-tight">
                Car<span className="text-primary">Ease</span>
            </span>
        </div>
    );

    return (
        <nav className="sticky top-0 z-20 shadow-md bg-surface text-text-base transition-colors duration-300">
            <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4 gap-2her">

                <button
                    onClick={() => setSidebarOpen(true)}
                    className="md:hidden p-2 text-text-base rounded-md border border-border hover:bg-border transition-colors"
                >
                    <FiMenu className="w-6 h-6" />
                </button>


                <div className="hidden md:block">
                    <Logo />
                </div>

       
                <div className="hidden md:flex items-center space-x-6 font-semibold">
                    {navItem.map(item => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `text-text-secondary hover:text-primary transition-colors duration-200 sm:text-sm
                                ${isActive ? 'text-primary font-bold border-b-2 border-primary' : ''}`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>

              
                <div className="flex items-center space-x-4">

                  
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-border text-text-secondary transition-colors"
                    >
                        {theme === 'light' ? <FaRegMoon size={20} /> : <LuSun size={20} />}
                    </button>

                    {user && (
                        <NavLink
                            to="/dashboard"
                            className="px-3 py-1 bg-surface border border-border rounded-lg text-text-base hover:bg-primary hover:text-white transition-colors"
                        >
                            Dashboard
                        </NavLink>
                    )}

                    <div>
                        {user?.photoURL ? (
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                <img className="w-full h-full" src={user.photoURL} />
                            </div>
                        ) : (
                            <CgProfile size={25} />
                        )}
                    </div>

                    {loading ? (
                        <div className="w-24 h-10 bg-gray-300 rounded-lg" />
                    ) : user ? (
                        <Link
                            onClick={handleLogOut}
                            className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity duration-200"
                        >
                            Logout
                        </Link>
                    ) : (
                        <NavLink
                            to="/login"
                            className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity duration-200"
                        >
                            Login
                        </NavLink>
                    )}
                </div>
            </div>

            <div
                className={`
                    fixed top-0 left-0 h-full w-64 bg-background text-text-base z-40 p-6
                    transform transition-transform duration-300
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:hidden
                `}
            >
                <div className="flex justify-between mb-8">
                    <Logo />
                    <IoCloseSharp
                        onClick={() => setSidebarOpen(false)}
                        className="w-7 h-7 cursor-pointer text-text-base"
                    />
                </div>

                <div className="flex flex-col gap-5 font-semibold">
                    {navItem.map(item => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className="text-text-base hover:text-primary"
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            </div>

           
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </nav>
    );
};

export default Navbar;
