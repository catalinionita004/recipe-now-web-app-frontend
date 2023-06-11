import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

import Circle from "../components/animation/circle";
import Header from "../components/header/Header";

const Home = () => {
     const cookies = new Cookies();
     const history = useHistory();

     useEffect(() => {
          document.title = "Home | RecipeNow";

          if (isUserAuthenticatedCookie()) {
               history.push("/recipes-recommendations");
          }
     });

     const isUserAuthenticatedCookie = () => {
          return cookies.get("bn_aut");
     };

     const [timeNow, setTimeNow] = useState("");

     useEffect(() => {
          document.title = "Home | RecipeNow";

          setInterval(() => {
               setTimeNow(
                    `${
                         new Date().getHours() > 12
                              ? new Date().getHours() % 12
                              : new Date().getHours()
                    } : ${new Date().getMinutes()} : ${new Date().getSeconds()} ${
                         new Date().getHours() > 12 ? "PM" : "AM"
                    }`
               );
          }, 1000);

          // console.log(timeNow);
     });

     return (
          <div className="home-route position-relative w-100 vh-100 overflow-hidden">
               <Header />     
               <Circle
                    size="7"
                    backgroundColor="beige"
                    duration="25"
                    top="150"
                    right="400"
               />
               <Link to="/recipes-recommendations">
                    <Circle
                         size="20"
                         backgroundColor="light-purple"
                         duration="30"
                         top="300"
                         right="400"
                         hover
                    >
                         Recipe Recommendation
                    </Circle>
               </Link>
               <Circle
                    size="10"
                    backgroundColor="beige"
                    duration="15"
                    bottom="90"
                    left="400"
               />

               <Circle
                    size="8"
                    backgroundColor="beige"
                    duration="23"
                    bottom="60"
                    right="600"
               />

               <Circle
                    size="8"
                    backgroundColor="beige"
                    duration="31"
                    bottom="550"
                    left="200"
               />

               <Circle
                    size="4"
                    backgroundColor="light-purple"
                    duration="20"
                    bottom="550"
                    left="600"
               />

               <Circle
                    size="6"
                    backgroundColor="beige"
                    duration="27"
                    bottom="300"
                    right="100"
               />

               <Circle
                    size="6"
                    backgroundColor="light-purple"
                    duration="37"
                    bottom="200"
                    left="150"
               />

               <Link to="/sign-in">
                    <Circle
                         size="15"
                         backgroundColor="light-purple"
                         duration="20"
                         bottom="150"
                         left="400"
                         hover
                    >
                         Sign In
                    </Circle>
               </Link>
               <Link to="/sign-up">
                    <Circle
                         size="10"
                         backgroundColor="light-purple"
                         duration="21"
                         bottom="100"
                         right="150"
                         hover
                    >
                         Sign Up
                    </Circle>
               </Link>

               <div className="time-now position-absolute h-100 bottom-0 end-0 d-flex justify-content-center align-items-center">
                    <p className="time text-white fs-3 m-0 w-100">{timeNow}</p>
               </div>
          </div>
     );
};

export default Home;
