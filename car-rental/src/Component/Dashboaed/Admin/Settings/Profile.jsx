import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaCamera, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { AuthContex } from "../../../../Contex/AuthProvider";
import useAxios from "../../../Hook/useAxios";



const Profile = () => {
  const { user, upDateUser, setUser } = useContext(AuthContex);
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
    },
  });


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let imageUrl = user?.photoURL;

      if (data.photoURL?.length > 0) {
        const formData = new FormData();
        formData.append("image", data.photoURL[0]);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_IMG}`,
          formData
        );
        imageUrl = res.data.data.display_url;
      }

      await upDateUser({
        displayName: data.name,
        photoURL: imageUrl,
      });

      setUser({
        ...user,
        displayName: data.name,
        photoURL: imageUrl,
      });

      await axiosInstance.patch("/user/profile", {
        email: user.email,
        name: data.name,
        photo: imageUrl,
      });


    } catch (err) {
      //
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
            <h1 className="text-3xl font-black text-text-base italic">Account Settings</h1>
            <p className="text-text-secondary">Manage your profile information and account security.</p>
        </div>

        <div className="bg-surface rounded-[2.5rem] border border-border shadow-xl overflow-hidden">
          {/* Top Banner Accent */}
          <div className="h-32 bg-gradient-to-r from-primary to-blue-400 relative"></div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 pt-0 relative">
            
      
            <div className="flex flex-col items-center -mt-16 mb-8">
                <div className="relative group">
                    <div className="w-32 h-32 rounded-[2.5rem] border-4 border-surface shadow-lg overflow-hidden bg-background">
                        <img
                            src={preview || user?.photoURL || "https://i.ibb.co/mR3hPPt/user-placeholder.png"}
                            alt="profile"
                            className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                        />
                    </div>
                    <label className="absolute bottom-1 right-1 bg-primary text-white p-3 rounded-2xl cursor-pointer shadow-lg hover:bg-blue-700 transition-all border-4 border-surface">
                        <FaCamera size={18} />
                        <input
                            type="file"
                            className="hidden"
                            {...register("photoURL")}
                            onChange={handleImageChange}
                        />
                    </label>
                </div>
                <h2 className="mt-4 text-xl font-bold text-text-base">{user?.displayName || "User Name"}</h2>
                <p className="text-sm text-text-secondary flex items-center gap-2">
                    <FaEnvelope className="text-primary/50" /> {user?.email}
                </p>
            </div>

            <div className="space-y-6">
    
                <div>
                    <label className="block text-sm font-bold text-text-base mb-2 ml-1">Display Name</label>
                    <div className="relative group">
                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Your full name"
                            className={`w-full py-4 pl-12 pr-4 rounded-2xl border ${errors.name ? 'border-error' : 'border-border'} bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium`}
                            {...register("name", { required: "Name is required" })}
                        />
                    </div>
                    {errors.name && <p className="text-error text-xs mt-2 ml-2 font-medium">{errors.name.message}</p>}
                </div>


                <div>
                    <label className="block text-sm font-bold text-text-base mb-2 ml-1">Email Address</label>
                    <div className="relative opacity-60">
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                        <input
                            type="email"
                            value={user?.email || ""}
                            readOnly
                            className="w-full py-4 pl-12 pr-4 rounded-2xl border border-border bg-gray-100 dark:bg-gray-800 cursor-not-allowed outline-none font-medium"
                        />
                    </div>
                    <p className="text-[10px] text-text-secondary mt-2 ml-1 italic">* Email cannot be changed for security reasons.</p>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 disabled:bg-gray-400 flex items-center justify-center gap-3"
                    >
                        {loading ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            <>
                                <FaCheckCircle /> Save Profile Changes
                            </>
                        )}
                    </button>
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;