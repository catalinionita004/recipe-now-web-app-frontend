import React from "react";
import { useTranslation } from "react-i18next";

const TranslateButton = () => {
     const { i18n } = useTranslation();
     return (
          <button
               className="translate-button btn btn-hover position-fixed text-white rounded-circle shadow light-purple-background"
               onClick={() =>
                    i18n.changeLanguage(
                         i18n.resolvedLanguage === "en" ? "ar" : "en"
                    )
               }
          >
               {i18n.resolvedLanguage === "en" ? "ar" : "en"}
          </button>
     );
};
export default TranslateButton;
