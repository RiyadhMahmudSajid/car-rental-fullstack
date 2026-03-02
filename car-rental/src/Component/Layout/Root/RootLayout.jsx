import React from 'react';

import { Outlet } from 'react-router';
import Navbar from '../../Navbar';
import Footer from '../../Footer';
import ScrollToTop from '../../ScrollToTop/ScrollToTop';

const RootLayout = () => {
    return (
        <div>
            <ScrollToTop></ScrollToTop>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;