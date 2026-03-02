import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaImage } from "react-icons/fa";
import { AuthContex } from '../../../Contex/AuthProvider';
import SocialLogin from './SocialLogin';
import useAxios from '../../Hook/useAxios';
import axios from 'axios';
import toast from 'react-hot-toast';
const Register = () => {
    const { createUser, upDateUser } = useContext(AuthContex);
    const axiosInstance = useAxios();
    const [show, setShow] = useState(false);
  
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            
            await createUser(data.email, data.password);

          const imageFile = data.photoURL[0]; 
            const formData = new FormData();
            formData.append('image', imageFile);

            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_IMG}`,
                formData
            );

           
            const imageUrl = response.data.data.url;
            
           
            const userProfile = {
                displayName: data.name,
                photoURL: imageUrl
            };
            await upDateUser(userProfile);

            const userInfo = {
                name: data.name,
                email: data.email,
                photo: imageUrl,
                role: "user",
                created_at: new Date().toISOString(),
                last_login: new Date().toISOString()
            };
            const res = await axiosInstance.post("/user", userInfo);
           
            toast.success("Account created successfully")
            

        } catch (error) {
            
             toast.error("Registration failed")
        }
    };

    return (
        <div className="bg-background min-h-screen py-16 transition-colors duration-300">
            <div className="max-w-md mx-auto bg-surface p-8 md:p-10 rounded-xl shadow-2xl dark:shadow-text-secondary/20">
                <h2 className="text-3xl font-extrabold text-center mb-2 text-primary">
                    Join GoDrive
                </h2>
                <p className="text-center mb-10 text-text-secondary">
                    Create your new account to start renting cars.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2 text-text-base">
                            Full Name
                        </label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your full name"
                                className={`w-full py-3 pl-10 pr-4 rounded-lg border-2 bg-background text-text-base focus:outline-none focus:border-primary ${errors.name ? 'border-error' : 'border-border'}`}
                                {...register("name", { required: "Name is required" })}
                            />
                        </div>
                        {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
                    </div>

      
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2 text-text-base">
                            Email Address
                        </label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                            <input
                                type="email"
                                id="email"
                                placeholder="name@example.com"
                                className={`w-full py-3 pl-10 pr-4 rounded-lg border-2 bg-background text-text-base focus:outline-none focus:border-primary ${errors.email ? 'border-error' : 'border-border'}`}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                })}
                            />
                        </div>
                        {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-2 text-text-base">
                            Password
                        </label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                            <input
                                type={show ? 'text' : 'password'}
                                id="password"
                                placeholder="Must be 6 characters long"
                                className={`w-full py-3 pl-10 pr-4 rounded-lg border-2 bg-background text-text-base focus:outline-none focus:border-primary ${errors.password ? 'border-error' : 'border-border'}`}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                                })}
                            />
                            <button type='button' onClick={() => setShow(!show)} className='absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5'>
                                {show ? <FaEyeSlash className='w-5 h-5' /> : <FaEye className='w-5 h-5' />}
                            </button>
                        </div>
                        {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
                    </div>

              
                    <div>
                        <label htmlFor="photoURL" className="block text-sm font-medium mb-2 text-text-base">
                            Profile Picture
                        </label>
                        <div className="relative">
                            <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                            <input
                                type="file"
                                id="photoURL"
                                className="w-full py-3 pl-10 pr-4 rounded-lg border-2 bg-background text-text-base focus:outline-none focus:border-primary border-border"
                                {...register("photoURL", { required: "Photo is required" })}
                            />
                        </div>
                    </div>

              
                    <button type="submit" className="w-full py-3 mt-4 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary-dark transition-all duration-300 text-lg">
                        Register Account
                    </button>
                </form>

               
                <SocialLogin />

                <p className="text-center mt-6 text-sm text-text-secondary">
                    Already have an account?
                    <a href="/login" className="text-primary font-semibold hover:underline ml-1">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
