import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";

// import { useDispatch, useSelector } from "react-redux";

import {useFormik} from "formik";
import * as Yup from "yup";

import {BsArrowLeftCircle, BsArrowRightShort} from "react-icons/bs";
import FormCard from "../../components/forms/form-card";
import Circle from "../../components/animation/circle";
import BookmarkButton from "../../components/buttons/bookmark-button";
import {userRegistration} from "../../store/actions/users/users-actions";
import {useDispatch} from "react-redux";
import Cookies from "universal-cookie";

import SuccessAnimation from "../../components/SuccessAnimation";
import ErrorAnimation from "../../components/ErrorAnimation";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useTranslation} from "react-i18next";

const SignUp = () => {
    const cookies = new Cookies();

    useEffect(() => {
        document.title = "Sign In | RecipeNow";

        if (isUserAuthenticatedCookie()) {
            history.push("/recipes-recommendations");
        }
    });

    const isUserAuthenticatedCookie = () => {
        return cookies.get("bn_aut");
    };

    useEffect(() => {
        document.title = "Sign Up | BookNook Library";
    });

    const history = useHistory();
    const dispatch = useDispatch();

    const {t, i18n} = useTranslation();

    const [currentFormPage, setCurrentFormPage] = useState(1);

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage,setSuccessMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .min(3, "Must be 3 characters or more")
                .matches(/^[a-zA-Z]+$/, "Name can only contain letters")
                .required("Required"),
            lastName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .min(3, "Must be 3 characters or more")
                .matches(/^[a-zA-Z]+$/, "Name can only contain letters")
                .required("Required"),
            username: Yup.string()
                .max(15, "Must be 15 characters or less")
                .min(3, "Must be 3 characters or more")
                .matches(/^[a-zA-Z0-9]+$/, "Username can only contain letters or digits")
                .required("Required"),
            email: Yup.string()
                .email("Please, Enter a valid email")
                .required("Required"),
            password: Yup.string().required("Required"),
            confirmPassword: Yup.string().required("Required"),
        }),
        onSubmit: async (values) => {
            setShowError(false);
            setShowSuccess(false);

            if (values.password === values.confirmPassword) {
                const user = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                    confirmPassword: values.password,
                    username: values.username
                };

                const response = await dispatch(userRegistration(user));
                if (response.success) {
                    setSuccessMessage("Congrats ! You created your account successfully")
                    setShowSuccess(true);
                    history.push("/sign-in", {
                        username: values.username,
                        password: values.password,
                        success: true,
                    });
                } else {
                    setErrorMessage(response.errorMessage)
                    setShowError(true);
                }

                console.log("showError" + showError)

            } else {
                setErrorMessage("Please, Enter the same password")
                setShowError(true);
            }
        },
    });

    console.log(formik.values);
    console.log(formik.errors);
    console.log(formik.touched);

    return (
        <div className="sign-up-route vh-100 w-100 position-relative overflow-hidden">
            <SuccessAnimation successMessage={successMessage} showSuccess={showSuccess} />
            <ErrorAnimation errorMessage={errorMessage} showError={showError}/>
            <ToastContainer/>
            <Circle
                size="10"
                backgroundColor="light-purple"
                duration="25"
                top="15"
                right="-150"
            />
            <Circle
                size="12"
                backgroundColor="beige"
                duration="40"
                bottom="-100"
                right="-120"
            />
            <Circle
                size="22"
                backgroundColor="light-purple"
                duration="30"
                bottom="-30"
                left="-350"
            />
            <Circle
                size="6"
                backgroundColor="beige"
                duration="50"
                bottom="300"
                left="-70"
            />
            <FormCard
                onSubmit={formik.handleSubmit}
                title={t("signUp:signUp")}
            >
                {currentFormPage === 1 ? (
                    <>
                        <div className="w-100 d-flex flex-column align-items-center ">
                            <input
                                type="text"
                                className={`w-75 rounded-5 form-control light-purple-border text-white`}
                                name="firstName"
                                placeholder={t("signUp:firstName")}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstName}
                            />
                            {formik.touched.firstName &&
                                formik.errors.firstName && (
                                    <p className="beige-text mt-2">
                                        {formik.errors.firstName}
                                    </p>
                                )}
                        </div>

                        <div className="w-100 d-flex flex-column align-items-center ">
                            <input
                                type="text"
                                className={`w-75 rounded-5 form-control light-purple-border text-white`}
                                name="lastName"
                                placeholder={t("signUp:lastName")}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName}
                            />
                            {formik.touched.lastName &&
                                formik.errors.lastName && (
                                    <p className="beige-text mt-2">
                                        {formik.errors.lastName}
                                    </p>
                                )}
                        </div>

                        <div className="w-100 d-flex flex-column align-items-center ">
                            <input
                                type="text"
                                className={`w-75 rounded-5 form-control light-purple-border text-white`}
                                name="username"
                                placeholder={t("signUp:username")}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                            />
                            {formik.touched.username &&
                                formik.errors.username && (
                                    <p className="beige-text mt-2">
                                        {formik.errors.username}
                                    </p>
                                )}
                        </div>


                        <BookmarkButton
                            type="button"
                            onClick={() => {
                                setCurrentFormPage(currentFormPage + 1);
                            }}
                        >
                            {t("signUp:next")}
                            <BsArrowRightShort className="fs-4"/>
                        </BookmarkButton>

                        <Link
                            to="/sign-in"
                            className="link-hover text-white"
                        >
                            {t("signUp:haveAcc")}
                        </Link>
                    </>
                ) : (
                    <>
                        <button
                            className="back-button text-white position-absolute rounded-circle bg-transparent border-0 d-flex justify-content-center align-items-center"
                            onClick={() =>
                                setCurrentFormPage(currentFormPage - 1)
                            }
                        >
                            <BsArrowLeftCircle className="w-100 h-100"/>
                        </button>

                        <div className="w-100 d-flex flex-column align-items-center ">
                            <input
                                onChange={formik.handleChange}
                                type="text"
                                className={`w-75 rounded-5 form-control light-purple-border text-white ${
                                    i18n.resolvedLanguage === "ar" &&
                                    "text-end"
                                }`}
                                name="email"
                                placeholder={t(`signUp:email`)}
                                value={formik.values.email}
                            />
                            {formik.touched.email &&
                                formik.errors.email && (
                                    <p className="beige-text mt-2 text-center">
                                        {formik.errors.email}
                                    </p>
                                )}
                        </div>

                        <div className="w-100 d-flex flex-column align-items-center ">
                            <input
                                onChange={formik.handleChange}
                                type="password"
                                className={`w-75 rounded-5 form-control light-purple-border text-white ${
                                    i18n.resolvedLanguage === "ar" &&
                                    "text-end"
                                }`}
                                name="password"
                                placeholder={t(`signUp:password`)}
                                value={formik.values.password}
                            />
                            {formik.touched.password &&
                                formik.errors.password && (
                                    <p className="beige-text mt-2 text-center">
                                        {formik.errors.password}
                                    </p>
                                )}
                        </div>

                        <div className="w-100 d-flex flex-column align-items-center ">
                            <input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="password"
                                className={`w-75 rounded-5 form-control light-purple-border text-white ${
                                    i18n.resolvedLanguage === "ar" &&
                                    "text-end"
                                }`}
                                name="confirmPassword"
                                placeholder={t(
                                    `signUp:confirmPassword`
                                )}
                                value={formik.values.confirmPassword}
                            />
                            {(formik.touched.confirmPassword &&
                                    formik.errors.confirmPassword) ||
                                (formik.values.password !==
                                    formik.values.confirmPassword && (
                                        <p className="beige-text mt-2 text-center">
                                            {
                                                formik.errors
                                                    .confirmPassword
                                            }
                                        </p>
                                    ))}
                        </div>

                        <BookmarkButton type="submit">
                            {t("signUp:signUp")}
                        </BookmarkButton>
                    </>
                )}
            </FormCard>
        </div>
    );
};
export default SignUp;
