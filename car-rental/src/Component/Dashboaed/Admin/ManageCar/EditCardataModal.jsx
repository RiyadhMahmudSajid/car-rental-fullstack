import React from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import useAxios from '../../../Hook/useAxios';

const EditCardataModal = ({ CloseModal, car, refetch }) => {
    const axiosInstance = useAxios()
    
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: car.name,
            brand: car.brand,
            type: car.type,
            image: car.image,
            pricePerDay: car.pricePerDay,
            currency: car.currency,
            available: car.available
        }
    });
    const onSubmit = async (data) => {
        const res = await axiosInstance.put(`/update-car/${car._id}`, data);
       
        if (res.data.modifiedCount > 0) {
            refetch();
            CloseModal();
        }

    }
    return (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">


            <div className="
                bg-surface border border-border 
                rounded-2xl shadow-xl p-7 w-[430px] 
                animate-modalDrop relative
            ">


                <button
                    onClick={CloseModal}
                    className="
                        absolute -top-4 -right-4 bg-background text-text-base 
                        w-10 h-10 flex items-center justify-center
                        rounded-full shadow-lg border border-border
                        hover:bg-surface hover:rotate-90 transition-all duration-300
                    "
                >
                    <FaTimes size={18} />
                </button>

                {/* Header */}
                <h2 className="text-2xl font-semibold text-text-base mb-6 text-center">
                    Update Car Information
                </h2>

                {/* Input Fields */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                    <input {...register("name")} className="input-field h-12" />
                    <input {...register("brand")} className="input-field h-12" />
                    <input {...register("type")} className="input-field h-12" />
                    <input {...register("image")} className="input-field h-12" />

                    <input
                        {...register("pricePerDay")}
                        type="number"
                        className="input-field h-12"
                    />

                    <select {...register("currency")} className="input-field h-12">
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="BDT">BDT (৳)</option>
                    </select>

                    <select {...register("available")} className="input-field h-12">
                        <option value={true}>Available</option>
                        <option value={false}>Unavailable</option>
                    </select>

                    {/* Buttons */}
                    <div className="mt-7 flex justify-end gap-3">
                        <button
                            onClick={CloseModal}
                            type="button"
                            className="px-5 py-2 bg-border rounded-lg text-text-base hover:bg-border/80"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-2 bg-primary text-white rounded-lg shadow-md hover:opacity-90 hover:scale-[1.02] transition-all"
                        >
                            Save Changes
                        </button>
                    </div>

                </form>



            </div>
        </div>
    );
};

export default EditCardataModal;
