import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContex } from '../../../Contex/AuthProvider';
import toast from 'react-hot-toast';
import useAxios from '../../Hook/useAxios';
import { useNavigate } from 'react-router';

const SocialLogin = () => {
    const { googleLogin } = useContext(AuthContex)
    const axiosInstance = useAxios()
    const navigate = useNavigate()
    const handleGoogleSignIn = async () => {
        try {
            const result = await googleLogin();
            const user = result.user;

            const userInfo = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                role: "user",
                created_at: new Date().toISOString(),
                last_login: new Date().toISOString()
            };
            await axiosInstance.post('/user', userInfo);

            toast.success("Login successful");
            navigate('/');

        } catch (error) {
           
            toast.error("Google login failed");
        }
    }

    return (
        <button
            onClick={handleGoogleSignIn}

            className={`
        w-full flex items-center justify-center gap-3 mt-4
        border-2 border-border
        rounded-lg py-2.5 px-4 
       text-text-base
       bg-background 
        hover:bg-gray-100 dark:hover:bg-gray-700 
        transition-all duration-200 ease-in-out
        shadow-sm hover:shadow-md
       
      `}
        >
            <FaGoogle className="w-5 h-5 text-red-500" />
            <span className="font-medium ">
                Continue with Google
            </span>
        </button>
    );
};

export default SocialLogin;