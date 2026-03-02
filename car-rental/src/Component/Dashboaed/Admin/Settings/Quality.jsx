import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCloudUploadAlt, FaHeading, FaTextHeight, FaCheckCircle } from "react-icons/fa";
import useAxios from "../../../Hook/useAxios";
import toast from "react-hot-toast";


const Quality = () => {
    const [loading, setLoading] = useState(false);
    const axiosInstance = useAxios()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const imageFile = data.image[0];
            const formData = new FormData();
            formData.append("image", imageFile);

            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_IMG}`,
                formData
            );

            const imageUrl = res.data.data.display_url;
           

            const qualityData = {
                title: data.title,
                image: imageUrl,
                subsections: [
                    { subtitle: data.subtitle1, description: data.p1forsub1 },
                    { subtitle: data.subtitle2, description: data.p2forsub2 },
                    { subtitle: data.subtitle3, description: data.p3forsub3 },
                ]
            };



            const result = axiosInstance.post('/qualityData',qualityData)

           
            if(result.data.insertedId){

                toast.success('Quality data is send')
            }
            else{
                toast.error('Quality data cannot send')
            }


            reset();

        } catch (error) {
            
            toast.error('From can not submit')

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background p-4 md:p-10">
            <div className="max-w-6xl mx-auto bg-surface rounded-[2rem] shadow-xl border border-border overflow-hidden">

                <div className="bg-primary p-8 text-white">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <FaCheckCircle className="text-accent" /> Create Quality Section
                    </h2>
                    <p className="text-blue-100 mt-2">Add high-quality features and descriptions to your fleet services.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        <div className="space-y-4">
                            <label className="text-sm font-bold text-text-base flex items-center gap-2">
                                <FaHeading className="text-primary" /> Main Section Title
                            </label>
                            <input
                                type="text"
                                className={`w-full px-5 py-4 rounded-2xl border ${errors.title ? 'border-error' : 'border-border'} bg-background focus:ring-4 focus:ring-primary/10 outline-none transition-all`}
                                placeholder="e.g., Why Choose Our Quality Service?"
                                {...register("title", { required: "Title is required" })}
                            />
                            {errors.title && <p className="text-error text-xs ml-2">{errors.title.message}</p>}
                        </div>


                        <div className="space-y-4">
                            <label className="text-sm font-bold text-text-base flex items-center gap-2">
                                <FaCloudUploadAlt className="text-primary text-lg" /> Feature Image
                            </label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    {...register("image", { required: "Image is required" })}
                                />
                                <div className="border-2 border-dashed border-border group-hover:border-primary rounded-2xl p-4 transition-all bg-background text-center">
                                    <FaCloudUploadAlt className="mx-auto text-3xl text-text-secondary group-hover:text-primary mb-2" />
                                    <p className="text-xs text-text-secondary group-hover:text-primary">Click or Drag to upload image</p>
                                </div>
                            </div>
                            {errors.image && <p className="text-error text-xs ml-2">{errors.image.message}</p>}
                        </div>
                    </div>

                    <hr className="border-border" />


                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-text-base border-l-4 border-accent pl-3">Sub-features & Descriptions</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            <div className="p-5 bg-background rounded-2xl border border-border space-y-3">
                                <input {...register("subtitle1", { required: true })} placeholder="Subtitle 1" className="w-full font-bold bg-transparent outline-none border-b border-border focus:border-primary pb-1" />
                                <textarea {...register("p1forsub1", { required: true })} placeholder="Description 1" rows="3" className="w-full text-sm bg-transparent outline-none resize-none" />
                            </div>


                            <div className="p-5 bg-background rounded-2xl border border-border space-y-3">
                                <input {...register("subtitle2", { required: true })} placeholder="Subtitle 2" className="w-full font-bold bg-transparent outline-none border-b border-border focus:border-primary pb-1" />
                                <textarea {...register("p2forsub2", { required: true })} placeholder="Description 2" rows="3" className="w-full text-sm bg-transparent outline-none resize-none" />
                            </div>


                            <div className="p-5 bg-background rounded-2xl border border-border space-y-3">
                                <input {...register("subtitle3", { required: true })} placeholder="Subtitle 3" className="w-full font-bold bg-transparent outline-none border-b border-border focus:border-primary pb-1" />
                                <textarea {...register("p3forsub3", { required: true })} placeholder="Description 3" rows="3" className="w-full text-sm bg-transparent outline-none resize-none" />
                            </div>
                        </div>
                    </div>


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white font-bold py-5 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 disabled:bg-gray-400"
                    >
                        {loading ? "Uploading & Saving..." : "Create Quality Section"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Quality;