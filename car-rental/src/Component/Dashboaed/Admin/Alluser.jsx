import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxios from '../../Hook/useAxios';
import { FaTrashAlt, FaUserShield, FaUsers, FaSearch, FaEnvelope } from 'react-icons/fa';
import Loading from '../../Loading/Loading';

const Alluser = () => {
    const axiosInstance = useAxios();
    const [searchTerm, setSearchTerm] = useState("");

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['alluser'],
        queryFn: async () => {
            const res = await axiosInstance.get('/users'); 
            return res.data;
        }
    });

  

    const filteredUsers = users.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <Loading></Loading>

    return (
        <div className="p-6 md:p-10 bg-[var(--color-background)] min-h-screen transition-colors duration-300">
            

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-[var(--color-text-base)] flex items-center gap-3">
                        <FaUsers className="text-[var(--color-primary)]" /> User Management
                    </h1>
                    <p className="text-[var(--color-text-secondary)] mt-1 font-medium">
                        Manage roles and system access for {users.length} members.
                    </p>
                </div>

                <div className="relative w-full md:w-96">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
                    <input 
                        type="text" 
                        placeholder="Search by name or email..."
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-all bg-[var(--color-surface)] text-[var(--color-text-base)] shadow-sm"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-[var(--color-surface)] rounded-[2rem] border border-[var(--color-border)] shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[var(--color-border)] opacity-80">
                                <th className="px-8 py-5 text-xs font-bold uppercase text-[var(--color-text-secondary)] tracking-wider">User Details</th>
                                <th className="px-8 py-5 text-xs font-bold uppercase text-[var(--color-text-secondary)] tracking-wider">Contact</th>
                                <th className="px-8 py-5 text-xs font-bold uppercase text-[var(--color-text-secondary)] tracking-wider">Access Level</th>
                                <th className="px-8 py-5 text-xs font-bold uppercase text-[var(--color-text-secondary)] tracking-wider">Joined At</th>
                              
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border)]">
                            {filteredUsers.map((u) => (
                                <tr key={u._id} className="hover:bg-[var(--color-primary)]/5 transition-colors group">
                                 
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <img 
                                                    src={u.photo} 
                                                    alt={u.name} 
                                                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[var(--color-border)] group-hover:ring-[var(--color-primary)] transition-all"
                                                />
                                                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[var(--color-surface)] ${u.role === 'admin' ? 'bg-[var(--color-accent)]' : 'bg-green-500'}`}></div>
                                            </div>
                                            <div>
                                                <p className="font-bold text-[var(--color-text-base)] group-hover:text-[var(--color-primary)] transition-colors">{u.name}</p>
                                                <p className="text-[10px] text-[var(--color-text-secondary)] uppercase font-black tracking-tighter opacity-70">UID: {u._id.slice(-8)}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                                            <FaEnvelope className="opacity-50" size={14} />
                                            <span className="text-sm font-medium">{u.email}</span>
                                        </div>
                                    </td>

                                    <td className="px-8 py-5">
                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex w-fit items-center gap-2 border shadow-sm
                                            ${u.role === 'admin' 
                                                ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/20' 
                                                : 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20'}`}>
                                            {u.role === 'admin' ? <FaUserShield size={12} /> : <FaUsers size={12} />}
                                            {u.role}
                                        </span>
                                    </td>

                                    <td className="px-8 py-5 text-sm text-[var(--color-text-secondary)] font-medium">
                                        {new Date(u.created_at).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </td>

                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {filteredUsers.length === 0 && (
                    <div className="py-24 text-center">
                        <div className="bg-[var(--color-background)] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[var(--color-border)]">
                            <FaUsers size={32} className="text-[var(--color-text-secondary)] opacity-30" />
                        </div>
                        <h3 className="text-lg font-bold text-[var(--color-text-base)]">No users found</h3>
                        <p className="text-[var(--color-text-secondary)] max-w-xs mx-auto text-sm mt-1">
                            Try adjusting your search terms to find what you're looking for.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Alluser;