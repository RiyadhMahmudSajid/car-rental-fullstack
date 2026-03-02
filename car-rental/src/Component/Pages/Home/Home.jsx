import React from 'react';
import Hero from '../../Hero';
import Featured from '../../Featured';
import QualityFeatured from '../../QualityFeatured';
import Footer from '../../Footer';
import WhyChoose from '../../WhyChoose';
import HowItWork from '../../HowItWork';
import Testomonial from '../../Testomonial';
import CarFleetCTA from '../../CarFleetCTA';


const Home = () => {
    return (
        <div>
           <Hero></Hero>
           <Featured></Featured>
           <QualityFeatured></QualityFeatured>
           <WhyChoose></WhyChoose>
           <HowItWork></HowItWork>
           <CarFleetCTA></CarFleetCTA>

           <Testomonial></Testomonial>
        </div>
    );
};

export default Home;