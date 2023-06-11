import React from "react";
import book_mark from "../../assets/images/Asset-1.png";

const BookmarkButton = (props) => {
     return (
          <button
               className="btn btn-hover text-white position-relative rounded-5 w-50 light-purple-background d-block mx-auto"
               onClick={props.onClick}
               type={props.type}
          >
               {props.children}
               <img
                    src={book_mark}
                    alt="book_mark"
                    className="book-mark position-absolute"
                    style={{
                         top: "-30px",
                         right: "8px",
                         width: "60px",
                    }}
               />
          </button>
     );
};
export default BookmarkButton;
