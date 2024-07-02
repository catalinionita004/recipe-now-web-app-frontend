import React, { useState, useEffect } from 'react';

const RecipeImage = ({ imageUrl, defaultImageUrl, altText }) => {
    const [currentImageUrl, setCurrentImageUrl] = useState(defaultImageUrl);

    useEffect(() => {
        let isMounted = true;  // Flag to check if the component is still mounted

        const checkImageUrl = async (url) => {
            try {
                const response = await fetch(url, { method: 'HEAD' });
                if (isMounted) {
                    if (response.ok) {
                        setCurrentImageUrl(url);
                    } else {
                        setCurrentImageUrl(defaultImageUrl);
                    }
                }
            } catch (error) {
                if (isMounted) {
                    setCurrentImageUrl(defaultImageUrl);
                }
            }
        };

        // Check if imageUrl is not null or undefined
        if (imageUrl && imageUrl.trim() !== '') {
            checkImageUrl(imageUrl);
        } else {
            setCurrentImageUrl(defaultImageUrl);
        }

        return () => {
            isMounted = false;  // Cleanup function to set the flag to false
        };
    }, [imageUrl, defaultImageUrl]);

    return (
        <img
            src={currentImageUrl}
            alt={altText}
            className="h-100 rounded-5 cursor-pointer image-zoom"
        />
    );
};

export default RecipeImage;
