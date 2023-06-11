import React, {useState, useEffect} from 'react';
import './Menu.css';
import {BiBook, BiCheckSquare, BiHome, BiMenuAltRight, BiX} from "react-icons/bi";
import {Link} from "react-router-dom";
import Cookies from "universal-cookie";

const Menu = () => {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const cookies = new Cookies();
    const isUserAuthenticatedCookie = () => {
        return cookies.get("bn_aut");
    };

    const handleSideNavToggle = (event) => {
        event.stopPropagation();
        setIsSideNavOpen(!isSideNavOpen);
    };


    const handleOutsideClick = (event) => {
        if (isSideNavOpen && !event.target.closest('.side-nav')) {
            setIsSideNavOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isSideNavOpen]);

    return (

        <div>
            {isUserAuthenticatedCookie() ? (
                <div>
                    {isSideNavOpen && <div className="overlay"/>}

                    <div className={`side-nav ${isSideNavOpen ? "open" : ""}`}>
                        <button onClick={handleSideNavToggle} className="close-btn">
                            <BiX/>
                        </button>
                        <MenuItem icon="home" name="Home" to="/"/>
                        <Divider/>
                        <MenuItem icon="my_recipes" name="My Recipes" to="/my-recipes"/>
                        <MenuItem
                            icon="my_reviewed_recipes"
                            name="My Reviewed Recipes"
                            to="/my-reviewed-recipes"
                        />
                    </div>

                    <button onClick={handleSideNavToggle} className="menu-btn">
                        <BiMenuAltRight/>
                    </button>
                </div>
            ) : null}
        </div>
    );
};

const MenuItem = ({icon, name, to}) => {
    let Icon;

    switch (icon) {
        case "home":
            Icon = BiHome;
            break;
        case "my_recipes":
            Icon = BiBook;
            break;
        case "my_reviewed_recipes":
            Icon = BiCheckSquare;
            break;
        default:
            Icon = null;
    }

    return (
        <Link to={to} className="menu-item">
            {Icon && <Icon className="icon"/>}
            <p>{name}</p>
        </Link>
    );
};

const Divider = () => {
    return <hr className="divider"/>;
};

export default Menu;
