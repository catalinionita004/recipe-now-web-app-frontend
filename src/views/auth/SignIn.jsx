import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../../store/actions/auth/auth-actions";
import { useFormik } from "formik";
import * as Yup from "yup";

import Cookies from "universal-cookie";

import FormCard from "../../components/forms/form-card";
import Circle from "../../components/animation/circle";
import BookmarkButton from "../../components/buttons/bookmark-button";
import SuccessAnimation from "../../components/SuccessAnimation";

const SignIn = () => {
     const cookies = new Cookies();
     const { t } = useTranslation();
     const dispatch = useDispatch();
     const history = useHistory();

     const state = useSelector((state) => state.auth);
     const userRegistration = useSelector((state) => state.user.registrationSucceeded);

     console.log("userRegistraton " + userRegistration)


     const formik = useFormik({
          initialValues: {
               username: "",
               password: "",
               keepLogged: false,
          },
          validationSchema: Yup.object({
               username: Yup.string()
                    .required(t("signIn:required")),
               password: Yup.string().required(t("signIn:required")),
          }),
          onSubmit: (values) => {
               dispatch(authenticateUser(values));
          },
     });

     useEffect(() => {
          document.title = "Sign In | RecipeNow";

          if (isUserAuthenticatedCookie()) {
               history.push("/");
          }
     });

     const isUserAuthenticatedCookie = () => {
          return cookies.get("bn_aut");
     };

     return (
          <div className="sign-in-route vh-100 w-100 position-relative overflow-hidden">
               <SuccessAnimation successMessage={"Congrats"} showSuccess={userRegistration} />
               <Circle
                    size="10"
                    backgroundColor="beige"
                    duration="25"
                    top="15"
                    left="-150"
               />
               <Circle
                    size="15"
                    backgroundColor="light-purple"
                    duration="40"
                    bottom="-100"
                    left="-120"
               />
               <Circle
                    size="12"
                    backgroundColor="light-purple"
                    duration="20"
                    top="200"
                    right="-200"
               />
               <FormCard
                    onSubmit={formik.handleSubmit}
                    title={t("signIn:signIn")}
               >
                    <div className="w-100 d-flex flex-column align-items-center ">
                         <input
                              type="text"
                              autoComplete="username"
                              name="username"
                              className={`w-75 rounded-5 form-control light-purple-border text-white `}
                              onBlur={formik.handleBlur}
                              placeholder={t("signIn:username")}
                              value={formik.values.username}
                              onChange={formik.handleChange}
                         />
                         {formik.touched.username && formik.errors.username && (
                              <p className="beige-text mt-2">
                                   {formik.errors.username}
                              </p>
                         )}
                    </div>
                    <div className="w-100 d-flex flex-column align-items-center ">
                         <input
                              type="password"
                              autoComplete="current-password"
                              name="password"
                              className={`w-75 rounded-5 form-control light-purple-border text-white`}
                              onBlur={formik.handleBlur}
                              placeholder={t("signIn:password")}
                              value={formik.values.password}
                              onChange={formik.handleChange}
                         />
                         {formik.touched.password && formik.errors.password && (
                              <p className="beige-text mt-2">
                                   {formik.errors.password}
                              </p>
                         )}
                    </div>
                    <BookmarkButton type="submit">
                         {t("signIn:signIn")}
                    </BookmarkButton>
                    {state.loginErrorOccurred && (
                         <p className="beige-text">{state.loginError}</p>
                    )}

                    <Link to="/sign-up" className="link-hover text-white">
                         {t("signIn:newAcc")}
                    </Link>
               </FormCard>
          </div>
     );
};
export default SignIn;
