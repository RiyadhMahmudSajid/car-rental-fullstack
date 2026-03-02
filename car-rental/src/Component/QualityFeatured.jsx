import React, { useEffect, useState } from 'react';
import qualityimg from '../assets/Quality.jpg';
import { motion } from "motion/react";
import { useQuery } from '@tanstack/react-query';
import useAxios from './Hook/useAxios';
import Loading from './Loading/Loading';
const QualityFeatured = () => {
    const axiosInstance = useAxios()
    const { data: quality = [], isLoading } = useQuery({
        queryKey: ['quality'],
        queryFn: async () => {
            const result = await axiosInstance.get('/quality')
            
            return result.data
        }
    })
 
    const subsections = quality[0]?.subsections || [];

    const [activeTab, setActiveTab] = useState(null);

    useEffect(() => {
        if (subsections.length && !activeTab) {
            setActiveTab(subsections[0].subtitle);
        }
    }, [subsections, activeTab]);

    const activeContent = subsections.find(
        (item) => item.subtitle === activeTab
    )
   

    if (isLoading) return <Loading></Loading>
    if (!quality.length) return null;

    const { title, image } = quality[0];
    


    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-20   bg-surface py-16 md:py-20 lg:py-24 px-8 lg:px-24">

            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="w-full  flex-1 ">
                <img src={image} alt="Quality Cars" className="rounded-2xl  w-full object-cover bg-center " />
            </motion.div>


            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="flex-1">
                <h2 className="text-4xl md:text-3xl lg:text-4xl font-extrabold dark:text-white ">
                    {title}
                </h2>


                <div className="flex flex-wrap gap-4 my-10 md:my-6 lg:my-10">
                    {subsections.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.subtitle)}
                            className={`px-3 cursor-pointer lg:px-5 py-0.5 lg:py-2 rounded-lg font-semibold border transition-all duration-300 ${activeTab === tab.subtitle
                                ? "bg-primary text-white border-primary"
                                : "bg-transparent border-gray-400 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {tab.subtitle}
                        </button>
                    ))}
                </div>


                <div className="max-w-3xl text-gray-700 leading-relaxed mx-auto pr-0 md:pr-0 lg:pr-4">



                    <p className='text-text-secondary'>
                        {activeContent?.description}
                    </p>

                </div>
            </motion.div>
        </div>
    );
};

export default QualityFeatured;
