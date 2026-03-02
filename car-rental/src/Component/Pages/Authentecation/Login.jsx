import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { AuthContex } from '../../../Contex/AuthProvider';
import SocialLogin from './SocialLogin';
import { useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const Login = () => {
    const [show, setShow] = useState(false)
    const {signInUser } = useContext(AuthContex)
    const navigate = useNavigate()
    const location = useLocation()
  
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();




    const onSubmit =async(data) => {
       
        await signInUser(data.email,data.password)
        toast.success("Login successful")
        navigate(`${location.state?location.state : '/'}`)

    };

    return (
        <div className="bg-background min-h-screen py-16 transition-colors duration-300">
            <div className="max-w-sm mx-auto bg-surface p-8 md:p-10 rounded-xl shadow-2xl dark:shadow-text-secondary/20">


                <h2 className="text-3xl font-extrabold text-center mb-2 text-primary">
                    Welcome Back!
                </h2>
                <p className="text-center mb-10 text-text-secondary">
                    Sign in to continue renting cars.
                </p>


                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">


                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-2 text-text-base"
                        >
                            Email Address
                        </label>
                        <div className="relative">

                            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                            <input
                                type="email"
                                id="email"
                                placeholder="name@example.com"
                                className={`
                                    w-full py-3 pl-10 pr-4 rounded-lg  border-2 border-border bg-background 
                                    text-text-base focus:outline-none focus:border-primary 
                                   
                                `}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />
                        </div>
                        {errors.email && <p className="text-error text-xs mt-1 text-red-500">{errors.email.message}</p>}
                    </div>


                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium mb-2 text-text-base"
                        >
                            Password
                        </label>
                        <div className="relative">

                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />

                            <input
                                type={show ? 'text' : 'password'}
                                id="password"
                                placeholder="Enter your password"
                                className={`
                                    w-full py-3 pl-10 pr-4 rounded-lg border-2 border-border bg-background 
                                    text-text-base focus:outline-none focus:border-primary 
                                   
                                `}
                                {...register("password", {
                                    required: "Password is required"
                                })}
                            />
                            <button type='button' onClick={() => { setShow(!show) }} className='absolute  right-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5 '>
                                {
                                    show ? <FaEyeSlash className='w-5 h-5'></FaEyeSlash> : <FaEye className='w-5 h-5'></FaEye>
                                }
                            </button>
                        </div>
                        {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 mt-2 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary-dark transition-all duration-300 text-lg"
                    >
                        Login to Account
                    </button>
                </form>
                <SocialLogin></SocialLogin>

                <p className="text-center mt-6 text-sm text-text-secondary">
                    Don't have an account?
                    <a href="/register" className="text-primary font-semibold hover:underline ml-1">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
