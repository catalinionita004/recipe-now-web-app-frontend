import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ErrorAnimation = ({ errorMessage, showError }) => {
    useEffect(() => {
        if (showError) {
            toast.error(errorMessage, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: false,
                closeButton: false,
            });
        }
    }, [errorMessage, showError]);

    return null;
};

export default ErrorAnimation;
