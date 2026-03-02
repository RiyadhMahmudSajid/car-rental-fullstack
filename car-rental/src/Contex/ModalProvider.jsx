import React, { useState } from 'react';
import { createContext } from "react";

export const ModalContxt = createContext();


const ModalProvider = ({children}) => {
    const [showModal, setShowModal] = useState(false)

    const openModal = {
        showModal, 
        setShowModal
    }

    return <ModalContxt value={openModal}>
        {children}
    </ModalContxt>
};

export default ModalProvider;