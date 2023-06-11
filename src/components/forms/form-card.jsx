import React from "react";
import { Link } from "react-router-dom";

import logo_white from "../../assets/images/logo-white.png";


const FormCard = (props) => {
     return (
          <form className="form-card h-100 w-75 mx-auto d-flex justify-content-center align-items-center" onSubmit={props.onSubmit}>
               <div className="d-flex align-items-center justify-content-center form-card w-50 border border-1 rounded-3 light-purple-border text-white flex-column p-3 position-relative">
                    {/* on refresh the logo show up late after all form */}
                    <Link to="/">
                         <img
                              src={logo_white}
                              alt="logo"
                              className="logo"
                         />
                    </Link>
                    <h1 className="mt-4">{props.title}</h1>
                    <div className="d-flex flex-column justify-content-around align-items-center w-100 h-75">
                         {props.children}
                    </div>
               </div>
          </form>
     );
};
export default FormCard;
