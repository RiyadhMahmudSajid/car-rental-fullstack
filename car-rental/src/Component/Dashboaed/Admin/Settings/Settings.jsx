import React, { useState } from 'react';
import Quality from './Quality';
import Profile from './Profile';
import { FaUserCog, FaAward } from 'react-icons/fa';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
  
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-text-base italic uppercase tracking-tight">System Settings</h1>
                    <p className="text-text-secondary mt-1">Manage your personal profile and website quality content.</p>
                </div>

    
                <div className="flex flex-wrap gap-4 mb-8 bg-surface p-2 rounded-[2rem] border border-border w-fit shadow-sm">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`flex items-center gap-3 px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                            activeTab === 'profile' 
                            ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                            : 'text-text-secondary hover:bg-background'
                        }`}
                    >
                        <FaUserCog size={18} /> User Profile
                    </button>
                    
                    <button
                        onClick={() => setActiveTab('quality')}
                        className={`flex items-center gap-3 px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                            activeTab === 'quality' 
                            ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                            : 'text-text-secondary hover:bg-background'
                        }`}
                    >
                        <FaAward size={18} /> Quality Section
                    </button>
                </div>

             
                <div className="transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
                    {activeTab === 'profile' && <Profile />}
                    {activeTab === 'quality' && <Quality />}
                </div>
            </div>
        </div>
    );
};

export default Settings;