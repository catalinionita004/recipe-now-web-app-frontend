import React from "react";

const Circle = (props) => {
     return (
          <div
               className={`position-absolute d-flex justify-content-center align-items-center circle-container ${
                    props.hover && "circle-hover"
               }`}
               style={{
                    width: `${props.size}em`,
                    height: `${props.size}em`,
                    animationDuration: `${props.duration}s`,
                    top: `${props.top}px`,
                    bottom: `${props.bottom}px`,
                    right: `${props.right}px`,
                    left: `${props.left}px`,
               }}
          >
               {props.children && (
                    <p className="text-white text-center circle-text w-75 fs-4">
                         {props.children}
                    </p>
               )}
               <div
                    className={
                         "position-absolute rounded-circle circle d-flex justify-content-center align-items-center w-100 h-100 " +
                         props.backgroundColor +
                         "-background"
                    }
               />
          </div>
     );
};
export default Circle;
