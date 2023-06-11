import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SuccessAnimation = ({ successMessage, showSuccess }) => {
  useEffect(() => {
    if (showSuccess) {
      toast.success(successMessage, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        closeButton: false,
      });
    }
  }, [successMessage, showSuccess]);

  return null;
};

export default SuccessAnimation;
