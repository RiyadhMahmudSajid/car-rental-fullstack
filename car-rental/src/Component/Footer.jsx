import React from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-surface border-t border-border pt-16 pb-8 transition-colors duration-300 ">
            <div className="container max-w-7xl mx-auto px-6 ">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20">
                                C
                            </div>
                            <span className="text-2xl font-black text-text-base tracking-tight italic uppercase">
                                Car<span className="text-primary font-black">Ease</span>
                            </span>
                        </div>
                        <p className="text-text-secondary leading-relaxed text-sm font-medium max-w-xs">
                            Experience the ultimate freedom on the road. Premium car rental services tailored to your journey.
                        </p>
                        <div className="flex gap-4">
                            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                                <a key={index} href="#" className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300">
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>

      
                    <div className="md:text-center lg:text-left">
                        <h4 className="text-text-base font-black text-sm uppercase tracking-[0.2em] mb-8 italic">
                            Quick Menu
                        </h4>
                        <ul className="space-y-4 text-sm font-bold flex flex-col md:items-center lg:items-start">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Cars', path: '/all-car' }, 
                                { name: 'My Bookings', path: '/my-booking' },
                                { name: 'Contact', path: '/contact' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className="text-text-secondary hover:text-primary flex items-center gap-2 group transition-all duration-300">
                                        <FaChevronRight size={10} className="group-hover:translate-x-1 transition-transform text-primary" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-text-base font-black text-sm uppercase tracking-[0.2em] mb-8 italic">
                            Get In Touch
                        </h4>
                        <div className="space-y-5">
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 rounded-xl bg-background border border-border text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    <FaPhoneAlt size={14} />
                                </div>
                                <p className="text-sm text-text-base font-black">
                                    +880 1234 567 890
                                </p>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 rounded-xl bg-background border border-border text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    <FaEnvelope size={14} />
                                </div>
                                <p className="text-sm text-text-secondary font-medium">
                                    support@carease.com
                                </p>
                            </div>
                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-xl bg-background border border-border text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    <FaMapMarkerAlt size={16} />
                                </div>
                                <p className="text-sm text-text-secondary font-medium leading-snug">
                                    Gulshan, Dhaka, Bangladesh
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
                    <p>© {currentYear} CarEase. All rights reserved.</p>
                    <div className="flex gap-8">
                        <span>Privacy Policy</span>
                        <span>Terms & Conditions</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;