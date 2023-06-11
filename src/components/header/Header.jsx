import React, {useEffect, useState} from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import Cookies from "universal-cookie";
import Logo from "../../assets/images/logo-white.png";
import {BiUserCircle} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import {
    clearLoginDetails,
    getCurrentUser,
    signOut,
} from "../../store/actions/auth/auth-actions";
import Menu from "../menu/Menu";
import {BiSearch} from "react-icons/bi";
import './Header.css';
import {CLEAR_INGREDIENT_BY_ID} from "../../store/actions/ingredients/ingredients-types";
import {CLEAR_TAG_BY_ID} from "../../store/actions/tags/tags-types";

const Header = (props) => {
    const cookies = new Cookies();

    const isUserAuthenticatedCookie = () => {
        return cookies.get("bn_aut");
    };

    const dispatch = useDispatch();
    const history = useHistory();

    const [showsDispatched, setShowsDispatched] = useState(false);
    const [showSignOutMenu, setShowSignOutMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        if (isUserAuthenticatedCookie() && !showsDispatched) {
            dispatch(getCurrentUser());
            setShowsDispatched(true);
        }

        return () => {
            dispatch(clearLoginDetails());
        };
    }, [dispatch, showsDispatched]);

    const user = useSelector((state) => state.auth.currentUser);

    const ingredients = useSelector((state) => state.ingredients.searchedIngredients)

    const [ingredientsId, setIngredientsId] = useState('');


    useEffect(() => {
        setIngredientsId('')
        if (ingredients) {
            ingredients.forEach((ingredient, index) => {
                if (ingredient != null && ingredient.id != null && ingredient.id !== '') {
                    setIngredientsId(prevIngredientsId => prevIngredientsId.concat(ingredient.id));
                    if (index !== ingredients.length - 1) {
                        setIngredientsId(prevIngredientsId => prevIngredientsId.concat(','));
                    }
                }
            });
            setIngredientsId(prevIngredientsId => prevIngredientsId.endsWith(",")
                ? prevIngredientsId.slice(0, -1)
                : prevIngredientsId);
        }
    }, [ingredients]);



    const tags = useSelector((state) => state.tags.searchedTags)

    const [tagsId, setTagsId] = useState('');


    useEffect(() => {
        setTagsId('')
        if (tags) {
            tags.forEach((tag, index) => {
                if (tag != null && tag.id != null && tag.id !== '') {
                    setTagsId(prevTagsId => prevTagsId.concat(tag.id));
                    if (index !== tags.length - 1) {
                        setTagsId(prevTagsId => prevTagsId.concat(','));
                    }
                }
            });
            setTagsId(prevTagsId => prevTagsId.endsWith(",")
                ? prevTagsId.slice(0, -1)
                : prevTagsId);
        }
    }, [tags]);





    const handleSearch = () => {
        console.log("ingredientsId  header " + ingredientsId)
        console.log("tagsId  header " + tagsId)

        console.log("ingredients  header " + ingredients)
        console.log("tags header " + tags)

        dispatch({type:CLEAR_INGREDIENT_BY_ID})
        dispatch({type:CLEAR_TAG_BY_ID})
        history.push(`/search?name=${encodeURIComponent(searchQuery)}&ingredient=${encodeURI(ingredientsId)}&tag=${encodeURI(tagsId)}`);
    };

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const name = params.get("name");
        if (name) {
            setSearchQuery(name);
        }
    }, [location.search]);

    return (

        <div>


            <div
                className={`w-100 header d-flex justify-content-center align-items-center header top-0 
               ${props.background && "dark-purple-background"} ${props.fixed ? "position-fixed" : "position-sticky"}`
                }
            >
                <Menu/>
                <div className="row h-100 w-75 d-flex justify-content-between align-items-center">

                    <div className="col-2 logo h-100">
                        <Link to="/">
                            <img src={Logo} alt="Logo" className="h-100"/>
                        </Link>
                    </div>
                    <div className="col-10 items d-flex justify-content-between align-items-center h-100">

                        <div className="search-bar w-75">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearch();
                                    }
                                }}
                            />
                            <BiSearch className="search-icon  cursor-pointer" onClick={handleSearch}/>
                        </div>


                        {!isUserAuthenticatedCookie() ? (
                            <Link
                                to="/sign-in"
                                className=" light-purple-background rounded-5 h-50 w-25 text-decoration-none text-white d-flex justify-content-center align-items-center"
                            >
                                Sign in
                            </Link>
                        ) : (
                            user && (
                                <div
                                    className="d-flex justify-content-center align-items-center h-50 w-25 text-white position-relative"
                                >
                                    <div
                                        className="d-flex justify-content-center align-items-center cursor-pointer "
                                        onClick={() => setShowSignOutMenu(!showSignOutMenu)}
                                    >
                                        <BiUserCircle className="fs-4 me-2"/>
                                        Hi, {user.firstName}
                                    </div>
                                    {showSignOutMenu && (
                                        <div className="position-absolute sign-out-card cursor-pointer">
                                            <div
                                                onClick={() => {
                                                    signOut();
                                                    history.push("/");
                                                }}
                                                className="light-purple-background w-75 h-100 text-center d-flex justify-content-center align-items-center rounded-bottom"
                                            >
                                                Sign Out
                                            </div>
                                        </div>
                                    )}
                                </div>

                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
