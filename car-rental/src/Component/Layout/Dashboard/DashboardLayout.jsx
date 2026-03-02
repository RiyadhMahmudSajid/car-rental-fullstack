import React, { useContext } from "react";
import { Outlet } from "react-router";
import DashboardSidebar from "../../Dashboaed/DashboardSidebar";
import { AuthContex } from "../../../Contex/AuthProvider";
import { ThemeContext } from "../../../Contex/ThemeProvider";
import { FaRegMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";
import useUserRole from "../../Hook/useUserRole";
import Loading from "../../Loading/Loading";

const DashboardLayout = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user } = useContext(AuthContex);
    const { role, allLoading } = useUserRole(); 

    if (allLoading) {
        return <Loading />;
    }
    return (
        <div className="flex bg-background text-text-base min-h-screen">


            <div className="hidden lg:block w-64"></div>


            <DashboardSidebar role={role} />

            <main className="flex-1 p-5 ">


                <div className="flex items-center justify-end gap-6 mb-8 pb-6 border-b border-border/60">

                    <button
                        onClick={toggleTheme}
                        className="relative p-3 rounded-2xl bg-surface border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group overflow-hidden"
                    >
                        <div className="relative z-10 transition-transform duration-500 group-hover:rotate-12">
                            {theme === "light" ? (
                                <FaRegMoon size={20} className="text-primary" />
                            ) : (
                                <LuSun size={20} className="text-primary" />
                            )}
                        </div>

                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>


                    <div className="flex items-center gap-4 pl-4 border-l border-border/60 group cursor-pointer">
                        <div className="text-right hidden sm:block">
                            <h2 className="text-sm font-bold text-text-base group-hover:text-primary transition-colors leading-none">
                                {user?.displayName || "User Name"}
                            </h2>
                            <p className="text-[10px] font-medium text-text-secondary mt-1 uppercase tracking-wider">
                                Active Now
                            </p>
                        </div>


                        <div className="relative">
                            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-all duration-300 shadow-sm">
                                <img
                                    className="w-full h-full object-cover"
                                    src={user?.photoURL || "no photo"}
                                    alt="Profile"
                                />
                            </div>

                            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-surface rounded-full"></span>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <Outlet context={{ role }} />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
