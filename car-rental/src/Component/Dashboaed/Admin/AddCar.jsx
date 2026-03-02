import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { FaCarSide, FaDollarSign, FaImage, FaStar, FaGasPump, FaCogs, FaUsers } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { LuCalendar } from "react-icons/lu";
import useAxios from "../../Hook/useAxios";


const inputClass = "w-full p-3 rounded-lg border border-border bg-background text-text-base focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary duration-200 shadow-sm ";
const labelClass = " mb-1 font-semibold text-text-base flex items-center gap-1 ";

const AddCar = () => {
    const axiosInstance = useAxios()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = async data => {
        

        const imageFile = data.image[0];
        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_IMG}`,
            formData
        );
       
        const imageUrl = response.data.data.url;
       
        const carData = {
            ...data,
            image:imageUrl
        }
 
        const res = await axiosInstance.post('/car', carData)
       
        reset();
    };

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto bg-surface shadow-2xl rounded-2xl p-8 md:p-12 border border-border">

                <h2 className="text-4xl font-bold mb-8 text-primary border-b border-primary/30 pb-4 flex items-center gap-3">
                    <FaCarSide className="w-8 h-8" /> Add New Car
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                        <div>
                            <label className={labelClass}>
                                <FaCarSide className="text-accent/80" /> Car Name
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                placeholder="e.g., Audi R8 V10"
                                {...register("name", { required: "Car name is required" })}
                            />
                            {errors.name && <p className="text-error text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Brand */}
                        <div>
                            <label className={labelClass}>Brand</label>
                            <input
                                type="text"
                                className={inputClass}
                                placeholder="e.g., Audi, Toyota"
                                {...register("brand", { required: "Brand is required" })}
                            />
                            {errors.brand && <p className="text-error text-sm mt-1">{errors.brand.message}</p>}
                        </div>

                        <div>
                            <label className={labelClass}>Car Type</label>
                            <input
                                type="text"
                                className={inputClass}
                                placeholder="e.g., Supercar, SUV, Sedan"
                                {...register("type", { required: "Car Type is required" })}
                            />
                            {errors.type && <p className="text-error text-sm mt-1">{errors.type.message}</p>}
                        </div>


                        <div>
                            <label className={labelClass}>
                                <IoLocationOutline className="text-accent/80" /> Location
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                placeholder="e.g., San Francisco Bay Area"
                                {...register("location", { required: "Location is required" })}
                            />
                            {errors.location && <p className="text-error text-sm mt-1">{errors.location.message}</p>}
                        </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-border pt-6">


                        <div>
                            <label className={labelClass}>
                                <FaDollarSign className="text-green-500" /> Price per Day
                            </label>
                            <input
                                type="number"
                                className={inputClass}
                                placeholder="e.g., 749"
                                {...register("pricePerDay", {
                                    required: "Price is required",
                                    valueAsNumber: true
                                })}
                            />
                            {errors.pricePerDay && (
                                <p className="text-error text-sm mt-1">{errors.pricePerDay.message}</p>
                            )}
                        </div>

                        <div>
                            <label className={labelClass}>Currency</label>
                            <select
                                className={inputClass}
                                {...register("currency", { required: "Currency is required" })}
                            >
                                <option value="" disabled>Select Currency</option>
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="BDT">BDT (৳)</option>
                            </select>
                            {errors.currency && <p className="text-error text-sm mt-1">{errors.currency.message}</p>}
                        </div>


                        <div>
                            <label className={labelClass}>
                                <FaStar className="text-yellow-500" /> Rating
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                className={inputClass}
                                placeholder="e.g., 4.85"
                                {...register("rating", {
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Rating cannot be less than 0" },
                                    max: { value: 5, message: "Rating cannot be more than 5" }
                                })}
                            />
                            {errors.rating && <p className="text-error text-sm mt-1">{errors.rating.message}</p>}
                        </div>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-border pt-6">


                        <div>
                            <label className={labelClass}>
                                <FaCogs className="text-text-secondary/70" /> Transmission
                            </label>
                            <select
                                className={inputClass}
                                {...register("transmission", { required: "Transmission is required" })}
                            >
                                <option value="" disabled>Select Type</option>
                                <option value="Automatic">Automatic</option>
                                <option value="Manual">Manual</option>
                            </select>
                            {errors.transmission && (
                                <p className="text-error text-sm mt-1">{errors.transmission.message}</p>
                            )}
                        </div>


                        <div>
                            <label className={labelClass}>
                                <FaGasPump className="text-primary/70" /> Fuel Type
                            </label>
                            <select
                                className={inputClass}
                                {...register("fuelType", { required: "Fuel type is required" })}
                            >
                                <option value="" disabled>Select Fuel</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Electric">Electric</option>
                            </select>
                            {errors.fuelType && (
                                <p className="text-error text-sm mt-1">{errors.fuelType.message}</p>
                            )}
                        </div>


                        <div>
                            <label className={labelClass}>
                                <FaUsers className="text-text-secondary/70" /> Seats
                            </label>
                            <input
                                type="number"
                                className={inputClass}
                                placeholder="e.g., 2 / 4 / 7"
                                {...register("seats", {
                                    required: "Seats is required",
                                    valueAsNumber: true
                                })}
                            />
                            {errors.seats && <p className="text-error text-sm mt-1">{errors.seats.message}</p>}
                        </div>


                        <div>
                            <label className={labelClass}>
                                <LuCalendar className="text-accent/80" /> Model Year
                            </label>
                            <input
                                type="number"
                                className={inputClass}
                                placeholder="e.g., 2020"
                                {...register("year", { valueAsNumber: true })}
                            />
                        </div>


                        <div>
                            <label className={labelClass}>Availability</label>
                            <select className={inputClass} {...register("available")}>
                                <option value={true}>Available</option>
                                <option value={false}>Not Available</option>
                            </select>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 gap-6 border-t border-border pt-6">


                        <div>
                            <label className={labelClass}>Features (comma separated)</label>
                            <input
                                type="text"
                                className={inputClass}
                                placeholder="e.g., ABS, Sunroof, Turbo Boost"
                                {...register("features")}
                            />
                        </div>


                        <div>
                            <label className={labelClass}>Description</label>
                            <textarea
                                rows="4"
                                className={`${inputClass} resize-none`}
                                placeholder="Write car details..."
                                {...register("description")}
                            ></textarea>
                        </div>


                        <div className="pt-4">
                            <label className={labelClass}>
                                <FaImage className="text-primary" /> Car Image (Upload)
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                className={`${inputClass} pt-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20`}
                                {...register("image", { required: "Car image is required" })}
                            />
                            {errors.image && <p className="text-error text-sm mt-1">{errors.image.message}</p>}
                        </div>

                    </div>


                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-4 mt-8 rounded-xl font-bold text-xl hover:bg-primary-dark transition-all duration-300 shadow-lg"
                    >
                        Add Car
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCar;
