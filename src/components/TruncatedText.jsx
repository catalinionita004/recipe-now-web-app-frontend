import React, { useRef, useEffect } from 'react';

const TruncatedText = ({ text }) => {
    const textRef = useRef(null);

    useEffect(() => {
        const textElement = textRef.current;
        if (textElement.scrollWidth > textElement.offsetWidth) {
            textElement.title = text;
        }
    }, [text]);

    return (
        <h1 ref={textRef}>{text}</h1>
    );
};

export default TruncatedText;
