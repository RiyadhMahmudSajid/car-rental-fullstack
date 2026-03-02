import React, { useContext, useState } from "react";
import { FaCreditCard, FaMobileAlt, FaShieldAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import useAxios from "../Hook/useAxios";
import { ModalContxt } from "../../Contex/ModalProvider";
import toast from "react-hot-toast";


const Payment = ({ id, refetch }) => {
  const { setShowModal } = useContext(ModalContxt);
  const axiosInstance = useAxios();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { payment: "card" },
  });

  const paymentMethod = watch("payment");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await axiosInstance.patch(`/paymentStatus/${id}`, {
       
      });
     

      if (result.data.modifiedCount > 0) {
        toast.success("Payment success")
        setShowModal(false);
        refetch();
        reset();
      }
    } catch (error) {
      
      toast.error("Payment failed:");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 p-4">
      <div className="bg-surface w-full max-w-md rounded-[2.5rem] shadow-2xl border border-border relative overflow-hidden animate-zoom-in">
        
        <div className="bg-primary h-2 w-full"></div>

        <div className="p-8">
      
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-1 right-6 p-2 rounded-full hover:bg-red-50 text-text-secondary hover:text-red-500 transition-all duration-300"
          >
            <IoClose size={24} />
          </button>

          {/* <div className="text-center mb-8">
            <div className="bg-primary/10 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 text-primary">
                <FaShieldAlt size={30} />
            </div>
            <h1 className="text-2xl font-black text-text-base">Checkout</h1>
            <p className="text-text-secondary text-sm mt-1 font-medium">Secure Payment Gateway</p>
          </div> */}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <div className="grid grid-cols-1 gap-3">

              <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border bg-background hover:border-primary/50'}`}>
                <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl ${paymentMethod === 'card' ? 'bg-primary text-white' : 'bg-surface text-text-secondary'}`}>
                        <FaCreditCard size={20} />
                    </div>
                    <span className="font-bold text-text-base">Card Payment</span>
                </div>
                <input type="radio" value="card" {...register("payment")} className="w-5 h-5 accent-primary" />
              </label>


              <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${paymentMethod === 'mobile' ? 'border-pink-500 bg-pink-50/30' : 'border-border bg-background hover:border-pink-500/50'}`}>
                <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl ${paymentMethod === 'mobile' ? 'bg-pink-500 text-white' : 'bg-surface text-text-secondary'}`}>
                        <FaMobileAlt size={20} />
                    </div>
                    <span className="font-bold text-text-base">MFS (Bkash/Nagad)</span>
                </div>
                <input type="radio" value="mobile" {...register("payment")} className="w-5 h-5 accent-pink-500" />
              </label>
            </div>

            <div className="min-h-[100px] transition-all">
              {paymentMethod === "card" && (
                <div className="space-y-3 animate-slide-up">
                  <input
                    type="text"
                    placeholder="Card Holder Name"
                    {...register("cardHolder", { required: "Name is required" })}
                    className="w-full p-4 rounded-xl border border-border bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                  />
                  <input
                    type="text"
                    placeholder="XXXX XXXX XXXX XXXX"
                    {...register("cardNumber", { required: "Card number required" })}
                    className="w-full p-4 rounded-xl border border-border bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                  />
                </div>
              )}

              {paymentMethod === "mobile" && (
                <div className="animate-slide-up">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-text-secondary">+88</span>
                    <input
                      type="number"
                      placeholder="01XXXXXXXXX"
                      {...register("mobileNumber", { required: "Mobile number required" })}
                      className="w-full p-4 pl-14 rounded-xl border border-border bg-background focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="bg-surface p-3 rounded-xl border border-border flex items-start gap-3">
                <div className="text-primary mt-0.5"><FaShieldAlt size={14} /></div>
                <p className="text-[10px] text-text-secondary leading-tight">Your transaction is encrypted and secured. By clicking "Pay Now", you agree to our terms.</p>
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className={`w-full cursor-pointer py-4 rounded-2xl font-bold text-white shadow-lg transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${paymentMethod === 'card' ? 'bg-primary shadow-primary/20 hover:bg-primary/90' : 'bg-pink-500 shadow-pink-500/20 hover:bg-pink-600'}`}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Complete Payment"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;